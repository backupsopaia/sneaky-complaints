import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Slide {
  title: string;
  highlight: string;
  description: string;
  image: string;
  features: string[];
}

const slides: Slide[] = [
  {
    title: "Denuncie de forma",
    highlight: "segura e anônima",
    description: "Nossa plataforma oferece um ambiente seguro e confidencial para você reportar irregularidades. Protegemos sua identidade enquanto garantimos que sua voz seja ouvida.",
    image: "/images/hero-1.jpg",
    features: [
      "100% anônimo",
      "Seguro e confidencial"
    ]
  },
  {
    title: "Acompanhe em",
    highlight: "tempo real",
    description: "Monitore o status das suas denúncias em tempo real. Nossa plataforma mantém você informado sobre cada etapa do processo de investigação.",
    image: "/images/hero-2.jpg",
    features: [
      "Atualizações em tempo real",
      "Processo transparente"
    ]
  }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  React.useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-[600px] bg-background overflow-hidden">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                {slides[currentSlide].title}{" "}
                <span className="text-primary">{slides[currentSlide].highlight}</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-[600px]">
                {slides[currentSlide].description}
              </p>
            </div>

            <div className="flex gap-4">
              <Button size="lg" className="px-8">
                Fazer Denúncia
              </Button>
              <Button size="lg" variant="outline">
                Saiba Mais
              </Button>
            </div>

            <div className="pt-8">
              <div className="grid grid-cols-2 gap-4">
                {slides[currentSlide].features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-sm font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            key={`image-${currentSlide}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <img
                src={slides[currentSlide].image}
                alt="Hero"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
          </motion.div>
        </div>

        {/* Navigation Buttons */}
        <div className="absolute bottom-8 right-8 flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="rounded-full"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? "bg-primary" : "bg-primary/20"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
