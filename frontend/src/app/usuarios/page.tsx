'use client';

import { useState, useEffect } from 'react';
import { Usuario } from '@/types';
import { UsuariosService } from '@/services/usuarios';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { UsuarioFormModal } from '@/components/usuarios/UsuarioFormModal';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Plus, Edit2, Trash2, Library } from 'lucide-react';

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [usuarioToEdit, setUsuarioToEdit] = useState<Usuario | null>(null);
  const [usuarioToDelete, setUsuarioToDelete] = useState<Usuario | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await UsuariosService.consultar();
      setUsuarios(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenCreate = () => {
    setUsuarioToEdit(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (usuario: Usuario) => {
    setUsuarioToEdit(usuario);
    setIsFormOpen(true);
  };

  const handleDelete = async () => {
    if (!usuarioToDelete) return;
    try {
      setIsDeleting(true);
      await UsuariosService.deletar(usuarioToDelete.usuarioId);
      await fetchData();
      setUsuarioToDelete(null);
    } catch (err) {
      console.error(err);
      alert('Não foi possível excluir o usuário. Pode haver empréstimos associados a ele.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Header title="Usuários">
        <Button onClick={handleOpenCreate}>
          <Plus className="w-4 h-4 mr-2" /> Novo Usuário
        </Button>
      </Header>

      <div className="p-8">
        <div className="bg-white rounded-lg shadow-sm border border-library-paper-dark overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500 animate-pulse">Carregando usuários...</div>
          ) : usuarios.length === 0 ? (
            <div className="p-12 text-center text-gray-500 flex flex-col items-center">
              <Library className="w-12 h-12 mb-4 opacity-50" />
              <p>Nenhum usuário cadastrado.</p>
              <Button variant="secondary" className="mt-4" onClick={handleOpenCreate}>Cadastrar Primeiro Usuário</Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-library-paper">
                  <tr className="text-library-wood-dark border-b border-gray-200">
                    <th className="px-6 py-4 font-semibold">ID</th>
                    <th className="px-6 py-4 font-semibold">Nome</th>
                    <th className="px-6 py-4 font-semibold">Email</th>
                    <th className="px-6 py-4 font-semibold">Telefone</th>
                    <th className="px-6 py-4 font-semibold text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {usuarios.map((usuario) => (
                    <tr key={usuario.usuarioId} className="hover:bg-library-paper/30 transition-colors">
                      <td className="px-6 py-4 text-gray-500">#{usuario.usuarioId}</td>
                      <td className="px-6 py-4 font-medium text-library-graphite">{usuario.usuarioNome}</td>
                      <td className="px-6 py-4 text-gray-600">{usuario.usuarioEmail}</td>
                      <td className="px-6 py-4 text-gray-600">{usuario.usuarioTelefone}</td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button 
                          onClick={() => handleOpenEdit(usuario)}
                          className="text-library-wood hover:text-library-wood-dark p-1 transition-colors"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => setUsuarioToDelete(usuario)}
                          className="text-red-500 hover:text-red-700 p-1 transition-colors"
                          title="Excluir"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <UsuarioFormModal 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onSuccess={fetchData} 
        usuarioToEdit={usuarioToEdit}
      />

      <ConfirmDialog 
        isOpen={!!usuarioToDelete}
        onClose={() => setUsuarioToDelete(null)}
        onConfirm={handleDelete}
        title="Excluir Usuário"
        message={`Tem certeza que deseja excluir o usuário "${usuarioToDelete?.usuarioNome}"? Esta ação não poderá ser desfeita.`}
        isLoading={isDeleting}
      />
    </>
  );
}
