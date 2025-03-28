
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileImage, FileText, FileVideo, Music, Plus, User, Briefcase, GraduationCap, FileBox } from "lucide-react";

interface OverviewTabContentProps {
  handleCreateReport: () => void;
}

const OverviewTabContent = ({ handleCreateReport }: OverviewTabContentProps) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Categorias</h1>
        <Button variant="outline" onClick={handleCreateReport}>
          Nova Denúncia
        </Button>
      </div>
      
      {/* Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-blue-500 text-white p-4 flex flex-col items-center hover:bg-blue-600 transition-colors cursor-pointer">
          <FileImage size={28} className="mb-2" />
          <span className="font-medium">Fotos</span>
          <span className="text-xs text-white/80">340 arquivos</span>
        </Card>
        
        <Card className="bg-teal-500 text-white p-4 flex flex-col items-center hover:bg-teal-600 transition-colors cursor-pointer">
          <FileText size={28} className="mb-2" />
          <span className="font-medium">Documentos</span>
          <span className="text-xs text-white/80">120 arquivos</span>
        </Card>
        
        <Card className="bg-pink-500 text-white p-4 flex flex-col items-center hover:bg-pink-600 transition-colors cursor-pointer">
          <FileVideo size={28} className="mb-2" />
          <span className="font-medium">Vídeos</span>
          <span className="text-xs text-white/80">30 arquivos</span>
        </Card>
        
        <Card className="bg-blue-600 text-white p-4 flex flex-col items-center hover:bg-blue-700 transition-colors cursor-pointer">
          <Music size={28} className="mb-2" />
          <span className="font-medium">Áudio</span>
          <span className="text-xs text-white/80">80 arquivos</span>
        </Card>
      </div>
      
      <h2 className="text-xl font-semibold mb-4">Arquivos</h2>
      
      {/* Folder Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-white p-4 border hover:shadow-md transition-all cursor-pointer">
          <div className="flex flex-col items-center">
            <Briefcase size={24} className="text-gray-600 mb-2" />
            <span className="font-medium">Trabalhar</span>
            <span className="text-xs text-gray-500">820 arquivos</span>
          </div>
        </Card>
        
        <Card className="bg-white p-4 border hover:shadow-md transition-all cursor-pointer">
          <div className="flex flex-col items-center">
            <User size={24} className="text-gray-600 mb-2" />
            <span className="font-medium">Pessoal</span>
            <span className="text-xs text-gray-500">115 arquivos</span>
          </div>
        </Card>
        
        <Card className="bg-white p-4 border hover:shadow-md transition-all cursor-pointer">
          <div className="flex flex-col items-center">
            <GraduationCap size={24} className="text-gray-600 mb-2" />
            <span className="font-medium">Escola</span>
            <span className="text-xs text-gray-500">65 arquivos</span>
          </div>
        </Card>
        
        <Card className="bg-white p-4 border hover:shadow-md transition-all cursor-pointer">
          <div className="flex flex-col items-center">
            <FileBox size={24} className="text-gray-600 mb-2" />
            <span className="font-medium">Arquivo</span>
            <span className="text-xs text-gray-500">21 arquivos</span>
          </div>
        </Card>
      </div>
      
      <h2 className="text-xl font-semibold mb-4">Arquivos Recentes</h2>
      
      {/* Files List */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <div className="divide-y">
          {[
            { name: 'IMG_100000', type: 'Arquivo', size: '5 MB', icon: FileImage, color: 'bg-blue-500' },
            { name: 'Pitch de', type: 'Arquivo', size: '105 MB', icon: FileVideo, color: 'bg-pink-500' },
            { name: 'Batida de estilo', type: 'Arquivo', size: '21 MB', icon: Music, color: 'bg-blue-600' },
            { name: 'Proposta de', type: 'Arquivo', size: '500 kb', icon: FileText, color: 'bg-teal-500' }
          ].map((file, index) => (
            <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50">
              <div className="flex items-center">
                <div className={`p-2 ${file.color} text-white rounded-lg mr-3`}>
                  <file.icon size={20} />
                </div>
                <div>
                  <h3 className="font-medium">{file.name}</h3>
                  <p className="text-sm text-gray-500">{file.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">{file.size}</span>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewTabContent;
