'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { Wind, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface HeroSlide {
  title: string;
  subtitle: string;
  bgClass: string;
}

const slides: HeroSlide[] = [
  {
    title: 'Live the Tarifa Dream',
    subtitle: "Your guide to expat life at Europe's kitesurfing capital",
    bgClass: 'from-ocean-500 via-ocean-600 to-ocean-700',
  },
  {
    title: 'Wind, Waves & Wonder',
    subtitle: 'Discover the best beach lifestyle in southern Spain',
    bgClass: 'from-sunset-400 via-sunset-500 to-ocean-600',
  },
  {
    title: 'Your Tarifa Journey',
    subtitle: 'Everything you need to live, work, and play in Tarifa',
    bgClass: 'from-ocean-600 via-ocean-700 to-ocean-800',
  },
];

interface HeroCarouselProps {
  heroTitle?: string;
  heroSubtitle?: string;
  heroCta?: string;
}

export function HeroCarousel({
  heroTitle,
  heroSubtitle,
  heroCta = 'Explore Tarifa',
}: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slide = slides[currentSlide];
  const displayTitle = heroTitle || slide.title;
  const displaySubtitle = heroSubtitle || slide.subtitle;

  return (
    <section
      className={cn(
        'relative overflow-hidden py-24 text-white transition-colors duration-1000 md:py-32',
        'bg-gradient-to-br',
        slide.bgClass
      )}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.2)_1px,_transparent_1px)] bg-[length:24px_24px]" />
      </div>

      <div className="container relative mx-auto px-4 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              {displayTitle}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80 sm:text-xl">
              {displaySubtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-sunset-400 text-white hover:bg-sunset-500"
          >
            <Link href="/about">{heroCta}</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white/10"
          >
            <Link href="/conditions">
              <Wind className="mr-2 h-5 w-5" />
              Check Conditions
            </Link>
          </Button>
        </div>

        {/* Slide navigation */}
        {slides.length > 1 && (
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              onClick={prevSlide}
              className="rounded-full p-1 text-white/50 transition-colors hover:text-white"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={cn(
                    'h-2 rounded-full transition-all',
                    index === currentSlide
                      ? 'w-8 bg-white'
                      : 'w-2 bg-white/40 hover:bg-white/60'
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="rounded-full p-1 text-white/50 transition-colors hover:text-white"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="var(--background)"
          />
        </svg>
      </div>
    </section>
  );
}
