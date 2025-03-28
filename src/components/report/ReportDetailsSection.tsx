
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
      <h3 className="text-lg font-medium mb-2">Detalhes da Denúncia</h3>
      
      <div>
        <Label htmlFor="category">Categoria</Label>
        <Select 
          onValueChange={(value) => handleSelectChange('category', value)}
          value={reportData.category}
        >
          <SelectTrigger id="category">
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
        <Label htmlFor="description">Descrição Detalhada</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Descreva a situação com o máximo de detalhes possível"
          value={reportData.description}
          onChange={handleInputChange}
          className="min-h-[120px]"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="date">Data da Ocorrência</Label>
        <Input
          id="date"
          name="date"
          type="date"
          value={reportData.date}
          onChange={handleInputChange}
        />
      </div>
      
      <div>
        <Label htmlFor="location">Local</Label>
        <Input
          id="location"
          name="location"
          placeholder="Departamento, unidade, local físico, etc."
          value={reportData.location}
          onChange={handleInputChange}
        />
      </div>
      
      <div>
        <Label htmlFor="involvedPeople">Pessoas Envolvidas</Label>
        <Textarea
          id="involvedPeople"
          name="involvedPeople"
          placeholder="Quem são as pessoas envolvidas? (nomes, cargos, etc.)"
          value={reportData.involvedPeople}
          onChange={handleInputChange}
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
          <Label htmlFor="hasEvidence">
            Possuo evidências que comprovam esta denúncia
          </Label>
        </div>
        
        {reportData.hasEvidence && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="evidenceDescription">Descreva as Evidências</Label>
              <Textarea
                id="evidenceDescription"
                name="evidenceDescription"
                placeholder="Descreva quais evidências você possui (documentos, e-mails, fotos, etc.)"
                value={reportData.evidenceDescription}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <Label>Upload de Evidências</Label>
              <FileUploader 
                onFilesSelected={handleFileChange}
                currentFiles={reportData.files}
              />
              <p className="text-xs text-gray-500 mt-1">
                Formatos aceitos: PDF, JPG, PNG, MP3, MP4 (máx. 10MB por arquivo)
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportDetailsSection;
