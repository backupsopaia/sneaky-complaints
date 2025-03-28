
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, MessageSquare, Eye } from "lucide-react";
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

// Mock data for the reports
const mockReports = [
  {
    id: '1',
    date: '2023-05-15',
    category: 'Assédio Moral',
    status: 'Em Análise',
    anonymous: true,
    trackingCode: 'ABC-1234-XYZ'
  },
  {
    id: '2',
    date: '2023-05-10',
    category: 'Fraude',
    status: 'Investigação',
    anonymous: false,
    trackingCode: 'DEF-5678-UVW'
  },
  {
    id: '3',
    date: '2023-05-02',
    category: 'Conflito de Interesses',
    status: 'Concluído',
    anonymous: true,
    trackingCode: 'GHI-9012-RST'
  },
  {
    id: '4',
    date: '2023-06-12',
    category: 'Assédio Sexual',
    status: 'Pendente',
    anonymous: true,
    trackingCode: 'JKL-3456-MNO'
  },
  {
    id: '5',
    date: '2023-06-05',
    category: 'Corrupção',
    status: 'Em Análise',
    anonymous: false,
    trackingCode: 'PQR-7890-STU'
  }
];

interface ReportsListProps {
  className?: string;
}

const ReportsList = ({ className }: ReportsListProps) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const statusOptions = [
    { value: 'all', label: 'Todos os Status' },
    { value: 'Pendente', label: 'Pendente' },
    { value: 'Em Análise', label: 'Em Análise' },
    { value: 'Investigação', label: 'Investigação' },
    { value: 'Concluído', label: 'Concluído' },
  ];
  
  // Filter reports based on status and search term
  const filteredReports = mockReports.filter(report => {
    const matchesStatus = filter === 'all' || report.status === filter;
    const matchesSearch = 
      report.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.trackingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.id.includes(searchTerm);
    
    return matchesStatus && matchesSearch;
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
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <Select
                value={filter}
                onValueChange={setFilter}
              >
                <SelectTrigger className="w-full sm:w-40">
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
          </div>
        </div>
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
                        <Button variant="ghost" size="sm">
                          <MessageSquare size={16} className="mr-1" />
                          <span>Responder</span>
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
