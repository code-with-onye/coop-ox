import React from 'react';
import { Hero } from './components/Hero';
import { TransparencyGraph } from './components/TransparencyGraph';
import { FeatureAccordion } from './components/FeatureAccordion';
import { Testimonials } from './components/Testimonials';
import { WeaverAssistant } from './components/WeaverAssistant';
import { BenefitsScroll } from './components/BenefitsScroll';
import { Sprout } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="bg-linen min-h-screen text-forest font-sans selection:bg-goldenrod/30">
      
      {/* Navigation */}
      <nav className="fixed w-full z-40 px-6 py-4 bg-linen/90 backdrop-blur-md border-b border-forest/5">
        <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center gap-2">
                <div className="bg-forest text-white p-2 rounded-lg">
                    <Sprout size={24} />
                </div>
                <span className="font-serif text-2xl font-bold tracking-tight">CoopOx</span>
            </div>
            <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide text-indigo">
                <a href="#transparency" className="hover:text-forest transition-colors">Why It Works</a>
                <a href="#features" className="hover:text-forest transition-colors">Software Features</a>
                <a href="#community" className="hover:text-forest transition-colors">Stories</a>
            </div>
            <button className="hidden md:block border border-forest text-forest px-6 py-2 rounded-full hover:bg-forest hover:text-white transition-colors text-sm font-medium">
                Book a Demo
            </button>
        </div>
      </nav>

      <Hero />

      {/* Transparency Section */}
      <section id="transparency" className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
                <div className="lg:w-1/3">
                    <h2 className="font-serif text-4xl md:text-5xl mb-6 text-forest">Clear Views <br/>for Everyone</h2>
                    <p className="text-indigo mb-8 leading-relaxed">
                        Trust is the most important part of any group. Our software makes it easy to show members exactly how money moves and grows within your cooperative.
                    </p>
                    <ul className="space-y-4 text-indigo/80">
                        <li className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-goldenrod"></span>
                            See money flow in real-time
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-forest"></span>
                            Show impact on local projects
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-indigo"></span>
                            Easy-to-read reports
                        </li>
                    </ul>
                </div>
                <div className="lg:w-2/3 w-full">
                    <TransparencyGraph />
                </div>
            </div>
        </div>
      </section>

      {/* Benefits Section (Scroll) */}
      <BenefitsScroll />

      {/* Features Section */}
      <section id="features" className="py-24 bg-terra">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="font-serif text-4xl md:text-5xl mb-4 text-forest">Tools for Growth</h2>
                <p className="text-indigo max-w-xl mx-auto">We provide the software you need to run your cooperative smoothly, without the headache.</p>
            </div>
            <div className="max-w-3xl mx-auto">
                <FeatureAccordion />
            </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-24 bg-linen">
        <div className="container mx-auto px-6">
            <div className="flex justify-between items-end mb-16">
                <div>
                    <h2 className="font-serif text-4xl md:text-5xl mb-4 text-forest">Success Stories</h2>
                    <p className="text-indigo">Hear from cooperatives using our software.</p>
                </div>
                <button className="hidden md:block text-goldenrod hover:text-yellow-700 font-medium underline underline-offset-4 decoration-2">
                    Read more reviews
                </button>
            </div>
            <Testimonials />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-forest text-linen py-16">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div className="col-span-1 md:col-span-1">
                    <div className="flex items-center gap-2 mb-6">
                        <Sprout size={24} className="text-goldenrod"/>
                        <span className="font-serif text-2xl font-bold">CoopOx</span>
                    </div>
                    <p className="text-linen/60 text-sm leading-relaxed">
                        Simple, powerful software for financial cooperatives. We help you weave a stronger community.
                    </p>
                </div>
                <div>
                    <h4 className="font-serif text-lg mb-6 text-goldenrod">Product</h4>
                    <ul className="space-y-3 text-linen/70 text-sm">
                        <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-serif text-lg mb-6 text-goldenrod">Support</h4>
                    <ul className="space-y-3 text-linen/70 text-sm">
                        <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">System Status</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-serif text-lg mb-6 text-goldenrod">Get in Touch</h4>
                    <ul className="space-y-3 text-linen/70 text-sm">
                        <li>sales@coopox.org</li>
                        <li>1-800-WEAVE-IT</li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-linen/40">
                <p>&copy; 2024 CoopOx Inc. All rights reserved.</p>
                <div className="flex gap-4 mt-4 md:mt-0">
                    <a href="#" className="hover:text-white">Privacy Policy</a>
                    <a href="#" className="hover:text-white">Terms of Service</a>
                </div>
            </div>
        </div>
      </footer>

      <WeaverAssistant />
    </div>
  );
};

export default App;