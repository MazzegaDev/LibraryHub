'use client';

import { useState, useEffect } from 'react';
import { Livro, Autor, LivroDTO } from '@/types';
import { LivrosService } from '@/services/livros';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { toast } from 'react-hot-toast';

interface LivroFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  livroToEdit?: Livro | null;
  autores: Autor[];
}

export function LivroFormModal({ isOpen, onClose, onSuccess, livroToEdit, autores }: LivroFormModalProps) {
  const [formData, setFormData] = useState<LivroDTO>({
    livroTitulo: '',
    livroIsbn: '',
    livroAnoPublicacao: new Date().getFullYear(),
    livroAutor: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (livroToEdit) {
      setFormData({
        livroTitulo: livroToEdit.livroTitulo,
        livroIsbn: livroToEdit.livroIsbn,
        livroAnoPublicacao: livroToEdit.livroAnoPublicacao,
        livroAutor: livroToEdit.livroAutor?.autorId || 0,
      });
    } else {
      setFormData({
        livroTitulo: '',
        livroIsbn: '',
        livroAnoPublicacao: new Date().getFullYear(),
        livroAutor: 0,
      });
    }
  }, [livroToEdit, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.livroTitulo || !formData.livroIsbn || !formData.livroAutor || !formData.livroAnoPublicacao) {
      toast.error('Preencha todos os campos corretamente.');
      return;
    }

    try {
      setIsLoading(true);
      
      const payload: LivroDTO = {
        ...formData,
        livroAutor: Number(formData.livroAutor)
      };

      if (livroToEdit) {
        await LivrosService.atualizar(livroToEdit.livroId, payload);
        toast.success('Livro atualizado com sucesso!');
      } else {
        await LivrosService.cadastrar(payload);
        toast.success('Livro cadastrado com sucesso!');
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      toast.error(err.message || 'Ocorreu um erro ao salvar o livro.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={livroToEdit ? 'Editar Livro' : 'Novo Livro'}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-1">
        
        <Input 
          label="Título" 
          value={formData.livroTitulo}
          onChange={e => setFormData({...formData, livroTitulo: e.target.value})}
          placeholder="Ex: Dom Casmurro"
          required
        />
        
        <Input 
          label="ISBN" 
          value={formData.livroIsbn}
          onChange={e => setFormData({...formData, livroIsbn: e.target.value})}
          placeholder="Ex: 978-85-359-0277-8"
          required
        />
        
        <Input 
          label="Ano de Publicação" 
          type="number"
          value={formData.livroAnoPublicacao}
          onChange={e => setFormData({...formData, livroAnoPublicacao: parseInt(e.target.value) || 0})}
          required
        />
        
        <Select 
          label="Autor" 
          value={formData.livroAutor || ''}
          onChange={e => setFormData({...formData, livroAutor: Number(e.target.value)})}
          required
          options={autores.map(a => ({ value: a.autorId, label: a.autorNome }))}
        />
        
        <div className="flex justify-end gap-3 mt-4">
          <Button type="button" variant="ghost" onClick={onClose} disabled={isLoading}>Cancelar</Button>
          <Button type="submit" isLoading={isLoading}>Salvar</Button>
        </div>
      </form>
    </Modal>
  );
}
