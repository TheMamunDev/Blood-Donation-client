import React from 'react';
import { Quote } from 'lucide-react';

const TestimonialCard = ({ testimonial, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`
        relative flex-shrink-0 w-[300px] md:w-[450px] p-8 rounded-[2rem] transition-all duration-500 ease-in-out cursor-pointer select-none
        ${isActive 
          ? 'bg-white scale-100 opacity-100 shadow-2xl z-20' 
          : 'bg-white/60 scale-90 opacity-40 grayscale-[20%] blur-[1px] z-10 hover:opacity-60'}
      `}
    >
      <div className="flex flex-col h-full justify-between">
        <div>
          <div className="mb-6">
            <Quote className={`w-10 h-10 ${isActive ? 'text-blue-100 fill-blue-100' : 'text-gray-200 fill-gray-200'}`} />
          </div>

          {/* Text */}
          <p className={`text-base md:text-lg leading-relaxed mb-8 ${isActive ? 'text-gray-600' : 'text-gray-400'}`}>
            {testimonial.quote}
          </p>
        </div>

        {/* Footer */}
        <div className="relative pt-6">
            {/* Dashed Separator Line */}
            <div className="absolute top-0 left-0 w-full border-t border-dashed border-gray-300"></div>

            <div className="flex items-center gap-4">
              <img 
                src={testimonial.avatar} 
                alt={testimonial.name} 
                className={`w-12 h-12 rounded-full object-cover transition-all ${isActive ? 'grayscale-0' : 'grayscale'}`}
              />
              <div className="flex flex-col text-left">
                <h4 className={`font-bold text-lg ${isActive ? 'text-primary' : 'text-gray-500'}`}>
                  {testimonial.name}
                </h4>
                <span className={`text-sm ${isActive ? 'text-gray-500' : 'text-gray-400'}`}>
                  {testimonial.role}
                </span>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;