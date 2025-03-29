import React from 'react';
import { Button } from "@/components/ui/button";

const UserManagement = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Gerenciamento de Usuários</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Nome</th>
              <th className="text-left py-2">Email</th>
              <th className="text-left py-2">Função</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">Usuário Exemplo</td>
              <td className="py-2">exemplo@email.com</td>
              <td className="py-2">Admin</td>
              <td className="py-2">
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  Ativo
                </span>
              </td>
              <td className="py-2">
                <Button variant="ghost" size="sm">Editar</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement; 