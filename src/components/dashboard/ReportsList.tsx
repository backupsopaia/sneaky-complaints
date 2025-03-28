
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, MessageSquare, Eye, Calendar, Tag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// Mock data for the reports
const mockReports = [
  {
    id: '1',
    date: '2023-05-15',
    category: 'Assédio Moral',
    status: 'Em Análise',
    anonymous: true,
    trackingCode: 'ABC-1234-XYZ',
    unreadMessages: 2,
    evidence: ['documento.pdf', 'imagem.jpg']
  },
  {
    id: '2',
    date: '2023-05-10',
    category: 'Fraude',
    status: 'Investigação',
    anonymous: false,
    trackingCode: 'DEF-5678-UVW',
    unreadMessages: 0,
    evidence: ['planilha.xlsx']
  },
  {
    id: '3',
    date: '2023-05-02',
    category: 'Conflito de Interesses',
    status: 'Concluído',
    anonymous: true,
    trackingCode: 'GHI-9012-RST',
    unreadMessages: 0,
    evidence: []
  },
  {
    id: '4',
    date: '2023-06-12',
    category: 'Assédio Sexual',
    status: 'Pendente',
    anonymous: true,
    trackingCode: 'JKL-3456-MNO',
    unreadMessages: 1,
    evidence: ['audio.mp3', 'documento.pdf']
  },
  {
    id: '5',
    date: '2023-06-05',
    category: 'Corrupção',
    status: 'Em Análise',
    anonymous: false,
    trackingCode: 'PQR-7890-STU',
    unreadMessages: 0,
    evidence: ['contrato.pdf']
  }
];

interface ReportsListProps {
  className?: string;
}

const ReportsList = ({ className }: ReportsListProps) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filtros
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [dateFromFilter, setDateFromFilter] = useState<Date | undefined>(undefined);
  const [dateToFilter, setDateToFilter] = useState<Date | undefined>(undefined);
  const [hasEvidenceFilter, setHasEvidenceFilter] = useState<string>('all');
  const [hasMessagesFilter, setHasMessagesFilter] = useState<string>('all');
  
  const statusOptions = [
    { value: 'all', label: 'Todos os Status' },
    { value: 'Pendente', label: 'Pendente' },
    { value: 'Em Análise', label: 'Em Análise' },
    { value: 'Investigação', label: 'Investigação' },
    { value: 'Concluído', label: 'Concluído' },
  ];
  
  const categoryOptions = [
    { value: 'all', label: 'Todas as Categorias' },
    { value: 'Assédio Moral', label: 'Assédio Moral' },
    { value: 'Assédio Sexual', label: 'Assédio Sexual' },
    { value: 'Fraude', label: 'Fraude' },
    { value: 'Conflito de Interesses', label: 'Conflito de Interesses' },
    { value: 'Corrupção', label: 'Corrupção' },
  ];
  
  // Filter reports based on all filters
  const filteredReports = mockReports.filter(report => {
    // Status filter
    if (statusFilter !== 'all' && report.status !== statusFilter) return false;
    
    // Category filter
    if (categoryFilter !== 'all' && report.category !== categoryFilter) return false;
    
    // Date range filter
    if (dateFromFilter) {
      const reportDate = new Date(report.date);
      if (reportDate < dateFromFilter) return false;
    }
    
    if (dateToFilter) {
      const reportDate = new Date(report.date);
      // Add one day to include the end date
      const endDate = new Date(dateToFilter);
      endDate.setDate(endDate.getDate() + 1);
      if (reportDate > endDate) return false;
    }
    
    // Evidence filter
    if (hasEvidenceFilter === 'with' && report.evidence.length === 0) return false;
    if (hasEvidenceFilter === 'without' && report.evidence.length > 0) return false;
    
    // Messages filter
    if (hasMessagesFilter === 'with' && report.unreadMessages === 0) return false;
    if (hasMessagesFilter === 'without' && report.unreadMessages > 0) return false;
    
    // Search term
    const matchesSearch = 
      report.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.trackingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.id.includes(searchTerm);
    
    return matchesSearch;
  });
  
  const handleViewReport = (id: string) => {
    navigate(`/report/${id}`);
  };
  
  const getStatusClassName = (status: string) => {
    switch (status) {
      case 'Pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Em Análise':
        return 'bg-blue-100 text-blue-800';
      case 'Investigação':
        return 'bg-purple-100 text-purple-800';
      case 'Concluído':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const clearFilters = () => {
    setStatusFilter('all');
    setCategoryFilter('all');
    setDateFromFilter(undefined);
    setDateToFilter(undefined);
    setHasEvidenceFilter('all');
    setHasMessagesFilter('all');
    setSearchTerm('');
  };
  
  const getActiveFiltersCount = () => {
    let count = 0;
    if (statusFilter !== 'all') count++;
    if (categoryFilter !== 'all') count++;
    if (dateFromFilter) count++;
    if (dateToFilter) count++;
    if (hasEvidenceFilter !== 'all') count++;
    if (hasMessagesFilter !== 'all') count++;
    return count;
  };
  
  const activeFiltersCount = getActiveFiltersCount();

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <CardTitle>Denúncias Recebidas</CardTitle>
            <CardDescription>Gerencie e acompanhe as denúncias da sua empresa</CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Buscar denúncias..."
                className="pl-8 w-full sm:w-60"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              className="flex items-center gap-1"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              <span>Filtros</span>
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center rounded-full text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
        
        {showFilters && (
          <div className="mt-4 p-4 border rounded-md bg-background space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Filtros Avançados</h3>
              <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8">
                <X className="h-4 w-4 mr-1" />
                Limpar Filtros
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Status</label>
                <Select 
                  value={statusFilter} 
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrar por status" />
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
              
              <div>
                <label className="text-sm font-medium">Categoria</label>
                <Select 
                  value={categoryFilter} 
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrar por categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium">Data de Início</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateFromFilter ? (
                        format(dateFromFilter, "dd/MM/yyyy")
                      ) : (
                        <span>Selecionar data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dateFromFilter}
                      onSelect={setDateFromFilter}
                      locale={ptBR}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <label className="text-sm font-medium">Data de Fim</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateToFilter ? (
                        format(dateToFilter, "dd/MM/yyyy")
                      ) : (
                        <span>Selecionar data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dateToFilter}
                      onSelect={setDateToFilter}
                      locale={ptBR}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <label className="text-sm font-medium">Evidências</label>
                <Select 
                  value={hasEvidenceFilter} 
                  onValueChange={setHasEvidenceFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrar por evidências" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="with">Com evidências</SelectItem>
                    <SelectItem value="without">Sem evidências</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium">Mensagens não lidas</label>
                <Select 
                  value={hasMessagesFilter} 
                  onValueChange={setHasMessagesFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrar por mensagens" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="with">Com mensagens</SelectItem>
                    <SelectItem value="without">Sem mensagens</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Código</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    Nenhuma denúncia encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                filteredReports.map(report => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">#{report.id}</TableCell>
                    <TableCell>{report.date}</TableCell>
                    <TableCell>{report.category}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClassName(report.status)}`}>
                        {report.status}
                      </span>
                    </TableCell>
                    <TableCell>{report.anonymous ? 'Anônimo' : 'Identificado'}</TableCell>
                    <TableCell className="font-mono text-xs">{report.trackingCode}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewReport(report.id)}
                        >
                          <Eye size={16} className="mr-1" />
                          <span>Ver</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="relative"
                        >
                          <MessageSquare size={16} className="mr-1" />
                          <span>Responder</span>
                          {report.unreadMessages > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                              {report.unreadMessages}
                            </span>
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportsList;
