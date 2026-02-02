-- Create a table for public profiles linked to auth.users
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  website text,

  constraint username_length check (char_length(username) >= 3)
);

-- Set up Row Level Security (RLS)
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Create a table for comments
create table public.comments (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  text text not null,
  
  -- Denormalized data for easier fetching (optional, but helpful for simple display if not using strict joins everywhere)
  -- Or we can just join. Let's keep it normalized and rely on joins for better consistency.
  -- But for this simple app, fetching names/avatars with comments is needed.
  -- Let's just store the reference and join in the frontend query.
  
  constraint text_length check (char_length(text) > 0)
);

-- Set up RLS for comments
alter table public.comments enable row level security;

create policy "Comments are viewable by everyone."
  on comments for select
  using ( true );

create policy "Authenticated users can insert comments."
  on comments for insert
  with check ( auth.role() = 'authenticated' );

create policy "Users can update their own comments."
  on comments for update
  using ( auth.uid() = user_id );

create policy "Users can delete their own comments."
  on comments for delete
  using ( auth.uid() = user_id );

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to automatically create profile on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
