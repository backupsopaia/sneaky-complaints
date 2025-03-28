
export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  description?: string;
  category?: string;
  lastModified?: string;
}

export interface EmailVariableDefinition {
  name: string;
  description: string;
  example?: string;
}

export interface EmailDesignSettings {
  fontFamily?: string;
  primaryColor?: string;
  backgroundColor?: string;
  headerLogoUrl?: string;
  footerText?: string;
}
