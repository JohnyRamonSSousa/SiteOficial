
import React from 'react';

interface ServiceSectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

const ServiceSection: React.FC<ServiceSectionProps> = ({ id, children, className = "" }) => {
  return (
    <section id={id} className={`py-20 ${className}`}>
      <div className="container mx-auto px-6">
        {children}
      </div>
    </section>
  );
};

export default ServiceSection;
