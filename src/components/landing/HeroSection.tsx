
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useContent } from '@/context/content';

const HeroSection = () => {
  const navigate = useNavigate();
  const { content } = useContent();
  const { title, subtitle, bodyText, bannerImage } = content.homepage;

  return (
    <section className="py-20 bg-white/50 backdrop-blur-lg dark:bg-transparent border-b">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">{title}</h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">{subtitle}</p>
            </div>
            <div className="space-y-2" dangerouslySetInnerHTML={{ __html: bodyText }} />
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button onClick={() => navigate('/login')}>
                Iniciar Sessão
              </Button>
              <Button variant="outline" onClick={() => navigate('/register')}>
                Registar-se
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <img 
              src={bannerImage} 
              width={500} 
              height={400} 
              alt="Canal de Denúncias" 
              className="aspect-video overflow-hidden rounded-xl object-cover object-center" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
