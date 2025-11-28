import React, { useRef, useEffect, useState } from 'react';
import { Benefit } from '../types';
import { Briefcase, Heart, CheckCircle, Smartphone, Vote, Sprout, FileSearch, Bell, Target, Users } from 'lucide-react';

const benefits: Benefit[] = [
  // For the Co-op
  {
    id: '1',
    target: 'Co-op',
    title: 'Less Paperwork',
    description: 'Stop drowning in forms. Our software organizes everything digitally, so you save hours every week.',
    icon: 'Briefcase',
    color: 'bg-forest'
  },
  {
    id: '2',
    target: 'Co-op',
    title: 'Happy Members',
    description: 'When members can see their money working clearly, they trust the co-op more and stay longer.',
    icon: 'Heart',
    color: 'bg-forest'
  },
  {
    id: '3',
    target: 'Co-op',
    title: 'Fewer Mistakes',
    description: 'Our math is automatic. Say goodbye to calculator errors and messy spreadsheets.',
    icon: 'CheckCircle',
    color: 'bg-forest'
  },
  {
    id: '7',
    target: 'Co-op',
    title: 'Audit Ready',
    description: 'Every transaction is tracked permanently. When audit time comes, you are ready in one click.',
    icon: 'FileSearch',
    color: 'bg-forest'
  },
  {
    id: '8',
    target: 'Co-op',
    title: 'Automated Alerts',
    description: 'The system notifies you instantly if payments are late or accounts need attention.',
    icon: 'Bell',
    color: 'bg-forest'
  },
  // For Members
  {
    id: '4',
    target: 'Member',
    title: 'Easy Access',
    description: 'Check your balance or apply for a loan on your phone, anytime, anywhere.',
    icon: 'Smartphone',
    color: 'bg-goldenrod'
  },
  {
    id: '5',
    target: 'Member',
    title: 'Real Voting',
    description: 'Vote on important community decisions without leaving your house.',
    icon: 'Vote',
    color: 'bg-goldenrod'
  },
  {
    id: '6',
    target: 'Member',
    title: 'Watch it Grow',
    description: 'See exactly how your savings are helping your neighbors and your community.',
    icon: 'Sprout',
    color: 'bg-goldenrod'
  },
  {
    id: '9',
    target: 'Member',
    title: 'Savings Goals',
    description: 'Set personal targets for a new house or education and track your progress visually.',
    icon: 'Target',
    color: 'bg-goldenrod'
  },
  {
    id: '10',
    target: 'Member',
    title: 'Family Accounts',
    description: 'Link accounts with your family members to manage household finances together.',
    icon: 'Users',
    color: 'bg-goldenrod'
  }
];

