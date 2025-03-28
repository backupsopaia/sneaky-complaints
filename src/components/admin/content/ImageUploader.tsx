
import React, { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ImageUploaderProps {
  currentImage: string;
  onImageChange: (url: string) => void;
  label: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  currentImage, 
  onImageChange,
  label
}) => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes('image/')) {
      toast({
        variant: "destructive",
        title: "Formato inválido",
        description: "Por favor, selecione apenas arquivos de imagem."
      });
      return;
    }

    // In a real app, here we would upload to a server/storage
    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setTimeout(() => {
        if (reader.result) {
          setPreview(reader.result.toString());
          onImageChange(reader.result.toString());
        }
        setIsUploading(false);
        toast({
          title: "Upload completo",
          description: "A imagem foi carregada com sucesso."
        });
      }, 1500); // Simulate upload delay
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setPreview(null);
    onImageChange('/placeholder.svg');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium">{label}</div>
      
      <div className="relative rounded-lg border border-dashed border-gray-300 p-4 flex flex-col items-center">
        <div className="relative w-full max-w-md aspect-video bg-gray-100 rounded-md overflow-hidden">
          {(preview || currentImage) && (
            <>
              <img 
                src={preview || currentImage} 
                alt="Preview" 
                className="w-full h-full object-cover"
              />
              <button 
                onClick={removeImage}
                className="absolute top-2 right-2 p-1 bg-white/90 rounded-full text-gray-700 hover:text-red-500"
              >
                <X className="h-5 w-5" />
              </button>
            </>
          )}
        </div>
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        
        <Button 
          onClick={handleClick}
          variant="outline" 
          disabled={isUploading}
          className="mt-4"
        >
          <Upload className="h-4 w-4 mr-2" />
          {isUploading ? 'Enviando...' : 'Carregar Imagem'}
        </Button>
        
        <p className="text-xs text-gray-500 mt-2">
          Formatos aceitos: JPG, PNG, GIF, WEBP. Tamanho máximo: 5MB
        </p>
      </div>
    </div>
  );
};

export default ImageUploader;
