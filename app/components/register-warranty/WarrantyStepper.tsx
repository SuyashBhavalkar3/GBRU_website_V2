import React from 'react';
import Container from '../common/Container';

const steps = [
  {
    number: '1',
    title: 'Purchase Product',
    subtitle: 'Buy from authorized dealers',
    active: true,
  },
  {
    number: '2',
    title: 'Register Warranty',
    subtitle: 'Fill the online form',
    active: true,
  },
  {
    number: '3',
    title: 'Verification',
    subtitle: 'Our team validates details',
    active: false,
  },
  {
    number: '4',
    title: 'Warranty Activated',
    subtitle: 'Enjoy peace of mind',
    active: false,
  },
];

export default function WarrantyStepper() {
  return (
    <section className="w-full bg-[#F7F7F7] min-h-[160px] border-t border-[#ECECEC] flex items-center py-8 lg:py-0">
      <Container>
        <div className="relative w-full max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center">
          
          {/* Horizontal Line for Desktop */}
          <div className="hidden md:block absolute top-[24px] left-[5%] w-[90%] h-[2px] bg-[#D6DDD3] z-0" />
          
          {/* Vertical Line for Mobile */}
          <div className="md:hidden absolute top-[24px] left-[24px] w-[2px] h-[calc(100%-48px)] bg-[#D6DDD3] z-0" />

          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative z-10 flex flex-row md:flex-col items-center md:items-center md:justify-start gap-4 md:gap-3 w-full md:w-[200px] text-left md:text-center mb-8 md:mb-0 last:mb-0"
            >
              {/* Circle */}
              <div 
                className={`w-[48px] h-[48px] rounded-full flex items-center justify-center text-white font-sans font-medium text-[20px] shrink-0 shadow-sm ${
                  step.active ? 'bg-[#2E6630]' : 'bg-[#7A8375]'
                }`}
              >
                {step.number}
              </div>
              
              {/* Text */}
              <div className="flex flex-col mt-0 md:mt-1">
                <h4 className="font-semibold text-[16px] md:text-[18px] text-[#154212] font-sans">
                  {step.title}
                </h4>
                <p 
                  className="font-normal text-[13px] md:text-[14px] text-[#42493E] mt-1 md:mt-0"
                  style={{ fontFamily: 'Geist, sans-serif' }}
                >
                  {step.subtitle}
                </p>
              </div>
            </div>
          ))}
          
        </div>
      </Container>
    </section>
  );
}
