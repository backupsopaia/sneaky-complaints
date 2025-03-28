
import React, { useState, useEffect } from 'react';
import { 
  Bold, Italic, List, AlignLeft, AlignCenter, AlignRight, Link, 
  Image, FileText, Variable, ArrowUp, ArrowDown
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface RichTextEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
  showVariablesButton?: boolean;
  availableVariables?: {name: string, description: string}[];
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ 
  initialValue, 
  onChange,
  showVariablesButton = false,
  availableVariables = []
}) => {
  const [value, setValue] = useState(initialValue);
  const [view, setView] = useState<'edit' | 'preview'>('edit');
  const [linkUrl, setLinkUrl] = useState('https://');
  const [linkText, setLinkText] = useState('Link text');
  const [showLinkPopover, setShowLinkPopover] = useState(false);
  const [imageUrl, setImageUrl] = useState('https://');
  const [imageAlt, setImageAlt] = useState('Image description');
  const [showImagePopover, setShowImagePopover] = useState(false);

  useEffect(() => {
    onChange(value);
  }, [value, onChange]);

  const insertAtCursor = (textToInsert: string) => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const newText = text.substring(0, start) + textToInsert + text.substring(end);
    
    setValue(newText);
    
    // Set cursor position after inserted text
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + textToInsert.length, start + textToInsert.length);
    }, 0);
  };

  const applyFormat = (format: string, value?: string) => {
    let textToInsert = '';
    
    switch (format) {
      case 'bold':
        textToInsert = '<strong>texto em negrito</strong>';
        break;
      case 'italic':
        textToInsert = '<em>texto em itálico</em>';
        break;
      case 'list':
        textToInsert = '\n<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n</ul>';
        break;
      case 'align-left':
        textToInsert = '<div style="text-align: left;">Texto alinhado à esquerda</div>';
        break;
      case 'align-center':
        textToInsert = '<div style="text-align: center;">Texto centralizado</div>';
        break;
      case 'align-right':
        textToInsert = '<div style="text-align: right;">Texto alinhado à direita</div>';
        break;
      case 'link':
        if (value) {
          textToInsert = value;
        } else {
          textToInsert = `<a href="${linkUrl}" style="color: #0066cc; text-decoration: underline;">${linkText}</a>`;
          setShowLinkPopover(false);
        }
        break;
      case 'image':
        textToInsert = `<img src="${imageUrl}" alt="${imageAlt}" style="max-width: 100%; height: auto; margin: 10px 0;" />`;
        setShowImagePopover(false);
        break;
      case 'button':
        textToInsert = `<a href="URL_AQUI" style="display: inline-block; padding: 10px 20px; background-color: #0066cc; color: white; text-decoration: none; border-radius: 4px; font-weight: bold; margin: 10px 0;">Texto do Botão</a>`;
        break;
      case 'divider':
        textToInsert = '<hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />';
        break;
      case 'spacing':
        textToInsert = '<div style="height: 20px;"></div>';
        break;
      case 'variable':
        if (value) {
          textToInsert = `{{${value}}}`;
        }
        break;
    }
    
    insertAtCursor(textToInsert);
  };

  const insertTemplate = (template: string) => {
    switch (template) {
      case 'basic':
        setValue(`<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333333;">
  <h2 style="color: #0066cc;">Título do Email</h2>
  <p>Olá {{name}},</p>
  <p>Este é um parágrafo de exemplo para o seu template de email.</p>
  <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
    <p style="margin: 0;"><strong>Informação Importante:</strong> Texto destacado aqui.</p>
  </div>
  <p>Atenciosamente,<br>Sua Empresa</p>
</div>`);
        break;
      case 'notification':
        setValue(`<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333333;">
  <h2 style="color: #0066cc;">Notificação Importante</h2>
  <p>Olá {{name}},</p>
  <p>Você recebeu uma nova notificação sobre sua denúncia.</p>
  <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
    <p style="margin: 0;"><strong>Código de rastreamento:</strong> {{trackingCode}}</p>
    <p style="margin: 10px 0 0;"><strong>Status:</strong> {{newStatus}}</p>
    <p style="margin: 10px 0 0;"><strong>Comentários:</strong> {{comments}}</p>
  </div>
  <p>Para mais informações, acesse sua conta.</p>
  <div style="text-align: center; margin: 25px 0;">
    <a href="{{loginUrl}}" style="display: inline-block; padding: 10px 25px; background-color: #0066cc; color: white; text-decoration: none; border-radius: 4px; font-weight: bold;">Acessar Conta</a>
  </div>
  <p>Atenciosamente,<br>Equipe de Compliance</p>
</div>`);
        break;
      case 'welcome':
        setValue(`<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333333;">
  <h2 style="color: #0066cc;">Bem-vindo ao Sistema</h2>
  <p>Olá {{name}},</p>
  <p>Bem-vindo ao nosso Canal de Denúncias. A sua conta foi criada com sucesso.</p>
  <p>O Canal de Denúncias é uma ferramenta segura e confidencial para reportar comportamentos que violem o nosso Código de Ética e Conduta.</p>
  <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
    <p style="margin: 0;"><strong>Acesse sua conta:</strong> <a href="{{loginUrl}}" style="color: #0066cc;">Clique aqui</a></p>
  </div>
  <p>Em caso de dúvidas, entre em contato com o nosso suporte.</p>
  <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
  <p style="font-size: 12px; color: #666;">Este email foi enviado automaticamente, por favor não responda.</p>
</div>`);
        break;
    }
  };

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="bg-gray-50 border-b p-2 flex gap-1 flex-wrap">
        <Tabs value={view} onValueChange={(v) => setView(v as 'edit' | 'preview')} className="w-full">
          <div className="flex justify-between items-center">
            <div className="flex gap-1 flex-wrap">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => applyFormat('bold')}
                type="button"
                title="Negrito"
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => applyFormat('italic')}
                type="button"
                title="Itálico"
              >
                <Italic className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => applyFormat('list')}
                type="button"
                title="Lista"
              >
                <List className="h-4 w-4" />
              </Button>
              <div className="h-6 w-px bg-gray-300 mx-1" />
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => applyFormat('align-left')}
                type="button"
                title="Alinhar à esquerda"
              >
                <AlignLeft className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => applyFormat('align-center')}
                type="button"
                title="Centralizar"
              >
                <AlignCenter className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => applyFormat('align-right')}
                type="button"
                title="Alinhar à direita"
              >
                <AlignRight className="h-4 w-4" />
              </Button>
              <div className="h-6 w-px bg-gray-300 mx-1" />
              
              <Popover open={showLinkPopover} onOpenChange={setShowLinkPopover}>
                <PopoverTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    type="button"
                    title="Inserir link"
                  >
                    <Link className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="link-text">Texto do Link</Label>
                      <Input 
                        id="link-text" 
                        value={linkText} 
                        onChange={(e) => setLinkText(e.target.value)} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="link-url">URL do Link</Label>
                      <Input 
                        id="link-url" 
                        value={linkUrl} 
                        onChange={(e) => setLinkUrl(e.target.value)} 
                      />
                    </div>
                    <Button type="button" onClick={() => applyFormat('link')}>
                      Inserir Link
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
              
              <Popover open={showImagePopover} onOpenChange={setShowImagePopover}>
                <PopoverTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    type="button"
                    title="Inserir imagem"
                  >
                    <Image className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="image-url">URL da Imagem</Label>
                      <Input 
                        id="image-url" 
                        value={imageUrl} 
                        onChange={(e) => setImageUrl(e.target.value)} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="image-alt">Texto Alternativo</Label>
                      <Input 
                        id="image-alt" 
                        value={imageAlt} 
                        onChange={(e) => setImageAlt(e.target.value)} 
                      />
                    </div>
                    <Button type="button" onClick={() => applyFormat('image')}>
                      Inserir Imagem
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
              
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => applyFormat('button')}
                type="button"
                title="Inserir botão"
              >
                <FileText className="h-4 w-4" />
              </Button>
              
              <div className="h-6 w-px bg-gray-300 mx-1" />
              
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => applyFormat('divider')}
                type="button"
                title="Inserir linha divisória"
              >
                <ArrowUp className="h-4 w-4 rotate-90" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => applyFormat('spacing')}
                type="button"
                title="Adicionar espaçamento"
              >
                <ArrowDown className="h-4 w-4" />
              </Button>
              
              {showVariablesButton && availableVariables.length > 0 && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      type="button"
                      title="Inserir variável"
                    >
                      <Variable className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Variáveis Disponíveis</h4>
                      <div className="max-h-[200px] overflow-y-auto">
                        {availableVariables.map((variable) => (
                          <Button 
                            key={variable.name} 
                            variant="ghost" 
                            className="w-full justify-start text-sm"
                            onClick={() => applyFormat('variable', variable.name)}
                          >
                            <code className="mr-2">{`{{${variable.name}}}`}</code>
                            <span className="text-muted-foreground">{variable.description}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>
            
            <div className="flex items-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="mr-2 text-xs"
                  >
                    Templates
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56">
                  <div className="space-y-2">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start"
                      onClick={() => insertTemplate('basic')}
                    >
                      Básico
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start"
                      onClick={() => insertTemplate('notification')}
                    >
                      Notificação
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start"
                      onClick={() => insertTemplate('welcome')}
                    >
                      Boas-vindas
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
              
              <TabsList>
                <TabsTrigger value="edit">Editar</TabsTrigger>
                <TabsTrigger value="preview">Visualizar</TabsTrigger>
              </TabsList>
            </div>
          </div>
        </Tabs>
      </div>
      
      <TabsContent value="edit" className="m-0">
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border-0 min-h-[300px] focus-visible:ring-0 rounded-none font-mono text-sm"
        />
      </TabsContent>
      
      <TabsContent value="preview" className="m-0 p-4 min-h-[300px] border-t">
        <div className="bg-white rounded p-4 shadow-sm max-w-2xl mx-auto">
          <div dangerouslySetInnerHTML={{ __html: value }} />
        </div>
      </TabsContent>
    </div>
  );
};

export default RichTextEditor;
