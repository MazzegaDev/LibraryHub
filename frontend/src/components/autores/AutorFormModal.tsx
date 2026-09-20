'use client';

import { useState, useEffect } from 'react';
import { Autor, AutorDTO } from '@/types';
import { AutoresService } from '@/services/autores';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { toast } from 'react-hot-toast';

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
  }, [autorToEdit, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.autorNome || !formData.autorNacionalidade) {
      toast.error('Preencha todos os campos corretamente.');
      return;
    }

    try {
      setIsLoading(true);
      
      if (autorToEdit) {
        await AutoresService.atualizar(autorToEdit.autorId, formData);
        toast.success('Autor atualizado com sucesso!');
      } else {
        await AutoresService.cadastrar(formData);
        toast.success('Autor cadastrado com sucesso!');
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      toast.error(err.message || 'Ocorreu um erro ao salvar o autor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={autorToEdit ? 'Editar Autor' : 'Novo Autor'}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-1">
        
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
