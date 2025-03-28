
import React, { useState } from 'react';
import { useContent } from '@/context/content';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Trash2, Plus, ExternalLink, Link as LinkIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const NavigationEditor = () => {
  const { content, addMenuItem, removeMenuItem, updateMenuItem } = useContent();
  const { toast } = useToast();
  const [newItem, setNewItem] = useState({ label: '', url: '' });

  const handleAddItem = () => {
    if (!newItem.label || !newItem.url) {
      toast({
        variant: "destructive",
        title: "Campos obrigatórios",
        description: "Preencha o título e URL do item de menu.",
      });
      return;
    }

    addMenuItem('navigation', newItem);
    setNewItem({ label: '', url: '' });
    
    toast({
      title: "Item adicionado",
      description: `O item "${newItem.label}" foi adicionado ao menu.`,
    });
  };

  const handleRemoveItem = (id: string, label: string) => {
    removeMenuItem('navigation', id);
    
    toast({
      title: "Item removido",
      description: `O item "${label}" foi removido do menu.`,
    });
  };

  const handleUpdateItem = (id: string, field: 'label' | 'url', value: string) => {
    updateMenuItem('navigation', id, { [field]: value });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Gerir Menu de Navegação</CardTitle>
        <CardDescription>Adicione, edite ou remova itens do menu de navegação principal</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <Label htmlFor="new-item-label">Texto do Menu</Label>
              <Input
                id="new-item-label"
                value={newItem.label}
                onChange={(e) => setNewItem({ ...newItem, label: e.target.value })}
                placeholder="Ex: Recursos"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="new-item-url">URL do Link</Label>
              <Input
                id="new-item-url"
                value={newItem.url}
                onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
                placeholder="Ex: /recursos ou #recursos"
              />
            </div>
            <Button onClick={handleAddItem} className="w-full md:w-auto">
              <Plus className="mr-2 h-4 w-4" /> Adicionar Item
            </Button>
          </div>

          <div className="border rounded-md p-4">
            <h3 className="font-medium mb-4">Itens do Menu</h3>
            
            {content.navigation.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                Nenhum item de menu adicionado. Adicione o primeiro item acima.
              </p>
            ) : (
              <div className="space-y-3">
                {content.navigation.map((item, index) => (
                  <div 
                    key={item.id} 
                    className="flex flex-col md:flex-row items-center gap-3 p-3 border rounded-md bg-background"
                  >
                    <div className="flex-1 w-full">
                      <Label htmlFor={`item-${index}-label`} className="sr-only">Texto</Label>
                      <Input
                        id={`item-${index}-label`}
                        value={item.label}
                        onChange={(e) => handleUpdateItem(item.id, 'label', e.target.value)}
                        placeholder="Texto"
                      />
                    </div>
                    <div className="flex-1 w-full">
                      <Label htmlFor={`item-${index}-url`} className="sr-only">URL</Label>
                      <div className="flex items-center gap-2">
                        <LinkIcon className="text-muted-foreground h-4 w-4" />
                        <Input
                          id={`item-${index}-url`}
                          value={item.url}
                          onChange={(e) => handleUpdateItem(item.id, 'url', e.target.value)}
                          placeholder="URL"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-full md:w-auto">
                      <Button variant="outline" size="icon" asChild>
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="icon"
                        onClick={() => handleRemoveItem(item.id, item.label)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NavigationEditor;
