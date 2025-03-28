
import React, { useState, useEffect } from 'react';
import { Bold, Italic, List, AlignLeft, AlignCenter, AlignRight, Link } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface RichTextEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ initialValue, onChange }) => {
  const [value, setValue] = useState(initialValue);
  const [view, setView] = useState<'edit' | 'preview'>('edit');

  useEffect(() => {
    onChange(value);
  }, [value, onChange]);

  const applyFormat = (format: string) => {
    // This is a very simplified approach - in a real app you'd use a library like Quill, TinyMCE, etc.
    let newValue = value;
    
    switch (format) {
      case 'bold':
        newValue += '<strong>texto em negrito</strong>';
        break;
      case 'italic':
        newValue += '<em>texto em itálico</em>';
        break;
      case 'list':
        newValue += '\n<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n</ul>';
        break;
      case 'align-left':
        newValue += '<div style="text-align: left;">Texto alinhado à esquerda</div>';
        break;
      case 'align-center':
        newValue += '<div style="text-align: center;">Texto centralizado</div>';
        break;
      case 'align-right':
        newValue += '<div style="text-align: right;">Texto alinhado à direita</div>';
        break;
      case 'link':
        newValue += '<a href="https://example.com">Link de exemplo</a>';
        break;
    }
    
    setValue(newValue);
  };

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="bg-gray-50 border-b p-2 flex gap-1 flex-wrap">
        <Tabs value={view} onValueChange={(v) => setView(v as 'edit' | 'preview')} className="w-full">
          <div className="flex justify-between items-center">
            <div className="flex gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => applyFormat('bold')}
                type="button"
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => applyFormat('italic')}
                type="button"
              >
                <Italic className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => applyFormat('list')}
                type="button"
              >
                <List className="h-4 w-4" />
              </Button>
              <div className="h-6 w-px bg-gray-300 mx-1" />
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => applyFormat('align-left')}
                type="button"
              >
                <AlignLeft className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => applyFormat('align-center')}
                type="button"
              >
                <AlignCenter className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => applyFormat('align-right')}
                type="button"
              >
                <AlignRight className="h-4 w-4" />
              </Button>
              <div className="h-6 w-px bg-gray-300 mx-1" />
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => applyFormat('link')}
                type="button"
              >
                <Link className="h-4 w-4" />
              </Button>
            </div>
            
            <TabsList>
              <TabsTrigger value="edit">Editar</TabsTrigger>
              <TabsTrigger value="preview">Visualizar</TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
      </div>
      
      <TabsContent value="edit" className="m-0">
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border-0 min-h-[200px] focus-visible:ring-0 rounded-none"
        />
      </TabsContent>
      
      <TabsContent value="preview" className="m-0 p-4 min-h-[200px]">
        <div dangerouslySetInnerHTML={{ __html: value }} />
      </TabsContent>
    </div>
  );
};

export default RichTextEditor;
