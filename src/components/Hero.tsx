
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = "Turn Images + Audio into Lifelike Avatars";
  
  useEffect(() => {
    if (typedText === fullText) return;
    
    const timeout = setTimeout(() => {
      setTypedText(fullText.slice(0, typedText.length + 1));
    }, 100);
    
    return () => clearTimeout(timeout);
  }, [typedText, fullText]);

  return (
    <section className="min-h-screen pt-32 pb-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20 bg-noise mix-blend-overlay pointer-events-none"></div>
      <div className="absolute top-1/3 -left-20 w-60 h-60 rounded-full bg-primary/20 filter blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-neon-purple/20 filter blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="mb-6 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="inline-block gradient-text">Nexus Avatar:</span>
            <br />
            <span className="text-white">AI-Powered Video Avatar Generator</span>
          </h1>
          
          <h2 className="mb-8 text-xl md:text-2xl font-light text-gray-300 h-8">
            {typedText}
            <span className="inline-block w-1 h-6 bg-primary ml-1 animate-pulse"></span>
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg flex items-center gap-2 px-8 neon-box">
              Get Started <ArrowRight className="w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10 text-lg">
              Watch Demo
            </Button>
          </div>
          
          {/* Avatar Preview Circle */}
          <div className="relative mx-auto mb-12">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-teal to-neon-blue opacity-50 blur-lg animate-pulse-glow"></div>
            <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto rounded-full border border-primary/30 overflow-hidden bg-black">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-primary/50 font-light text-lg animate-pulse">Your Avatar Here</div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { value: "10 sec", label: "Processing Time" },
              { value: "90%+", label: "Realism Score" },
              { value: "1000+", label: "Concurrent Users" },
              { value: "720-1080p", label: "Video Quality" }
            ].map((stat, i) => (
              <div key={i} className="p-4 rounded-lg border border-white/10 bg-black/50 backdrop-blur-sm">
                <div className="text-2xl md:text-3xl font-bold text-primary neon-glow mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
