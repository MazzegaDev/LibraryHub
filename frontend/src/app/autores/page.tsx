'use client';

import { useState, useEffect } from 'react';
import { Autor } from '@/types';
import { AutoresService } from '@/services/autores';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { AutorFormModal } from '@/components/autores/AutorFormModal';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Plus, Edit2, Trash2, UsersRound } from 'lucide-react';

export default function AutoresPage() {
  const [autores, setAutores] = useState<Autor[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [autorToEdit, setAutorToEdit] = useState<Autor | null>(null);
  const [autorToDelete, setAutorToDelete] = useState<Autor | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await AutoresService.consultar();
      setAutores(data);
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
    setAutorToEdit(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (autor: Autor) => {
    setAutorToEdit(autor);
    setIsFormOpen(true);
  };

  const handleDelete = async () => {
    if (!autorToDelete) return;
    try {
      setIsDeleting(true);
      await AutoresService.deletar(autorToDelete.autorId);
      await fetchData();
      setAutorToDelete(null);
    } catch (err) {
      console.error(err);
      alert('Não foi possível excluir o autor. Pode haver livros associados a ele.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Header title="Autores">
        <Button onClick={handleOpenCreate}>
          <Plus className="w-4 h-4 mr-2" /> Novo Autor
        </Button>
      </Header>

      <div className="p-8">
        <div className="bg-white rounded-lg shadow-sm border border-library-paper-dark overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500 animate-pulse">Carregando autores...</div>
          ) : autores.length === 0 ? (
            <div className="p-12 text-center text-gray-500 flex flex-col items-center">
              <UsersRound className="w-12 h-12 mb-4 opacity-50" />
              <p>Nenhum autor cadastrado.</p>
              <Button variant="secondary" className="mt-4" onClick={handleOpenCreate}>Cadastrar Primeiro Autor</Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-library-paper">
                  <tr className="text-library-wood-dark border-b border-gray-200">
                    <th className="px-6 py-4 font-semibold">ID</th>
                    <th className="px-6 py-4 font-semibold">Nome</th>
                    <th className="px-6 py-4 font-semibold">Nacionalidade</th>
                    <th className="px-6 py-4 font-semibold text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {autores.map((autor) => (
                    <tr key={autor.autorId} className="hover:bg-library-paper/30 transition-colors">
                      <td className="px-6 py-4 text-gray-500">#{autor.autorId}</td>
                      <td className="px-6 py-4 font-medium text-library-graphite">{autor.autorNome}</td>
                      <td className="px-6 py-4 text-gray-600">{autor.autorNacionalidade}</td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button 
                          onClick={() => handleOpenEdit(autor)}
                          className="text-library-wood hover:text-library-wood-dark p-1 transition-colors"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => setAutorToDelete(autor)}
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

      <AutorFormModal 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onSuccess={fetchData} 
        autorToEdit={autorToEdit}
      />

      <ConfirmDialog 
        isOpen={!!autorToDelete}
        onClose={() => setAutorToDelete(null)}
        onConfirm={handleDelete}
        title="Excluir Autor"
        message={`Tem certeza que deseja excluir o autor "${autorToDelete?.autorNome}"? Esta ação não poderá ser desfeita.`}
        isLoading={isDeleting}
      />
    </>
  );
}
