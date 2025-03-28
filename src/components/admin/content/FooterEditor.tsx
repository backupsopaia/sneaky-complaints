
import React, { useState } from 'react';
import { useContent } from '@/context/content/ContentContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from '@/components/ui/separator';
import { Trash2, Plus, ExternalLink, Link as LinkIcon, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FooterEditor = () => {
  const { content, updateFooterText, updateSocialLink, addMenuItem, removeMenuItem, updateMenuItem } = useContent();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("text");
  const [newItem, setNewItem] = useState({ label: '', url: '', section: 'product' });

  const handleAddItem = () => {
    if (!newItem.label || !newItem.url) {
      toast({
        variant: "destructive",
        title: "Campos obrigatórios",
        description: "Preencha o título e URL do item de menu.",
      });
      return;
    }

    addMenuItem(newItem.section as 'product' | 'company' | 'legal', { 
      label: newItem.label, 
      url: newItem.url 
    });
    
    setNewItem({ label: '', url: '', section: newItem.section });
    
    toast({
      title: "Item adicionado",
      description: `O item "${newItem.label}" foi adicionado à seção "${newItem.section}".`,
    });
  };

  const handleRemoveItem = (section: 'product' | 'company' | 'legal', id: string, label: string) => {
    removeMenuItem(section, id);
    
    toast({
      title: "Item removido",
      description: `O item "${label}" foi removido da seção.`,
    });
  };

  const handleUpdateItem = (section: 'product' | 'company' | 'legal', id: string, field: 'label' | 'url', value: string) => {
    updateMenuItem(section, id, { [field]: value });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Gerenciar Rodapé</CardTitle>
        <CardDescription>Configure textos, links e menu do rodapé do site</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="text" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="text">Textos</TabsTrigger>
            <TabsTrigger value="social">Redes Sociais</TabsTrigger>
            <TabsTrigger value="menu">Menus</TabsTrigger>
          </TabsList>

          <TabsContent value="text" className="space-y-4">
            <div>
              <Label htmlFor="company-description">Descrição da Empresa</Label>
              <Textarea
                id="company-description"
                value={content.footer.companyDescription}
                onChange={(e) => updateFooterText('companyDescription', e.target.value)}
                placeholder="Descrição curta da empresa"
                className="min-h-[80px]"
              />
            </div>
            <div>
              <Label htmlFor="copyright">Texto de Copyright</Label>
              <Input
                id="copyright"
                value={content.footer.copyright}
                onChange={(e) => updateFooterText('copyright', e.target.value)}
                placeholder="© 2025 Nome da Empresa. Todos os direitos reservados."
              />
            </div>
          </TabsContent>

          <TabsContent value="social" className="space-y-4">
            <div className="grid gap-4">
              <div className="flex items-center gap-3">
                <Facebook className="h-5 w-5 text-blue-600" />
                <div className="flex-1">
                  <Label htmlFor="facebook-url">Facebook</Label>
                  <Input
                    id="facebook-url"
                    value={content.footer.socialLinks.facebook}
                    onChange={(e) => updateSocialLink('facebook', e.target.value)}
                    placeholder="https://facebook.com/sua-empresa"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Twitter className="h-5 w-5 text-blue-400" />
                <div className="flex-1">
                  <Label htmlFor="twitter-url">Twitter</Label>
                  <Input
                    id="twitter-url"
                    value={content.footer.socialLinks.twitter}
                    onChange={(e) => updateSocialLink('twitter', e.target.value)}
                    placeholder="https://twitter.com/sua-empresa"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Instagram className="h-5 w-5 text-pink-600" />
                <div className="flex-1">
                  <Label htmlFor="instagram-url">Instagram</Label>
                  <Input
                    id="instagram-url"
                    value={content.footer.socialLinks.instagram}
                    onChange={(e) => updateSocialLink('instagram', e.target.value)}
                    placeholder="https://instagram.com/sua-empresa"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Linkedin className="h-5 w-5 text-blue-700" />
                <div className="flex-1">
                  <Label htmlFor="linkedin-url">LinkedIn</Label>
                  <Input
                    id="linkedin-url"
                    value={content.footer.socialLinks.linkedin}
                    onChange={(e) => updateSocialLink('linkedin', e.target.value)}
                    placeholder="https://linkedin.com/company/sua-empresa"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="menu" className="space-y-6">
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="w-full md:w-auto">
                  <Label htmlFor="menu-section">Seção</Label>
                  <select
                    id="menu-section"
                    value={newItem.section}
                    onChange={(e) => setNewItem({ ...newItem, section: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="product">Produto</option>
                    <option value="company">Empresa</option>
                    <option value="legal">Legal</option>
                  </select>
                </div>
                <div className="flex-1">
                  <Label htmlFor="new-footer-item-label">Texto do Menu</Label>
                  <Input
                    id="new-footer-item-label"
                    value={newItem.label}
                    onChange={(e) => setNewItem({ ...newItem, label: e.target.value })}
                    placeholder="Ex: Termos de Serviço"
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="new-footer-item-url">URL do Link</Label>
                  <Input
                    id="new-footer-item-url"
                    value={newItem.url}
                    onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
                    placeholder="Ex: /termos ou #termos"
                  />
                </div>
                <Button onClick={handleAddItem} className="w-full md:w-auto">
                  <Plus className="mr-2 h-4 w-4" /> Adicionar Item
                </Button>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Produto</h3>
                  {content.footer.menuGroups.product.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Nenhum item nesta seção</p>
                  ) : (
                    <div className="space-y-2">
                      {content.footer.menuGroups.product.map((item) => (
                        <div 
                          key={item.id} 
                          className="flex flex-col md:flex-row items-center gap-3 p-3 border rounded-md bg-background"
                        >
                          <div className="flex-1 w-full">
                            <Input
                              value={item.label}
                              onChange={(e) => handleUpdateItem('product', item.id, 'label', e.target.value)}
                              placeholder="Texto"
                            />
                          </div>
                          <div className="flex-1 w-full">
                            <div className="flex items-center gap-2">
                              <LinkIcon className="text-muted-foreground h-4 w-4" />
                              <Input
                                value={item.url}
                                onChange={(e) => handleUpdateItem('product', item.id, 'url', e.target.value)}
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
                              onClick={() => handleRemoveItem('product', item.id, item.label)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-semibold">Empresa</h3>
                  {content.footer.menuGroups.company.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Nenhum item nesta seção</p>
                  ) : (
                    <div className="space-y-2">
                      {content.footer.menuGroups.company.map((item) => (
                        <div 
                          key={item.id} 
                          className="flex flex-col md:flex-row items-center gap-3 p-3 border rounded-md bg-background"
                        >
                          <div className="flex-1 w-full">
                            <Input
                              value={item.label}
                              onChange={(e) => handleUpdateItem('company', item.id, 'label', e.target.value)}
                              placeholder="Texto"
                            />
                          </div>
                          <div className="flex-1 w-full">
                            <div className="flex items-center gap-2">
                              <LinkIcon className="text-muted-foreground h-4 w-4" />
                              <Input
                                value={item.url}
                                onChange={(e) => handleUpdateItem('company', item.id, 'url', e.target.value)}
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
                              onClick={() => handleRemoveItem('company', item.id, item.label)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-semibold">Legal</h3>
                  {content.footer.menuGroups.legal.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Nenhum item nesta seção</p>
                  ) : (
                    <div className="space-y-2">
                      {content.footer.menuGroups.legal.map((item) => (
                        <div 
                          key={item.id} 
                          className="flex flex-col md:flex-row items-center gap-3 p-3 border rounded-md bg-background"
                        >
                          <div className="flex-1 w-full">
                            <Input
                              value={item.label}
                              onChange={(e) => handleUpdateItem('legal', item.id, 'label', e.target.value)}
                              placeholder="Texto"
                            />
                          </div>
                          <div className="flex-1 w-full">
                            <div className="flex items-center gap-2">
                              <LinkIcon className="text-muted-foreground h-4 w-4" />
                              <Input
                                value={item.url}
                                onChange={(e) => handleUpdateItem('legal', item.id, 'url', e.target.value)}
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
                              onClick={() => handleRemoveItem('legal', item.id, item.label)}
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
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FooterEditor;
