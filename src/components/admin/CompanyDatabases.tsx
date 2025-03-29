import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { databaseService } from '@/services/databaseService';
import { Company } from '@/types/auth';

interface DatabaseInfo {
  name: string;
  exists: boolean;
  tables: string[];
  size: string;
  lastBackup?: string;
}

interface CompanyDatabasesProps {
  companies: Company[];
}

export const CompanyDatabases: React.FC<CompanyDatabasesProps> = ({ companies }) => {
  const [databases, setDatabases] = useState<Record<string, DatabaseInfo>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  useEffect(() => {
    loadDatabases();
  }, [companies]);

  const loadDatabases = async () => {
    for (const company of companies) {
      try {
        setLoading(prev => ({ ...prev, [company.id]: true }));
        const info = await databaseService.getDatabaseInfo(company);
        setDatabases(prev => ({ ...prev, [company.id]: info }));
      } catch (error) {
        console.error(`Erro ao carregar informações do banco para ${company.name}:`, error);
        toast({
          title: 'Erro',
          description: `Não foi possível carregar informações do banco de dados para ${company.name}`,
          variant: 'destructive'
        });
      } finally {
        setLoading(prev => ({ ...prev, [company.id]: false }));
      }
    }
  };

  const handleCreateDatabase = async (company: Company) => {
    try {
      setLoading(prev => ({ ...prev, [company.id]: true }));
      await databaseService.createCompanyDatabase(company);
      const info = await databaseService.getDatabaseInfo(company);
      setDatabases(prev => ({ ...prev, [company.id]: info }));
      toast({
        title: 'Sucesso',
        description: `Banco de dados criado com sucesso para ${company.name}`
      });
    } catch (error) {
      console.error(`Erro ao criar banco para ${company.name}:`, error);
      toast({
        title: 'Erro',
        description: `Não foi possível criar o banco de dados para ${company.name}`,
        variant: 'destructive'
      });
    } finally {
      setLoading(prev => ({ ...prev, [company.id]: false }));
    }
  };

  const handleBackup = async (company: Company) => {
    try {
      setLoading(prev => ({ ...prev, [company.id]: true }));
      await databaseService.backupDatabase(company);
      const info = await databaseService.getDatabaseInfo(company);
      setDatabases(prev => ({ ...prev, [company.id]: info }));
      toast({
        title: 'Sucesso',
        description: `Backup realizado com sucesso para ${company.name}`
      });
    } catch (error) {
      console.error(`Erro ao realizar backup para ${company.name}:`, error);
      toast({
        title: 'Erro',
        description: `Não foi possível realizar o backup para ${company.name}`,
        variant: 'destructive'
      });
    } finally {
      setLoading(prev => ({ ...prev, [company.id]: false }));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bancos de Dados das Empresas</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Empresa</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tamanho</TableHead>
              <TableHead>Último Backup</TableHead>
              <TableHead>Tabelas</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.map(company => {
              const dbInfo = databases[company.id];
              const isLoading = loading[company.id];

              return (
                <TableRow key={company.id}>
                  <TableCell>{company.name}</TableCell>
                  <TableCell>
                    {dbInfo?.exists ? (
                      <Badge variant="success">Ativo</Badge>
                    ) : (
                      <Badge variant="secondary">Não Criado</Badge>
                    )}
                  </TableCell>
                  <TableCell>{dbInfo?.size || '0 MB'}</TableCell>
                  <TableCell>
                    {dbInfo?.lastBackup
                      ? new Date(dbInfo.lastBackup).toLocaleDateString()
                      : 'Nunca'}
                  </TableCell>
                  <TableCell>{dbInfo?.tables.length || 0}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {!dbInfo?.exists ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCreateDatabase(company)}
                          disabled={isLoading}
                        >
                          Criar Banco
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleBackup(company)}
                          disabled={isLoading}
                        >
                          Backup
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
