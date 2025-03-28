
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { FileIcon, XIcon, Image, FileText, Music, Video } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
  currentFiles: File[];
  maxFiles?: number;
  maxSizeInMB?: number;
  acceptedFileTypes?: string;
}

export const FileUploader = ({
  onFilesSelected,
  currentFiles = [],
  maxFiles = 5,
  maxSizeInMB = 10,
  acceptedFileTypes = ".jpg,.jpeg,.png,.pdf,.mp3,.mp4"
}: FileUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const validFiles = validateFiles(newFiles);
      if (validFiles.length > 0) {
        onFilesSelected([...currentFiles, ...validFiles]);
      }
      // Clear the input to allow uploading the same file again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };
  
  const validateFiles = (files: File[]): File[] => {
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    
    // Check if adding these files would exceed the max file count
    if (currentFiles.length + files.length > maxFiles) {
      alert(`Você só pode fazer upload de ${maxFiles} arquivos no total.`);
      return files.slice(0, maxFiles - currentFiles.length);
    }
    
    // Validate each file size
    const validFiles = files.filter(file => {
      if (file.size > maxSizeInBytes) {
        alert(`O arquivo "${file.name}" excede o tamanho máximo de ${maxSizeInMB}MB.`);
        return false;
      }
      return true;
    });
    
    return validFiles;
  };
  
  const removeFile = (index: number) => {
    const newFiles = [...currentFiles];
    newFiles.splice(index, 1);
    onFilesSelected(newFiles);
  };
  
  const getIconForFile = (file: File) => {
    const type = file.type.split('/')[0];
    switch (type) {
      case 'image':
        return <Image className="h-5 w-5 text-blue-500" />;
      case 'application':
        return <FileText className="h-5 w-5 text-orange-500" />;
      case 'audio':
        return <Music className="h-5 w-5 text-purple-500" />;
      case 'video':
        return <Video className="h-5 w-5 text-red-500" />;
      default:
        return <FileIcon className="h-5 w-5 text-gray-500" />;
    }
  };
  
  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      const validFiles = validateFiles(droppedFiles);
      if (validFiles.length > 0) {
        onFilesSelected([...currentFiles, ...validFiles]);
      }
    }
  };
  
  return (
    <div className="space-y-4">
      <div 
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors",
          isDragging ? "border-primary bg-primary/5" : "border-gray-300"
        )}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <FileIcon className="mx-auto h-10 w-10 text-gray-400 mb-2" />
        <p className="text-sm font-medium mb-1">
          Arraste e solte arquivos ou clique para selecionar
        </p>
        <p className="text-xs text-gray-500">
          Máximo {maxFiles} arquivos, {maxSizeInMB}MB cada
        </p>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          multiple
          accept={acceptedFileTypes}
          onChange={handleFileChange}
        />
      </div>
      
      {currentFiles.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Arquivos selecionados:</p>
          <ul className="space-y-2">
            {currentFiles.map((file, index) => (
              <li key={`${file.name}-${index}`} className="flex items-center justify-between bg-gray-50 p-2 rounded text-sm">
                <div className="flex items-center space-x-2 truncate">
                  {getIconForFile(file)}
                  <span className="truncate max-w-[200px]">{file.name}</span>
                  <span className="text-gray-500 text-xs">
                    ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                  </span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 w-7 p-0" 
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
