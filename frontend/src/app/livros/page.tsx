'use client';

import { useState, useEffect } from 'react';
import { Livro, Autor } from '@/types';
import { LivrosService } from '@/services/livros';
import { AutoresService } from '@/services/autores';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { LivroFormModal } from '@/components/livros/LivroFormModal';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Plus, Edit2, Trash2, BookX } from 'lucide-react';

export default function LivrosPage() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [autores, setAutores] = useState<Autor[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [livroToEdit, setLivroToEdit] = useState<Livro | null>(null);
  const [livroToDelete, setLivroToDelete] = useState<Livro | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [livrosData, autoresData] = await Promise.all([
        LivrosService.consultar(),
        AutoresService.consultar()
      ]);
      setLivros(livrosData);
      setAutores(autoresData);
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
    setLivroToEdit(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (livro: Livro) => {
    setLivroToEdit(livro);
    setIsFormOpen(true);
  };

  const handleDelete = async () => {
    if (!livroToDelete) return;
    try {
      setIsDeleting(true);
      await LivrosService.deletar(livroToDelete.livroId);
      await fetchData();
      setLivroToDelete(null);
    } catch (err) {
      console.error(err);
      alert('Não foi possível excluir o livro. Pode haver empréstimos associados.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Header title="Livros">
        <Button onClick={handleOpenCreate}>
          <Plus className="w-4 h-4 mr-2" /> Novo Livro
        </Button>
      </Header>

      <div className="p-8">
        <div className="bg-white rounded-lg shadow-sm border border-library-paper-dark overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500 animate-pulse">Carregando livros...</div>
          ) : livros.length === 0 ? (
            <div className="p-12 text-center text-gray-500 flex flex-col items-center">
              <BookX className="w-12 h-12 mb-4 opacity-50" />
              <p>Nenhum livro cadastrado.</p>
              <Button variant="secondary" className="mt-4" onClick={handleOpenCreate}>Cadastrar Primeiro Livro</Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-library-paper">
                  <tr className="text-library-wood-dark border-b border-gray-200">
                    <th className="px-6 py-4 font-semibold">ID</th>
                    <th className="px-6 py-4 font-semibold">Título</th>
                    <th className="px-6 py-4 font-semibold">Autor</th>
                    <th className="px-6 py-4 font-semibold">Ano</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {livros.map((livro) => (
                    <tr key={livro.livroId} className="hover:bg-library-paper/30 transition-colors">
                      <td className="px-6 py-4 text-gray-500">#{livro.livroId}</td>
                      <td className="px-6 py-4 font-medium text-library-graphite">{livro.livroTitulo}</td>
                      <td className="px-6 py-4 text-gray-600">
                        {livro.livroAutor ? livro.livroAutor.autorNome : 'Desconhecido'}
                      </td>
                      <td className="px-6 py-4 text-gray-500">{livro.livroAnoPublicacao}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          livro.livroDisponivel ? 'bg-library-olive/20 text-library-olive' : 'bg-red-100 text-red-700'
                        }`}>
                          {livro.livroDisponivel ? 'Disponível' : 'Indisponível'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button 
                          onClick={() => handleOpenEdit(livro)}
                          className="text-library-wood hover:text-library-wood-dark p-1 transition-colors"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => setLivroToDelete(livro)}
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

      <LivroFormModal 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onSuccess={fetchData} 
        livroToEdit={livroToEdit}
        autores={autores}
      />

      <ConfirmDialog 
        isOpen={!!livroToDelete}
        onClose={() => setLivroToDelete(null)}
        onConfirm={handleDelete}
        title="Excluir Livro"
        message={`Tem certeza que deseja excluir o livro "${livroToDelete?.livroTitulo}"? Esta ação não poderá ser desfeita.`}
        isLoading={isDeleting}
      />
    </>
  );
}
