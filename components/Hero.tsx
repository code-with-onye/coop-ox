import React, { useEffect, useState } from 'react';

export const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linen pt-20">
      
      {/* Background Animated SVG Weave */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
         <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
             {[...Array(20)].map((_, i) => (
                 <path
                    key={i}
                    d={`M-10 ${10 + i * 5} Q 50 ${10 + i * 5 + (i % 2 === 0 ? 10 : -10)} 110 ${10 + i * 5}`}
                    fill="none"
                    stroke="#2B543D"
                    strokeWidth="0.5"
                    className="animate-weave-slow"
                    style={{ animationDelay: `${i * 0.2}s` }}
                 />
             ))}
             {[...Array(20)].map((_, i) => (
                 <path
                    key={`v-${i}`}
                    d={`M${10 + i * 5} -10 Q ${10 + i * 5 + (i % 2 === 0 ? 10 : -10)} 50 ${10 + i * 5} 110`}
                    fill="none"
                    stroke="#D4A500"
                    strokeWidth="0.3"
                    className="animate-weave-slow"
                    style={{ animationDelay: `${i * 0.3}s` }}
                 />
             ))}
         </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div 
            className="transform transition-transform duration-700 ease-out"
            style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        >
            <span className="inline-block py-1 px-3 rounded-full bg-terra border border-forest/20 text-forest text-sm font-semibold tracking-wider mb-6">
                SOFTWARE FOR COOPERATIVES
            </span>
            <h1 className="font-serif text-5xl md:text-7xl text-forest mb-8 leading-tight">
                Simple Finance Tools,<br />
                <span className="italic text-goldenrod">Woven for Community.</span>
            </h1>
            <p className="font-sans text-xl text-indigo max-w-2xl mx-auto mb-12 leading-relaxed">
                CoopOx gives your cooperative the software it needs to manage money easily. We provide the digital tools to help your members and finances grow together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-forest text-white px-8 py-4 rounded-full font-sans font-medium hover:bg-emerald-900 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    Try CoopOx Demo
                </button>
                <button className="bg-transparent border-2 border-forest text-forest px-8 py-4 rounded-full font-sans font-medium hover:bg-forest hover:text-white transition-all">
                    See How It Works
                </button>
            </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-forest/40">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
        </svg>
      </div>
    </section>
  );
};