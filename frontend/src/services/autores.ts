import { Autor, AutorDTO, Livro } from '@/types';
import { fetchApi } from './api';

export const AutoresService = {
  consultar: () => fetchApi<Autor[]>('/autor'),
  
  consultarPorId: (id: number) => fetchApi<Autor>(`/autor/${id}`),
  
  consultarLivrosPorAutor: (id: number) => fetchApi<Livro[]>(`/autor/${id}/livros`),
  
  cadastrar: (data: AutorDTO) => 
    fetchApi<void>('/autor', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    
  atualizar: (id: number, data: AutorDTO) => 
    fetchApi<void>(`/autor/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    
  deletar: (id: number) => 
    fetchApi<void>(`/autor/${id}`, {
      method: 'DELETE',
    }),
};
