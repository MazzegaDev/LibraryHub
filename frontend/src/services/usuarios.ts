import { Usuario, UsuarioDTO, Emprestimo } from '@/types';
import { fetchApi } from './api';

export const UsuariosService = {
  consultar: () => fetchApi<Usuario[]>('/usuario'),
  
  consultarPorId: (id: number) => fetchApi<Usuario>(`/usuario/${id}`),
  
  consultarEmprestimos: (id: number) => fetchApi<Emprestimo[]>(`/usuario/consultar-emprestimo-por-usuario/${id}`),
  
  consultarPorEmail: (email: string) => fetchApi<Usuario>(`/usuario/email/${email}`),
  
  cadastrar: (data: UsuarioDTO) => 
    fetchApi<void>('/usuario', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    
  atualizar: (id: number, data: UsuarioDTO) => 
    fetchApi<void>(`/usuario/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    
  deletar: (id: number) => 
    fetchApi<void>(`/usuario/${id}`, {
      method: 'DELETE',
    }),
};
