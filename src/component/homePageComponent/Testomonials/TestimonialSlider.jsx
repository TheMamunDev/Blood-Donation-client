'use client';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import TestimonialCard from './TestimonialCard';
import { data } from '@/utils/constants';
import { useEffect, useRef, useState } from 'react';

const CARD_WIDTH_DESKTOP = 450;
const CARD_WIDTH_MOBILE = 300;
const GAP = 32;

const TestimonialSlider = () => {
  const [isMobile, setIsMobile] = useState(false);
  const TESTIMONIALS = data;
  const [currentIndex, setCurrentIndex] = useState(1);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      prev => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length,
    );
  };

  const handleDotClick = index => {
    setCurrentIndex(index);
  };

  const getTransformStyle = () => {
    const cardWidth = isMobile ? CARD_WIDTH_MOBILE : CARD_WIDTH_DESKTOP;

    const centerOffset = containerWidth / 2;
    const halfCard = cardWidth / 2;

    const shift = currentIndex * (cardWidth + GAP);
    const transformX = centerOffset - halfCard - shift;

    return { transform: `translateX(${transformX}px)` };
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 py-16 flex flex-col items-center">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          What our customers are saying
        </h2>
        <p className="text-gray-500 text-sm md:text-base leading-relaxed">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>
      </div>

      <div ref={containerRef} className="w-full relative overflow-hidden py-10">
        <div
          className="flex items-center gap-8 transition-transform duration-500 ease-in-out will-change-transform"
          style={getTransformStyle()}
        >
          {TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              isActive={index === currentIndex}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center gap-6 mt-4">
        <div className="flex items-center gap-4 md:gap-12">
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-800 transition-colors shadow-sm"
            aria-label="Previous testimonial"
          >
            <ArrowLeft size={20} />
          </button>

          {/* Pagination Dots */}
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentIndex === index
                    ? 'w-2 h-2 bg-primary scale-110'
                    : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full bg-accent hover:bg-accentHover flex items-center justify-center text-primary transition-colors shadow-sm"
            aria-label="Next testimonial"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
