export default function StepperTimeline({ steps = [] }) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="w-full my-8">
      {/* Desktop Horizontal Stepper */}
      <div className="hidden md:flex items-start justify-between relative">
        {/* Horizontal Connecting Line */}
        <div className="absolute top-6 left-16 right-16 h-1 bg-slate-200 z-0" />

        {steps.map((step, idx) => (
          <div key={idx} className="relative z-10 flex flex-col items-center text-center max-w-[220px] px-2">
            {/* Step Number Circle */}
            <div className="w-12 h-12 rounded-full bg-[#00a859] text-white font-extrabold text-lg flex items-center justify-center shadow-md mb-4 border-4 border-[#f4f6f4]">
              {step.number || idx + 1}
            </div>
            {/* Step Title */}
            <h4 className="font-extrabold text-[#1c3a27] text-sm sm:text-base mb-1">
              {step.title}
            </h4>
            {/* Step Description */}
            <p className="text-slate-500 text-xs leading-relaxed max-w-[190px]">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      {/* Mobile Vertical Stepper */}
      <div className="md:hidden space-y-8 relative pl-6 border-l-2 border-slate-300 ml-4">
        {steps.map((step, idx) => (
          <div key={idx} className="relative pl-6">
            {/* Number Badge */}
            <div className="absolute -left-[37px] top-0 w-8 h-8 rounded-full bg-[#00a859] text-white font-extrabold text-xs flex items-center justify-center border-2 border-white shadow-xs">
              {step.number || idx + 1}
            </div>
            {/* Content */}
            <div>
              <h4 className="font-extrabold text-[#1c3a27] text-base mb-1">
                {step.title}
              </h4>
              <p className="text-slate-500 text-xs leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
