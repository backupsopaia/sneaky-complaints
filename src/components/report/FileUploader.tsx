import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { FileIcon, XIcon, Image, FileText, Music, Video, Lock, File, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

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
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const validationResult = validateFiles(newFiles);
      
      if (validationResult.isValid) {
        setError(null);
        onFilesSelected([...currentFiles, ...validationResult.validFiles]);
      } else {
        setError(validationResult.error);
      }
      
      // Clear the input to allow uploading the same file again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };
  
  const validateFiles = (files: File[]): { isValid: boolean; validFiles: File[]; error: string | null } => {
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    const validFiles: File[] = [];
    let error: string | null = null;
    
    // Check if adding these files would exceed the max file count
    if (currentFiles.length + files.length > maxFiles) {
      return {
        isValid: false,
        validFiles: [],
        error: `Você só pode fazer upload de ${maxFiles} arquivos no total.`
      };
    }
    
    // Validate each file size and type
    for (const file of files) {
      // Check file size
      if (file.size > maxSizeInBytes) {
        return {
          isValid: false,
          validFiles: [],
          error: `O arquivo "${file.name}" excede o tamanho máximo de ${maxSizeInMB}MB.`
        };
      }
      
      // Check file type if acceptedFileTypes is provided
      if (acceptedFileTypes && acceptedFileTypes.length > 0) {
        const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;
        const acceptedTypesArray = acceptedFileTypes.split(',');
        
        if (!acceptedTypesArray.some(type => 
          type === fileExtension || 
          type === file.type || 
          (type === '.jpg' && fileExtension === '.jpeg')
        )) {
          return {
            isValid: false,
            validFiles: [],
            error: `O arquivo "${file.name}" não é um tipo permitido. Tipos aceitos: ${acceptedFileTypes}`
          };
        }
      }
      
      validFiles.push(file);
    }
    
    return {
      isValid: true,
      validFiles,
      error: null
    };
  };
  
  const removeFile = (index: number) => {
    const newFiles = [...currentFiles];
    newFiles.splice(index, 1);
    onFilesSelected(newFiles);
    setError(null);
  };
  
  const getIconForFile = (file: File) => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    const type = file.type.split('/')[0];
    
    switch (type) {
      case 'image':
        return <Image className="h-5 w-5 text-blue-500" />;
      case 'audio':
        return <Music className="h-5 w-5 text-purple-500" />;
      case 'video':
        return <Video className="h-5 w-5 text-red-500" />;
      default:
        // Handle specific document types
        switch (extension) {
          case 'pdf':
            return <FileText className="h-5 w-5 text-orange-500" />;
          case 'doc':
          case 'docx':
            return <FileText className="h-5 w-5 text-blue-700" />;
          case 'xls':
          case 'xlsx':
            return <FileText className="h-5 w-5 text-green-600" />;
          default:
            return <File className="h-5 w-5 text-gray-500" />;
        }
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
      const validationResult = validateFiles(droppedFiles);
      
      if (validationResult.isValid) {
        setError(null);
        onFilesSelected([...currentFiles, ...validationResult.validFiles]);
      } else {
        setError(validationResult.error);
      }
    }
  };
  
  return (
    <div className="space-y-4">
      <div 
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
          isDragging ? "border-primary bg-primary/5" : "border-gray-300 dark:border-gray-600",
          error ? "border-red-300 dark:border-red-500" : "",
          "hover:bg-gray-50 dark:hover:bg-gray-800/50"
        )}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center">
          <div className="mb-3 p-2 bg-primary/10 dark:bg-primary/20 rounded-full">
            <FileIcon className="h-6 w-6 text-primary" />
          </div>
          <p className="text-sm font-medium mb-1 text-gray-900 dark:text-gray-100">
            Arraste e solte arquivos ou clique para selecionar
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <Lock className="h-3 w-3" /> Upload seguro e criptografado
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
      </div>
      
      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 p-3 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-md"
          >
            <AlertCircle className="h-4 w-4" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>
      
      {currentFiles.length > 0 && (
        <div className="space-y-2">
          {currentFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md"
            >
              <div className="flex items-center gap-3">
                {getIconForFile(file)}
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{file.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeFile(index)}
                className="h-8 w-8 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
              >
                <XIcon className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
