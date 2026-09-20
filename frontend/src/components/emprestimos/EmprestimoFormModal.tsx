'use client';

import { useState } from 'react';
import { EmprestimoDTO, Livro, Usuario } from '@/types';
import { EmprestimosService } from '@/services/emprestimos';
import { Modal } from '../ui/Modal';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

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
    empLivro: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.empUsuario || !formData.empLivro) {
      setError('Selecione o usuário e o livro.');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      
      const payload: EmprestimoDTO = {
        empUsuario: Number(formData.empUsuario),
        empLivro: Number(formData.empLivro)
      };

      await EmprestimosService.solicitar(payload);
      
      onSuccess();
      onClose();
      // Reset form
      setFormData({ empUsuario: 0, empLivro: 0 });
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao solicitar o empréstimo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Novo Empréstimo">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-1">
        {error && <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm mb-2">{error}</div>}
        
        <Select 
          label="Usuário" 
          value={formData.empUsuario || ''}
          onChange={e => setFormData({...formData, empUsuario: Number(e.target.value)})}
          required
          options={usuarios.map(u => ({ value: u.usuarioId, label: u.usuarioNome }))}
        />

        <Select 
          label="Livro" 
          value={formData.empLivro || ''}
          onChange={e => setFormData({...formData, empLivro: Number(e.target.value)})}
          required
          options={livros.filter(l => l.livroDisponivel).map(l => ({ value: l.livroId, label: l.livroTitulo }))}
        />
        
        <div className="flex justify-end gap-3 mt-4">
          <Button type="button" variant="ghost" onClick={onClose} disabled={isLoading}>Cancelar</Button>
          <Button type="submit" isLoading={isLoading}>Salvar</Button>
        </div>
      </form>
    </Modal>
  );
}
