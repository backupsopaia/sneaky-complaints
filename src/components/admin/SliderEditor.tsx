import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X, ArrowUp, ArrowDown } from 'lucide-react';
import { ImageUpload } from './ImageUpload';

interface SliderEditorProps {
  section: string;
  sliders: Array<{
    id: string;
    title: string;
    description: string;
    buttonText?: string;
    buttonUrl?: string;
    image: {
      id: string;
      url: string;
      alt: string;
      title: string;
    };
  }>;
  onUpdate: (sliders: any[]) => void;
}

export const SliderEditor: React.FC<SliderEditorProps> = ({ section, sliders, onUpdate }) => {
  const handleAddSlide = () => {
    const newSlide = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'Novo Slide',
      description: 'Descrição do slide',
      buttonText: 'Saiba Mais',
      buttonUrl: '#',
      image: {
        id: Math.random().toString(36).substr(2, 9),
        url: '',
        alt: '',
        title: ''
      }
    };
    onUpdate([...sliders, newSlide]);
  };

  const handleRemoveSlide = (id: string) => {
    onUpdate(sliders.filter(slide => slide.id !== id));
  };

  const handleUpdateSlide = (id: string, field: string, value: any) => {
    onUpdate(sliders.map(slide =>
      slide.id === id ? { ...slide, [field]: value } : slide
    ));
  };

  const handleMoveSlide = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= sliders.length) return;
    
    const newSliders = [...sliders];
    const temp = newSliders[index];
    newSliders[index] = newSliders[newIndex];
    newSliders[newIndex] = temp;
    onUpdate(newSliders);
  };

  return (
    <div className="space-y-6">
      <Button onClick={handleAddSlide}>
        <Plus className="w-4 h-4 mr-2" />
        Adicionar Slide
      </Button>

      <div className="space-y-6">
        {sliders.map((slide, index) => (
          <Card key={slide.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">Slide {index + 1}</h3>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleMoveSlide(index, 'up')}
                  disabled={index === 0}
                >
                  <ArrowUp className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleMoveSlide(index, 'down')}
                  disabled={index === sliders.length - 1}
                >
                  <ArrowDown className="w-4 h-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleRemoveSlide(slide.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor={`title-${slide.id}`}>Título</Label>
                  <Input
                    id={`title-${slide.id}`}
                    value={slide.title}
                    onChange={(e) => handleUpdateSlide(slide.id, 'title', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor={`description-${slide.id}`}>Descrição</Label>
                  <Textarea
                    id={`description-${slide.id}`}
                    value={slide.description}
                    onChange={(e) => handleUpdateSlide(slide.id, 'description', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor={`buttonText-${slide.id}`}>Texto do Botão</Label>
                  <Input
                    id={`buttonText-${slide.id}`}
                    value={slide.buttonText}
                    onChange={(e) => handleUpdateSlide(slide.id, 'buttonText', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor={`buttonUrl-${slide.id}`}>URL do Botão</Label>
                  <Input
                    id={`buttonUrl-${slide.id}`}
                    value={slide.buttonUrl}
                    onChange={(e) => handleUpdateSlide(slide.id, 'buttonUrl', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label>Imagem do Slide</Label>
                <ImageUpload
                  section={`slider-${slide.id}`}
                  images={[slide.image]}
                  onUpdate={(images) => handleUpdateSlide(slide.id, 'image', images[0])}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
