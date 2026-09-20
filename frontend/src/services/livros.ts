import { Livro, LivroDTO, Emprestimo } from '@/types';
import { fetchApi } from './api';

export const LivrosService = {
  consultar: () => fetchApi<Livro[]>('/livro'),
  
  consultarPorId: (id: number) => fetchApi<Livro>(`/livro/${id}`),
  
  consultarEmprestimos: (id: number) => fetchApi<Emprestimo[]>(`/livro/${id}/emprestimos`),
  
  cadastrar: (data: LivroDTO) => 
    fetchApi<void>('/livro', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    
  atualizar: (id: number, data: LivroDTO) => 
    fetchApi<void>(`/livro/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    
  darBaixa: (id: number) => 
    fetchApi<void>(`/livro/${id}`, {
      method: 'PATCH',
    }),
    
  deletar: (id: number) => 
    fetchApi<void>(`/livro/${id}`, {
      method: 'DELETE',
    }),
};
