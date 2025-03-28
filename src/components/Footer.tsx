
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useContent } from '@/context/content/ContentContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { content } = useContent();
  const { companyDescription, copyright, socialLinks, menuGroups } = content.footer;
  
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">DenuncieAqui</span>
            </div>
            <p className="text-gray-600 mb-4">
              {companyDescription}
            </p>
            <div className="flex space-x-4">
              <a href={socialLinks.facebook} className="text-gray-400 hover:text-primary">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href={socialLinks.twitter} className="text-gray-400 hover:text-primary">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href={socialLinks.instagram} className="text-gray-400 hover:text-primary">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href={socialLinks.linkedin} className="text-gray-400 hover:text-primary">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Produto</h3>
            <ul className="space-y-2">
              {menuGroups.product.map((item) => (
                <li key={item.id}>
                  <Link to={item.url} className="text-gray-600 hover:text-primary">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Empresa</h3>
            <ul className="space-y-2">
              {menuGroups.company.map((item) => (
                <li key={item.id}>
                  <Link to={item.url} className="text-gray-600 hover:text-primary">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              {menuGroups.legal.map((item) => (
                <li key={item.id}>
                  <Link to={item.url} className="text-gray-600 hover:text-primary">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>{copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
