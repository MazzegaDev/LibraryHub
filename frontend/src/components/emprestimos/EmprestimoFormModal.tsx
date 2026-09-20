'use client';

import { useState } from 'react';
import { EmprestimoDTO, Livro, Usuario } from '@/types';
import { EmprestimosService } from '@/services/emprestimos';
import { Modal } from '../ui/Modal';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { toast } from 'react-hot-toast';

interface EmprestimoFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  livros: Livro[];
  usuarios: Usuario[];
}

export function EmprestimoFormModal({ isOpen, onClose, onSuccess, livros, usuarios }: EmprestimoFormModalProps) {
  const [formData, setFormData] = useState<EmprestimoDTO>({
    empUsuario: 0,
    empLivro: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.empUsuario || formData.empLivro.length === 0) {
      toast.error('Selecione o usuário e ao menos um livro.');
      return;
    }

    try {
      setIsLoading(true);
      
      const payload: EmprestimoDTO = {
        empUsuario: Number(formData.empUsuario),
        empLivro: formData.empLivro
      };

      await EmprestimosService.solicitar(payload);
      toast.success('Empréstimo solicitado com sucesso!');
      
      onSuccess();
      onClose();
      // Reset form
      setFormData({ empUsuario: 0, empLivro: [] });
    } catch (err: any) {
      toast.error(err.message || 'Ocorreu um erro ao solicitar o empréstimo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookToggle = (bookId: number) => {
    setFormData(prev => {
      const isSelected = prev.empLivro.includes(bookId);
      if (isSelected) {
        return { ...prev, empLivro: prev.empLivro.filter(id => id !== bookId) };
      } else {
        return { ...prev, empLivro: [...prev.empLivro, bookId] };
      }
    });
  };

  const availableBooks = livros.filter(l => l.livroDisponivel);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Novo Empréstimo">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-1">
        
        <Select 
          label="Usuário" 
          value={formData.empUsuario || ''}
          onChange={e => setFormData({...formData, empUsuario: Number(e.target.value)})}
          required
          options={usuarios.map(u => ({ value: u.usuarioId, label: u.usuarioNome }))}
        />

        <div className="flex flex-col gap-1 mb-4">
          <label className="text-sm font-medium text-gray-700">Livros</label>
          <div className="border border-gray-300 rounded-md max-h-48 overflow-y-auto bg-white p-2 flex flex-col gap-2">
            {availableBooks.length === 0 ? (
              <span className="text-sm text-gray-500 italic p-2">Nenhum livro disponível.</span>
            ) : (
              availableBooks.map(l => (
                <label key={l.livroId} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-50 p-1 rounded">
                  <input 
                    type="checkbox" 
                    checked={formData.empLivro.includes(l.livroId)}
                    onChange={() => handleBookToggle(l.livroId)}
                    className="rounded text-library-wood focus:ring-library-wood"
                  />
                  <span>{l.livroTitulo}</span>
                </label>
              ))
            )}
          </div>
        </div>
        
        <div className="flex justify-end gap-3 mt-4">
          <Button type="button" variant="ghost" onClick={onClose} disabled={isLoading}>Cancelar</Button>
          <Button type="submit" isLoading={isLoading}>Salvar</Button>
        </div>
      </form>
    </Modal>
  );
}
