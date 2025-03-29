import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Company {
  name: string;
  domain: string;
  plan: string;
  settings: {
    reportCategories: string[];
    dataRetentionPeriod: number;
    requiresAnonymity: boolean;
  };
}

interface NewCompanyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  handleCreateCompany: (data: Company) => Promise<void>;
  newCompany: Company;
  setNewCompany: (company: Company) => void;
}

const NewCompanyDialog: React.FC<NewCompanyDialogProps> = ({
  open,
  onOpenChange,
  handleCreateCompany,
  newCompany,
  setNewCompany
}) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleCreateCompany(newCompany);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova Empresa</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome da Empresa</Label>
            <Input
              id="name"
              value={newCompany.name}
              onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="domain">Domínio</Label>
            <Input
              id="domain"
              value={newCompany.domain}
              onChange={(e) => setNewCompany({ ...newCompany, domain: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="plan">Plano</Label>
            <Select
              value={newCompany.plan}
              onValueChange={(value) => setNewCompany({ ...newCompany, plan: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um plano" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="free">Gratuito</SelectItem>
                <SelectItem value="pro">Pro</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Criar Empresa</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewCompanyDialog;
