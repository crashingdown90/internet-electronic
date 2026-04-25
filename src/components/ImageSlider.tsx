"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const slides = [
  {
    id: 1,
    image: "/images/digital_network.png",
    tag: "Next-Gen Networks",
    title: "The Future of Connectivity",
    subtitle: "Experience blazing fast speeds and zero latency with the next generation of internet infrastructure.",
    link: "/blog/understanding-5g-home-internet"
  },
  {
    id: 2,
    image: "/images/smart_home.png",
    tag: "IoT Integration",
    title: "Intelligent Living Environments",
    subtitle: "Automate your daily routines and secure your home with seamlessly connected smart electronics.",
    link: "/blog/top-10-essential-smart-home-devices"
  },
  {
    id: 3,
    image: "/images/fiber_optics.png",
    tag: "High-Speed Data",
    title: "Operating at the Speed of Light",
    subtitle: "Unleash the full potential of your devices with enterprise-grade fiber optic technology for your home.",
    link: "/blog/fiber-optic-internet-gold-standard"
  },
  {
    id: 4,
    image: "/images/wifi_router.png",
    tag: "Hardware Optimization",
    title: "Eliminate Dead Zones Forever",
    subtitle: "Upgrade your networking hardware to ensure total, uninterrupted coverage in every room.",
    link: "/blog/troubleshooting-wifi-dead-zones"
  }
];

export default function ImageSlider() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    
    return () => clearInterval(timer);
  }, [isHovered]);

  const nextSlide = () => setCurrent(current === slides.length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? slides.length - 1 : current - 1);
  const goToSlide = (index: number) => setCurrent(index);

  return (
    <div 
      className="relative w-full h-[550px] md:h-[650px] rounded-[2rem] overflow-hidden shadow-2xl group animate-fade-in-up border border-slate-200/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image with Zoom Effect */}
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-[10000ms] ease-linear"
            style={{ 
              backgroundImage: `url('${slide.image}')`,
              transform: index === current ? "scale(1.08)" : "scale(1)"
            }}
          />
          
          {/* Premium Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/90 via-slate-900/40 to-transparent"></div>

          {/* Text Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
            <div className={`glass-panel-dark rounded-3xl p-8 md:p-12 max-w-3xl transition-all duration-700 transform ${index === current ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-1 bg-sky-500 rounded-full"></div>
                <span className="text-sky-300 text-xs font-black tracking-widest uppercase">
                  {slide.tag}
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-white leading-[1.1]">
                {slide.title}
              </h2>
              <p className="text-lg md:text-xl text-slate-300 mb-8 font-medium max-w-2xl leading-relaxed">
                {slide.subtitle}
              </p>
              <Link 
                href={slide.link} 
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold rounded-xl transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(14,165,233,0.4)]"
              >
                Read Expert Guide
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Controls */}
      <button 
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full glass-panel flex items-center justify-center text-slate-900 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full glass-panel flex items-center justify-center text-slate-900 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Pagination */}
      <div className="absolute bottom-10 right-10 z-20 flex space-x-3 bg-slate-900/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-500 rounded-full ${
              index === current 
                ? "w-8 h-2 bg-sky-400" 
                : "w-2 h-2 bg-white/40 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
