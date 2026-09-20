export interface Autor {
  autorId: number;
  autorNome: string;
  autorNacionalidade: string;
}

export interface Livro {
  livroId: number;
  livroTitulo: string;
  livroIsbn: string;
  livroAnoPublicacao: number;
  livroDisponivel: boolean;
  livroAutor?: Autor; // Can be omitted by @JsonIgnore depending on endpoint
}

export interface Usuario {
  usuarioId: number;
  usuarioNome: string;
  usuarioEmail: string;
  usuarioTelefone: string;
}

export type StatusEmprestimo = 'ATIVO' | 'DEVOLVIDO' | 'ATRASADO';

export interface Emprestimo {
  empId: number;
  empData: string; // LocalDate as string
  empDevolucao?: string;
  empStatus: StatusEmprestimo;
  empUsuario?: Usuario; 
  empLivro?: Livro;
}

// DTOs for requests
export interface AutorDTO {
  autorNome: string;
  autorNacionalidade: string;
}

export interface LivroDTO {
  livroTitulo: string;
  livroIsbn: string;
  livroAnoPublicacao: number;
  livroAutor: number; // ID do autor
}

export interface UsuarioDTO {
  usuarioNome: string;
  usuarioEmail: string;
  usuarioTelefone: string;
}

export interface EmprestimoDTO {
  empUsuario: number; // ID do usuario
  empLivro: number[]; // IDs dos livros
}
