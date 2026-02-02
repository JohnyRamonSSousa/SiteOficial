
import React from 'react';
import { Comment } from '../types';

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (text: string) => void;
  isLoggedIn: boolean;
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments }) => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-20">
          <span className="text-ej-green font-bold uppercase tracking-[0.2em] text-xs mb-4 block">Depoimentos</span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 italic">O que dizem sobre <span className="text-ej-green">Nós</span></h2>
          <div className="w-16 h-1 bg-slate-100 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12">
          {comments.map((comment) => (
            <div key={comment.id} className="group relative bg-slate-50 p-8 md:p-12 rounded-[2.5rem] border border-transparent hover:border-emerald-200/50 hover:bg-white hover:shadow-2xl transition-all duration-500">
              <div className="absolute -top-5 -left-5 w-12 h-12 bg-ej-green rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200 opacity-0 group-hover:opacity-100 transition-opacity">
                <i className="fas fa-quote-left text-white text-lg"></i>
              </div>

              <div className="flex flex-col h-full">
                <div className="mb-8">
                  <div className="flex items-center space-x-1 text-ej-green text-xs mb-4">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <p className="text-slate-700 text-base md:text-xl font-medium leading-relaxed italic">"{comment.text}"</p>
                </div>

                <div className="mt-auto flex items-center space-x-5 border-t border-slate-200 pt-8">
                  <img
                    src={comment.avatar}
                    alt={comment.user}
                    className="w-14 h-14 rounded-full border-2 border-white shadow-md"
                  />
                  <div>
                    <h4 className="font-black text-slate-900 text-base">{comment.user}</h4>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Cliente Satisfeito • {comment.date}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-slate-400 text-sm font-medium"></p>
        </div>
      </div>
    </section>
  );
};

export default CommentSection;