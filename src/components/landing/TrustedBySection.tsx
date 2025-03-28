
import React from 'react';

const TrustedBySection = () => {
  return (
    <section className="py-8 bg-white border-t border-b border-gray-100">
      <div className="container px-4">
        <p className="text-center text-sm text-gray-500 mb-6">UTILIZADO POR EMPRESAS DE TODOS OS PORTES</p>
        <div className="flex flex-wrap justify-center gap-8 opacity-70">
          <div className="h-8 w-24 bg-gray-300 rounded"></div>
          <div className="h-8 w-32 bg-gray-300 rounded"></div>
          <div className="h-8 w-28 bg-gray-300 rounded"></div>
          <div className="h-8 w-20 bg-gray-300 rounded"></div>
          <div className="h-8 w-24 bg-gray-300 rounded"></div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