export const BenefitsScroll: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null); // The wrapper for sticky positioning
  const trackRef = useRef<HTMLDivElement>(null); // The moving track
  const [scrollProgress, setScrollProgress] = useState(0);
  const [maxTranslate, setMaxTranslate] = useState(0);

  // Calculate the maximum distance we need to scroll horizontally
  useEffect(() => {
    const calculateDimensions = () => {
      if (trackRef.current) {
        // Total width of the scrolling content
        const totalWidth = trackRef.current.scrollWidth;
        // Width of the visible window
        const viewportWidth = window.innerWidth;
        // We scroll until the end of content aligns with right of screen
        // Added 50px buffer for mobile padding
        setMaxTranslate(totalWidth - viewportWidth + 50); 
      }
    };

    calculateDimensions();
    window.addEventListener('resize', calculateDimensions);
    return () => window.removeEventListener('resize', calculateDimensions);
  }, []);

  // Handle the scroll progress based on vertical page scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      
      const element = scrollContainerRef.current;
      const rect = element.getBoundingClientRect();
      const top = rect.top;
      // The distance the user has to scroll is (element height - window height)
      const scrollableDistance = element.offsetHeight - window.innerHeight;
      
      if (scrollableDistance <= 0) return;

      // Calculate progress (0 at top of sticky, 1 at bottom)
      // We start scrolling when top is 0 (sticky start)
      let progress = -top / scrollableDistance;
      
      // Clamp values
      if (progress < 0) progress = 0;
      if (progress > 1) progress = 1;
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase': return <Briefcase size={32} />;
      case 'Heart': return <Heart size={32} />;
      case 'CheckCircle': return <CheckCircle size={32} />;
      case 'Smartphone': return <Smartphone size={32} />;
      case 'Vote': return <Vote size={32} />;
      case 'Sprout': return <Sprout size={32} />;
      case 'FileSearch': return <FileSearch size={32} />;
      case 'Bell': return <Bell size={32} />;
      case 'Target': return <Target size={32} />;
      case 'Users': return <Users size={32} />;
      default: return <Briefcase size={32} />;
    }
  };

  // Calculate actual pixel translation based on progress
  const currentTranslate = scrollProgress * maxTranslate;

  return (
    // Increase height to allow for more scroll time since we have more cards
    <section ref={scrollContainerRef} className="relative h-[400vh] bg-linen">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        
        <div className="container mx-auto px-6 mb-8 md:mb-12 relative z-10 shrink-0">
           <h2 className="font-serif text-3xl md:text-5xl text-forest mb-4">Benefits for Cooperatives and Members</h2>
           <p className="text-indigo text-base md:text-lg max-w-xl">
             We designed CoopOx to solve problems for both the managers running the business and the members relying on it.
             <br/>
             <span className="text-xs md:text-sm text-goldenrod uppercase tracking-widest font-bold mt-2 inline-block animate-pulse">
               Scroll down to slide
             </span>
           </p>
        </div>

        {/* Horizontal Moving Track */}
        <div 
            ref={trackRef}
            className="flex gap-4 md:gap-8 px-6 md:px-20 transition-transform duration-75 ease-linear will-change-transform items-center"
            style={{ transform: `translateX(-${currentTranslate}px)` }}
        >
          {/* Introductory Spacer */}
          <div className="w-[1vw] shrink-0"></div>

          {benefits.map((benefit, index) => (
            <React.Fragment key={benefit.id}>
              {/* Add a large gap separator between Co-op cards and Member cards */}
              {index === 5 && (
                <div className="shrink-0 w-12 md:w-32 flex flex-col items-center justify-center opacity-50">
                    <div className="h-full w-px bg-forest/20 dashed border-l-2 border-forest/20"></div>
                </div>
              )}

              <div 
                className={`
                  shrink-0 w-[85vw] md:w-[400px] h-[420px] md:h-[480px] 
                  bg-white rounded-3xl p-6 md:p-8 border border-forest/10 shadow-xl 
                  flex flex-col justify-between relative overflow-hidden group
                `}
              >
                {/* Top decoration */}
                <div className={`absolute top-0 left-0 w-full h-3 ${benefit.color}`}></div>
                
                <div>
                  <span className={`
                      inline-block px-3 py-1 rounded-full text-[10px] md:text-xs font-bold tracking-wider mb-4 md:mb-6
                      ${benefit.target === 'Co-op' ? 'bg-forest/10 text-forest' : 'bg-goldenrod/10 text-goldenrod'}
                  `}>
                      FOR THE {benefit.target.toUpperCase()}
                  </span>
                  
                  <h3 className="font-serif text-2xl md:text-3xl text-forest mb-3 md:mb-4 leading-tight">
                      {benefit.title}
                  </h3>
                  
                  <p className="font-sans text-indigo/80 text-base md:text-lg leading-relaxed">
                      {benefit.description}
                  </p>
                </div>

                <div className="flex items-end justify-between">
                  <div className={`
                      w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-white
                      shadow-lg transform group-hover:scale-110 transition-transform duration-300
                      ${benefit.color}
                  `}>
                      {getIcon(benefit.icon)}
                  </div>
                  {/* Subtle visual indicator number */}
                  <span className="text-5xl md:text-6xl font-serif text-forest/5 font-bold -mb-4 -mr-4 select-none">
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </span>
                </div>

                {/* Background Fabric Texture */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/linen.png')] mix-blend-multiply"></div>
              </div>
            </React.Fragment>
          ))}
          
          {/* End Spacer / CTA */}
           <div className="w-[85vw] md:w-[400px] shrink-0 flex items-center justify-center h-[400px]">
              <div className="text-center p-8 bg-forest/5 rounded-3xl border border-forest/10 w-full">
                  <div className="text-forest font-serif text-3xl mb-4">Ready to weave your success?</div>
                  <p className="text-indigo mb-6">Join hundreds of other cooperatives.</p>
                  <button className="bg-goldenrod text-white px-8 py-4 rounded-full hover:bg-yellow-600 transition-colors shadow-lg font-bold text-lg">
                    Get Started Today
                  </button>
              </div>
           </div>
           
           {/* Final Padding to ensure last card isn't cut off on edge */}
           <div className="w-[5vw] shrink-0"></div>
        </div>
        
        {/* Decorative Thread Line behind cards */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-forest via-goldenrod to-forest opacity-20 -z-10 transform -translate-y-1/2"></div>
      </div>
    </section>
  );
};