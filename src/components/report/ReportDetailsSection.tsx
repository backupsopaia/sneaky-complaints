import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileUploader } from './FileUploader';

interface ReportDetailsSectionProps {
  reportData: {
    category: string;
    description: string;
    date: string;
    location: string;
    involvedPeople: string;
    hasEvidence: boolean;
    evidenceDescription: string;
    files: File[];
    [key: string]: any;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleCheckboxChange: (name: string, checked: boolean) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleFileChange: (files: File[]) => void;
}

const ReportDetailsSection = ({
  reportData,
  handleInputChange,
  handleCheckboxChange,
  handleSelectChange,
  handleFileChange
}: ReportDetailsSectionProps) => {
  return (
    <div className="mb-6 space-y-4">
      <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">Detalhes da Denúncia</h3>
      
      <div>
        <Label htmlFor="category" className="text-gray-700 dark:text-gray-300">Categoria</Label>
        <Select 
          onValueChange={(value) => handleSelectChange('category', value)}
          value={reportData.category}
        >
          <SelectTrigger id="category" className="bg-white/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700">
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="assedio-moral">Assédio Moral</SelectItem>
            <SelectItem value="assedio-sexual">Assédio Sexual</SelectItem>
            <SelectItem value="corrupcao">Corrupção</SelectItem>
            <SelectItem value="fraude">Fraude</SelectItem>
            <SelectItem value="conflito-interesses">Conflito de Interesses</SelectItem>
            <SelectItem value="discriminacao">Discriminação</SelectItem>
            <SelectItem value="outro">Outro</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="description" className="text-gray-700 dark:text-gray-300">Descrição Detalhada</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Descreva a situação com o máximo de detalhes possível"
          value={reportData.description}
          onChange={handleInputChange}
          className="min-h-[120px] bg-white/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="date" className="text-gray-700 dark:text-gray-300">Data da Ocorrência</Label>
        <Input
          id="date"
          name="date"
          type="date"
          value={reportData.date}
          onChange={handleInputChange}
          className="bg-white/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700"
        />
      </div>
      
      <div>
        <Label htmlFor="location" className="text-gray-700 dark:text-gray-300">Local</Label>
        <Input
          id="location"
          name="location"
          placeholder="Departamento, unidade, local físico, etc."
          value={reportData.location}
          onChange={handleInputChange}
          className="bg-white/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700"
        />
      </div>
      
      <div>
        <Label htmlFor="involvedPeople" className="text-gray-700 dark:text-gray-300">Pessoas Envolvidas</Label>
        <Textarea
          id="involvedPeople"
          name="involvedPeople"
          placeholder="Quem são as pessoas envolvidas? (nomes, cargos, etc.)"
          value={reportData.involvedPeople}
          onChange={handleInputChange}
          className="bg-white/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700"
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="hasEvidence" 
            checked={reportData.hasEvidence}
            onCheckedChange={(checked) => 
              handleCheckboxChange('hasEvidence', checked as boolean)
            }
          />
          <Label htmlFor="hasEvidence" className="text-gray-700 dark:text-gray-300">
            Possuo evidências que comprovam esta denúncia
          </Label>
        </div>
        
        {reportData.hasEvidence && (
          <div className="space-y-4 mt-4 p-4 border border-gray-200 dark:border-gray-700 rounded-md bg-white/30 dark:bg-gray-900/30 backdrop-blur-lg">
            <div>
              <Label htmlFor="evidenceDescription" className="text-gray-700 dark:text-gray-300">Descreva as Evidências</Label>
              <Textarea
                id="evidenceDescription"
                name="evidenceDescription"
                placeholder="Descreva quais evidências você possui (documentos, e-mails, fotos, etc.)"
                value={reportData.evidenceDescription}
                onChange={handleInputChange}
                className="bg-white/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700"
              />
            </div>
            
            <div>
              <Label className="mb-2 block text-gray-700 dark:text-gray-300">Upload de Evidências</Label>
              <FileUploader 
                onFilesSelected={handleFileChange}
                currentFiles={reportData.files}
                maxFiles={5}
                maxSizeInMB={10}
                acceptedFileTypes=".jpg,.jpeg,.png,.pdf,.mp3,.mp4,.doc,.docx"
              />
              <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 space-y-1">
                <p>Formatos aceitos: PDF, Word, JPG, PNG, MP3, MP4</p>
                <p>Tamanho máximo: 10MB por arquivo, 5 arquivos no total</p>
                <p className="text-primary/80 font-medium">
                  Todos os uploads são criptografados para proteção dos dados
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportDetailsSection;
