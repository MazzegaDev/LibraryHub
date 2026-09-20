'use client';

import { useState, useEffect } from 'react';
import { Usuario, UsuarioDTO } from '@/types';
import { UsuariosService } from '@/services/usuarios';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { toast } from 'react-hot-toast';

interface UsuarioFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  usuarioToEdit?: Usuario | null;
}

export function UsuarioFormModal({ isOpen, onClose, onSuccess, usuarioToEdit }: UsuarioFormModalProps) {
  const [formData, setFormData] = useState<UsuarioDTO>({
    usuarioNome: '',
    usuarioEmail: '',
    usuarioTelefone: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (usuarioToEdit) {
      setFormData({
        usuarioNome: usuarioToEdit.usuarioNome,
        usuarioEmail: usuarioToEdit.usuarioEmail,
        usuarioTelefone: usuarioToEdit.usuarioTelefone,
      });
    } else {
      setFormData({
        usuarioNome: '',
        usuarioEmail: '',
        usuarioTelefone: '',
      });
    }
  }, [usuarioToEdit, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.usuarioNome || !formData.usuarioEmail || !formData.usuarioTelefone) {
      toast.error('Preencha todos os campos corretamente.');
      return;
    }

    try {
      setIsLoading(true);
      
      if (usuarioToEdit) {
        await UsuariosService.atualizar(usuarioToEdit.usuarioId, formData);
        toast.success('Usuário atualizado com sucesso!');
      } else {
        await UsuariosService.cadastrar(formData);
        toast.success('Usuário cadastrado com sucesso!');
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      toast.error(err.message || 'Ocorreu um erro ao salvar o usuário.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={usuarioToEdit ? 'Editar Usuário' : 'Novo Usuário'}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-1">
        
        <Input 
          label="Nome Completo" 
          value={formData.usuarioNome}
          onChange={e => setFormData({...formData, usuarioNome: e.target.value})}
          placeholder="Ex: João da Silva"
          required
        />
        
        <Input 
          label="Email" 
          type="email"
          value={formData.usuarioEmail}
          onChange={e => setFormData({...formData, usuarioEmail: e.target.value})}
          placeholder="Ex: joao@email.com"
          required
        />
        
        <Input 
          label="Telefone" 
          value={formData.usuarioTelefone}
          onChange={e => setFormData({...formData, usuarioTelefone: e.target.value})}
          placeholder="Ex: (11) 99999-9999"
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
