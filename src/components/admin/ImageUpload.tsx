import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Image, X, Upload } from 'lucide-react';

interface ImageUploadProps {
  section: string;
  images: Array<{
    id: string;
    url: string;
    alt: string;
    title: string;
  }>;
  onUpdate: (images: any[]) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ section, images, onUpdate }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Em produção, aqui você faria o upload para um serviço de armazenamento
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        const newImage = {
          id: Math.random().toString(36).substr(2, 9),
          url: reader.result as string,
          alt: file.name,
          title: file.name
        };
        onUpdate([...images, newImage]);
      };
      reader.readAsDataURL(file);
    });
  }, [images, onUpdate]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    }
  });

  const handleRemoveImage = (id: string) => {
    onUpdate(images.filter(img => img.id !== id));
  };

  const handleUpdateImage = (id: string, field: string, value: string) => {
    onUpdate(images.map(img => 
      img.id === id ? { ...img, [field]: value } : img
    ));
  };

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors ${
          isDragActive ? 'border-primary bg-primary/5' : 'border-border'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-muted-foreground">
          {isDragActive
            ? 'Solte as imagens aqui...'
            : 'Arraste e solte imagens aqui, ou clique para selecionar'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image) => (
          <Card key={image.id} className="p-4">
            <div className="relative">
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-48 object-cover rounded-lg"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => handleRemoveImage(image.id)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor={`title-${image.id}`}>Título</Label>
                <Input
                  id={`title-${image.id}`}
                  value={image.title}
                  onChange={(e) => handleUpdateImage(image.id, 'title', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor={`alt-${image.id}`}>Texto Alternativo</Label>
                <Input
                  id={`alt-${image.id}`}
                  value={image.alt}
                  onChange={(e) => handleUpdateImage(image.id, 'alt', e.target.value)}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
