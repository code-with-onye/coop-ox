import React from 'react';
import { Testimonial } from '../types';

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: "Elena Rostova",
    role: "Coop Manager",
    quote: "CoopOx makes running our cooperative so easy. I spend less time on spreadsheets and more time helping our members.",
    image: "https://picsum.photos/200/200"
  },
  {
    id: '2',
    name: "Marcus Thorne",
    role: "Member of GreenGrow Coop",
    quote: "I love the clarity. I can log in and see exactly how my savings are helping local farmers. It builds so much trust.",
    image: "https://picsum.photos/201/201"
  },
  {
    id: '3',
    name: "Sarah Jenkins",
    role: "Treasurer, City Housing",
    quote: "Finally, software that feels friendly. It handles all our complex accounting, but the interface is simple enough for everyone to use.",
    image: "https://picsum.photos/202/202"
  }
];

export const Testimonials: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {testimonials.map((t) => (
        <div key={t.id} className="bg-linen p-8 rounded-2xl border border-forest/10 relative group hover:-translate-y-2 transition-transform duration-300">
          <div className="absolute -top-6 left-8">
             <div className="w-12 h-12 rounded-full border-2 border-white shadow-md overflow-hidden">
                <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
             </div>
          </div>
          <div className="mt-6">
            <p className="font-serif italic text-lg text-indigo mb-6 leading-relaxed">"{t.quote}"</p>
            <div>
                <h4 className="font-sans font-bold text-forest">{t.name}</h4>
                <p className="text-sm text-goldenrod uppercase tracking-wider font-medium">{t.role}</p>
            </div>
          </div>
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-2xl">
              <div className="absolute top-0 right-0 w-20 h-20 bg-forest/5 rotate-45 transform translate-x-10 -translate-y-10 group-hover:bg-goldenrod/20 transition-colors"></div>
          </div>
        </div>
      ))}
    </div>
  );
};