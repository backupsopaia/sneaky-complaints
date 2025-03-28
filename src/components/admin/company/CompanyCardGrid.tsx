
import React from 'react';
import CompanyCard from './CompanyCard';

interface CompanyCardGridProps {
  companies: any[];
  handleToggleCompanyStatus: (id: string, currentStatus: boolean) => Promise<void>;
}

const CompanyCardGrid = ({ companies, handleToggleCompanyStatus }: CompanyCardGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {companies.map((company, index) => (
        <CompanyCard
          key={company.id}
          company={company}
          index={index}
          onToggleStatus={handleToggleCompanyStatus}
        />
      ))}
    </div>
  );
};

export default CompanyCardGrid;
