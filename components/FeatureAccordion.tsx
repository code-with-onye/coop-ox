import React, { useState } from 'react';
import { Feature } from '../types';
import { ChevronDown, Shield, TrendingUp, Users } from 'lucide-react';

const features: Feature[] = [
  {
    id: '1',
    title: 'Simple Member Accounts',
    description: 'Give your members an easy way to check their shares and voting power. Everything is in one place, so they always know where they stand.',
    icon: 'Users'
  },
  {
    id: '2',
    title: 'Clear Loan Tracking',
    description: 'Our software shows exactly where the money goes. Build trust by letting your members see how loans are helping the community grow.',
    icon: 'TrendingUp'
  },
  {
    id: '3',
    title: 'Safe & Secure',
    description: 'We keep your cooperative’s data safe. Our system uses bank-grade security to protect your money and your votes.',
    icon: 'Shield'
  }
];

export const FeatureAccordion: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>('1');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users': return <Users className="w-6 h-6" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6" />;
      case 'Shield': return <Shield className="w-6 h-6" />;
      default: return <Users className="w-6 h-6" />;
    }
  };

  return (
    <div className="space-y-4">
      {features.map((feature) => (
        <div 
          key={feature.id}
          className={`
            group rounded-xl border transition-all duration-500 overflow-hidden
            ${activeId === feature.id 
              ? 'bg-terra border-goldenrod shadow-lg' 
              : 'bg-white border-forest/10 hover:border-forest/30'}
          `}
        >
          <button
            onClick={() => setActiveId(activeId === feature.id ? null : feature.id)}
            className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
          >
            <div className="flex items-center gap-4">
              <div className={`
                p-3 rounded-full transition-colors duration-300
                ${activeId === feature.id ? 'bg-goldenrod text-white' : 'bg-forest/5 text-forest'}
              `}>
                {getIcon(feature.icon)}
              </div>
              <h3 className="font-serif text-xl font-medium text-forest">
                {feature.title}
              </h3>
            </div>
            <ChevronDown 
              className={`
                text-forest transition-transform duration-500
                ${activeId === feature.id ? 'rotate-180' : 'rotate-0'}
              `} 
            />
          </button>
          
          <div 
            className={`
              overflow-hidden transition-all duration-500 ease-in-out
              ${activeId === feature.id ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}
            `}
          >
            <div className="p-6 pt-0 pl-[5.5rem] pr-12">
              <p className="font-sans text-indigo leading-relaxed relative z-10">
                {feature.description}
              </p>
              {/* Subtle texture pattern overlay */}
              <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/linen.png')] mix-blend-multiply"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};