
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Shield, ArrowLeft, Send, Download, PaperclipIcon, File, Image, Music, Video, Clock } from "lucide-react";
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
import { useAuth } from '@/context/auth/useAuth';
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";

// Mock data for a report
const getMockReportDetails = (id: string) => ({
  id,
  date: '2023-05-15',
  category: 'Assédio Moral',
  status: 'Em Análise',
  anonymous: true,
  description: 'O denunciante relata situações repetidas de intimidação e humilhação no ambiente de trabalho, causando desconforto e prejudicando a saúde mental.',
  evidence: [
    { name: 'anexo1.pdf', type: 'pdf', size: 1450000 },
    { name: 'foto_evidencia.jpg', type: 'image', size: 2500000 },
    { name: 'audio_conversa.mp3', type: 'audio', size: 3400000 },
  ],
  timeline: [
    { action: 'Denúncia registrada', timestamp: '2023-05-15T10:30:00', actor: 'system' },
    { action: 'Status alterado para "Em Análise"', timestamp: '2023-05-16T09:15:00', actor: 'admin' },
    { action: 'Evidência adicionada: anexo1.pdf', timestamp: '2023-05-16T09:18:00', actor: 'admin' },
    { action: 'Mensagem enviada ao denunciante', timestamp: '2023-05-17T14:20:00', actor: 'admin' },
    { action: 'Resposta recebida do denunciante', timestamp: '2023-05-17T15:45:00', actor: 'user' },
  ],
  trackingCode: 'ABC-1234-XYZ',
  messages: [
    { sender: 'user', content: 'Gostaria de fornecer mais detalhes sobre o incidente.', timestamp: '2023-05-16T14:30:00' },
    { sender: 'company', content: 'Agradecemos seu relato. Poderia nos informar quando ocorreu o último evento?', timestamp: '2023-05-17T09:15:00' },
    { sender: 'user', content: 'O último evento foi na última semana, durante a reunião de equipe. O gestor fez comentários depreciativos sobre o meu trabalho na frente de todos os colegas, algo que vem acontecendo há meses.', timestamp: '2023-05-17T10:45:00' },
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [report, setReport] = useState(getMockReportDetails(id || '1'));
  const [newMessage, setNewMessage] = useState('');
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [report.messages]);
  
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
      const newTimeline = [...report.timeline, {
        action: `Status alterado para "${value}"`,
        timestamp: new Date().toISOString(),
        actor: 'admin'
      }];
      
      setReport({
        ...report,
        status: value,
        timeline: newTimeline
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
    
    const newTimeline = [...report.timeline, {
      action: `Mensagem enviada ao denunciante`,
      timestamp: new Date().toISOString(),
      actor: 'admin'
    }];
    
    setReport({
      ...report,
      messages: updatedMessages,
      timeline: newTimeline
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
  
  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
      case 'doc':
      case 'docx':
      case 'txt':
        return <File className="h-4 w-4" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'image':
        return <Image className="h-4 w-4" />;
      case 'mp3':
      case 'wav':
      case 'audio':
        return <Music className="h-4 w-4" />;
      case 'mp4':
      case 'avi':
      case 'mov':
      case 'video':
        return <Video className="h-4 w-4" />;
      default:
        return <PaperclipIcon className="h-4 w-4" />;
    }
  };
  
  const formatFileSize = (sizeInBytes: number) => {
    if (sizeInBytes < 1024) {
      return `${sizeInBytes} B`;
    } else if (sizeInBytes < 1048576) {
      return `${(sizeInBytes / 1024).toFixed(1)} KB`;
    } else {
      return `${(sizeInBytes / 1048576).toFixed(1)} MB`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-4 md:mb-6 flex items-center"
          onClick={handleBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para Dashboard
        </Button>
        
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
          <div className="w-full lg:w-3/4">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle className="flex items-center flex-wrap gap-2">
                      <span>Denúncia #{report.id}</span>
                      <Badge variant="outline" className="font-mono">
                        {report.trackingCode}
                      </Badge>
                      {report.anonymous && (
                        <Badge variant="secondary" className="ml-2">
                          Anônima
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription>
                      Registrada em {formatDate(report.date)}
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
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="details">Detalhes</TabsTrigger>
                    <TabsTrigger value="evidence">Evidências</TabsTrigger>
                    <TabsTrigger value="timeline">Histórico</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="details" className="space-y-4">
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
                      <div className="p-4 border rounded-md bg-gray-50">
                        <p className="text-gray-700 whitespace-pre-line">{report.description}</p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="evidence">
                    <h3 className="text-lg font-semibold mb-4">Evidências</h3>
                    {report.evidence.length === 0 ? (
                      <p className="text-gray-500">Nenhuma evidência registrada</p>
                    ) : (
                      <div className="space-y-3">
                        {report.evidence.map((file, index) => (
                          <div 
                            key={index} 
                            className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 flex items-center justify-center bg-gray-100 rounded">
                                {getFileIcon(file.type)}
                              </div>
                              <div>
                                <p className="font-medium">{file.name}</p>
                                <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="gap-1">
                              <Download className="h-4 w-4" />
                              <span>Baixar</span>
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="timeline">
                    <h3 className="text-lg font-semibold mb-4">Histórico da Denúncia</h3>
                    <div className="space-y-4">
                      {report.timeline.map((event, index) => (
                        <div key={index} className="flex gap-3">
                          <div className="mt-0.5">
                            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                              <Clock className="h-3 w-3 text-primary" />
                            </div>
                            {index < report.timeline.length - 1 && (
                              <div className="w-0.5 h-full bg-gray-200 mx-auto mt-1"></div>
                            )}
                          </div>
                          <div className="pb-4">
                            <p className="text-sm font-medium">{event.action}</p>
                            <p className="text-xs text-gray-500">{formatDate(event.timestamp)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          <div className="w-full lg:w-1/4 flex flex-col">
            <Card className="h-full flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Chat Seguro</CardTitle>
                </div>
                <CardDescription>
                  Comunicação anônima com o denunciante
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <div className="flex-grow overflow-y-auto mb-4 space-y-3 max-h-96 pr-1">
                  <AnimatePresence initial={false}>
                    {report.messages.map((message, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`p-3 rounded-lg ${
                          message.sender === 'company' 
                            ? 'bg-primary/10 ml-6' 
                            : 'bg-gray-100 mr-6'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className={`text-xs font-medium ${message.sender === 'company' ? 'text-primary' : ''}`}>
                            {message.sender === 'company' ? 'Você' : 'Denunciante'}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatDate(message.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm break-words">{message.content}</p>
                      </motion.div>
                    ))}
                    <div ref={messagesEndRef} />
                  </AnimatePresence>
                </div>
                
                <div className="flex gap-2 mt-auto">
                  <Textarea
                    placeholder="Digite sua mensagem aqui..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="resize-none min-h-[80px]"
                  />
                  <Button 
                    className="shrink-0 self-end h-10" 
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                  >
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Enviar</span>
                  </Button>
                </div>
                
                <div className="mt-3 p-2 bg-yellow-50 rounded-md border border-yellow-100">
                  <p className="text-xs text-yellow-800">
                    Esta conversa é segura e protegida. O denunciante não terá sua identidade revelada, mesmo se tiver se identificado para a empresa.
                  </p>
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
