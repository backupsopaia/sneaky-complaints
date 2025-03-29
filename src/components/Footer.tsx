import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useContent } from '@/context/content';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { content } = useContent();
  const { companyDescription, copyright, socialLinks, menuGroups } = content.footer;
  
  return (
    <footer className="bg-background border-t border-border">
      <div className="container px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold">DenuncieAqui</span>
            </div>
            <p className="text-muted-foreground text-sm mb-3">
              {companyDescription}
            </p>
            <div className="flex space-x-3">
              <a href={socialLinks.facebook} className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={18} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href={socialLinks.twitter} className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={18} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href={socialLinks.instagram} className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={18} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href={socialLinks.linkedin} className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={18} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-base mb-3">Produto</h3>
            <ul className="space-y-1.5">
              {menuGroups.product.map((item) => (
                <li key={item.id}>
                  <Link to={item.url} className="text-muted-foreground hover:text-primary text-sm transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-base mb-3">Empresa</h3>
            <ul className="space-y-1.5">
              {menuGroups.company.map((item) => (
                <li key={item.id}>
                  <Link to={item.url} className="text-muted-foreground hover:text-primary text-sm transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-base mb-3">Legal</h3>
            <ul className="space-y-1.5">
              {menuGroups.legal.map((item) => (
                <li key={item.id}>
                  <Link to={item.url} className="text-muted-foreground hover:text-primary text-sm transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-6 pt-6 text-center text-muted-foreground text-sm">
          <p>{copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
