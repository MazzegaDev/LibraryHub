import { Emprestimo, EmprestimoDTO, StatusEmprestimo } from '@/types';
import { fetchApi } from './api';

export const EmprestimosService = {
  consultar: () => fetchApi<Emprestimo[]>('/emprestimo'),
  
  solicitar: (data: EmprestimoDTO) => 
    fetchApi<void>('/emprestimo', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    
  mudarStatus: (id: number, status: StatusEmprestimo) => 
    // Sending just a string with quotes as the request body for Status because the endpoint expects `@RequestBody Status status`
    fetchApi<void>(`/emprestimo/${id}`, {
      method: 'PATCH',
      body: `"${status}"`,
    }),
    
  realizarDevolucao: (id: number) => 
    fetchApi<void>(`/emprestimo/devolver/${id}`, {
      method: 'PATCH',
    }),
};
