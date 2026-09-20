'use client';

import { useState, useEffect } from 'react';
import { Autor, AutorDTO } from '@/types';
import { AutoresService } from '@/services/autores';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface AutorFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  autorToEdit?: Autor | null;
}

export function AutorFormModal({ isOpen, onClose, onSuccess, autorToEdit }: AutorFormModalProps) {
  const [formData, setFormData] = useState<AutorDTO>({
    autorNome: '',
    autorNacionalidade: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (autorToEdit) {
      setFormData({
        autorNome: autorToEdit.autorNome,
        autorNacionalidade: autorToEdit.autorNacionalidade,
      });
    } else {
      setFormData({
        autorNome: '',
        autorNacionalidade: '',
      });
    }
    setError('');
  }, [autorToEdit, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.autorNome || !formData.autorNacionalidade) {
      setError('Preencha todos os campos corretamente.');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      
      if (autorToEdit) {
        await AutoresService.atualizar(autorToEdit.autorId, formData);
      } else {
        await AutoresService.cadastrar(formData);
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao salvar o autor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={autorToEdit ? 'Editar Autor' : 'Novo Autor'}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-1">
        {error && <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm mb-2">{error}</div>}
        
        <Input 
          label="Nome do Autor" 
          value={formData.autorNome}
          onChange={e => setFormData({...formData, autorNome: e.target.value})}
          placeholder="Ex: Machado de Assis"
          required
        />
        
        <Input 
          label="Nacionalidade" 
          value={formData.autorNacionalidade}
          onChange={e => setFormData({...formData, autorNacionalidade: e.target.value})}
          placeholder="Ex: Brasileiro"
          required
        />
        
        <div className="flex justify-end gap-3 mt-4">
          <Button type="button" variant="ghost" onClick={onClose} disabled={isLoading}>Cancelar</Button>
          <Button type="submit" isLoading={isLoading}>Salvar</Button>
        </div>
      </form>
    </Modal>
  );
}
