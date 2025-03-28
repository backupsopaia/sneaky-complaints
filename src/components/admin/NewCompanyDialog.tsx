
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface NewCompanyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newCompany: {
    name: string;
    domain: string;
    plan: string;
    settings: {
      reportCategories: string[];
      dataRetentionPeriod: number;
      requiresAnonymity: boolean;
    }
  };
  setNewCompany: React.Dispatch<React.SetStateAction<{
    name: string;
    domain: string;
    plan: string;
    settings: {
      reportCategories: string[];
      dataRetentionPeriod: number;
      requiresAnonymity: boolean;
    }
  }>>;
  handleCreateCompany: () => Promise<void>;
}

const NewCompanyDialog = ({
  open,
  onOpenChange,
  newCompany,
  setNewCompany,
  handleCreateCompany
}: NewCompanyDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md corporate-card border-0">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-primary" />
            Nova Empresa
          </DialogTitle>
          <DialogDescription>
            Cadastre uma nova empresa na plataforma.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">Nome da Empresa</Label>
            <Input 
              id="companyName" 
              value={newCompany.name}
              onChange={(e) => setNewCompany({...newCompany, name: e.target.value})}
              placeholder="Ex: Empresa XYZ"
              className="transition-all focus:ring-2 focus:ring-primary/20"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="companyDomain">Subdomínio</Label>
            <div className="flex items-center">
              <Input 
                id="companyDomain" 
                value={newCompany.domain}
                onChange={(e) => setNewCompany({...newCompany, domain: e.target.value})}
                placeholder="Ex: minhaempresa"
                className="rounded-r-none transition-all focus:ring-2 focus:ring-primary/20"
              />
              <div className="bg-gray-100 dark:bg-gray-800 border border-l-0 border-input px-3 py-2 text-sm text-gray-500 rounded-r-md">
                .denuncieaqui.com
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="companyPlan">Plano</Label>
            <Select 
              value={newCompany.plan} 
              onValueChange={(value) => setNewCompany({...newCompany, plan: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um plano" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="free">Gratuito</SelectItem>
                <SelectItem value="pro">Profissional</SelectItem>
                <SelectItem value="enterprise">Empresarial</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Configurações de Privacidade</Label>
            <div className="flex items-center space-x-2">
              <Switch 
                id="requireAnonymity"
                checked={newCompany.settings.requiresAnonymity}
                onCheckedChange={(checked) => 
                  setNewCompany({
                    ...newCompany, 
                    settings: {...newCompany.settings, requiresAnonymity: checked}
                  })
                }
              />
              <Label htmlFor="requireAnonymity">Permitir denúncias anônimas</Label>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="retentionPeriod">Período de Retenção de Dados (dias)</Label>
            <Input 
              id="retentionPeriod" 
              type="number"
              value={newCompany.settings.dataRetentionPeriod}
              onChange={(e) => setNewCompany({
                ...newCompany, 
                settings: {
                  ...newCompany.settings, 
                  dataRetentionPeriod: parseInt(e.target.value) || 365
                }
              })}
              className="transition-all focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleCreateCompany} className="corporate-gradient text-white hover-lift">
            Criar Empresa
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewCompanyDialog;
