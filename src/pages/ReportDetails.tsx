
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Shield, ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/context/AuthContext';

// Mock data for a report
const getMockReportDetails = (id: string) => ({
  id,
  date: '2023-05-15',
  category: 'Assédio Moral',
  status: 'Em Análise',
  anonymous: true,
  description: 'O denunciante relata situações repetidas de intimidação e humilhação no ambiente de trabalho, causando desconforto e prejudicando a saúde mental.',
  evidence: ['anexo1.pdf', 'anexo2.jpg'],
  trackingCode: 'ABC-1234-XYZ',
  messages: [
    { sender: 'user', content: 'Gostaria de fornecer mais detalhes sobre o incidente.', timestamp: '2023-05-16T14:30:00' },
    { sender: 'company', content: 'Agradecemos seu relato. Poderia nos informar quando ocorreu o último evento?', timestamp: '2023-05-17T09:15:00' },
    { sender: 'user', content: 'O último evento foi na última semana, durante a reunião de equipe.', timestamp: '2023-05-17T10:45:00' },
  ]
});

const statusOptions = [
  { value: 'Pendente', label: 'Pendente' },
  { value: 'Em Análise', label: 'Em Análise' },
  { value: 'Investigação', label: 'Investigação' },
  { value: 'Concluído', label: 'Concluído' },
];

const ReportDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [report, setReport] = useState(getMockReportDetails(id || '1'));
  const [newMessage, setNewMessage] = useState('');
  const [statusUpdating, setStatusUpdating] = useState(false);
  
  if (!user) {
    navigate('/login');
    return null;
  }
  
  const handleBack = () => {
    navigate('/dashboard');
  };
  
  const handleStatusChange = (value: string) => {
    setStatusUpdating(true);
    
    // Simulate API call to update status
    setTimeout(() => {
      setReport({
        ...report,
        status: value
      });
      
      toast({
        title: "Status atualizado",
        description: `A denúncia agora está ${value}`,
      });
      
      setStatusUpdating(false);
    }, 800);
  };
  
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Simulate API call to send message
    const updatedMessages = [
      ...report.messages,
      {
        sender: 'company',
        content: newMessage,
        timestamp: new Date().toISOString()
      }
    ];
    
    setReport({
      ...report,
      messages: updatedMessages
    });
    
    setNewMessage('');
    
    toast({
      title: "Mensagem enviada",
      description: "Sua mensagem foi enviada ao denunciante.",
    });
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-6 flex items-center"
          onClick={handleBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para Dashboard
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center">
                      Denúncia #{report.id}
                      <span className="ml-2 px-2 py-1 text-xs bg-gray-100 rounded-full">
                        {report.trackingCode}
                      </span>
                    </CardTitle>
                    <CardDescription>
                      Registrada em {report.date}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Status:</span>
                    <Select
                      value={report.status}
                      onValueChange={handleStatusChange}
                      disabled={statusUpdating}
                    >
                      <SelectTrigger className="w-36">
                        <SelectValue placeholder="Selecionar status" />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Detalhes</h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Categoria</p>
                        <p>{report.category}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Tipo</p>
                        <p>{report.anonymous ? 'Anônima' : 'Identificada'}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Descrição</h3>
                    <p className="text-gray-700 whitespace-pre-line">{report.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Evidências</h3>
                    <div className="flex flex-wrap gap-2">
                      {report.evidence.map((file, index) => (
                        <div 
                          key={index} 
                          className="px-3 py-2 bg-gray-100 rounded-md text-sm flex items-center"
                        >
                          {file}
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0 ml-2">
                            <span className="sr-only">Download</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-1">
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>Comunicação</CardTitle>
                <CardDescription>
                  Chat seguro com o denunciante
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <div className="flex-grow overflow-y-auto mb-4 space-y-4 max-h-96">
                  {report.messages.map((message, index) => (
                    <div 
                      key={index}
                      className={`p-3 rounded-lg ${
                        message.sender === 'company' 
                          ? 'bg-primary/10 ml-6' 
                          : 'bg-gray-100 mr-6'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-medium">
                          {message.sender === 'company' ? 'Você' : 'Denunciante'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDate(message.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  ))}
                </div>
                
                <div className="flex space-x-2">
                  <Textarea
                    placeholder="Digite sua mensagem aqui..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="resize-none"
                  />
                  <Button 
                    className="shrink-0" 
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                  >
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Enviar</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetails;
