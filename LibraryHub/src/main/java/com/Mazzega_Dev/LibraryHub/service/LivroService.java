package com.Mazzega_Dev.LibraryHub.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.Mazzega_Dev.LibraryHub.database.entity.AutorEntity;
import com.Mazzega_Dev.LibraryHub.database.entity.EmprestimoEntity;
import com.Mazzega_Dev.LibraryHub.database.entity.LivroEntity;
import com.Mazzega_Dev.LibraryHub.database.repository.IAutorRepository;
import com.Mazzega_Dev.LibraryHub.database.repository.ILivroRepository;
import com.Mazzega_Dev.LibraryHub.dto.LivroDTO;
import com.Mazzega_Dev.LibraryHub.exception.BadRequestException;
import com.Mazzega_Dev.LibraryHub.exception.NotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LivroService {
   private final ILivroRepository repository;
   private final IAutorRepository autorRepository;

   private void buscarIsbn(String isbn) throws BadRequestException {
      LivroEntity livroIsbn = repository.findBylivroIsbn(isbn);
      if (livroIsbn != null) {
         throw new BadRequestException("O ISBN: " + livroIsbn + " já foi informado para um livro");
      }
   }

   public void cadastrar(LivroDTO data) throws BadRequestException, NotFoundException {

      buscarIsbn(data.getLivroIsbn());

      AutorEntity autorEncontrado = autorRepository.findById(data.getLivroAutor())
            .orElseThrow(() -> new NotFoundException("Autor não encontrado"));

      LivroEntity livroEntity = LivroEntity.builder()
            .livroTitulo(data.getLivroTitulo()).livroAnoPublicacao(data.getLivroAnoPublicacao())
            .livroIsbn(data.getLivroIsbn()).livroAutor(autorEncontrado)
            .build();

      repository.save(livroEntity);
   }

   public List<LivroEntity> consultar() throws NotFoundException {
      return repository.findAll();
   }

   public LivroEntity consultarPorId(Integer id) throws NotFoundException {
      return repository.findById(id).orElseThrow(() -> new NotFoundException("Livro não encontrado"));
   }

   public List<EmprestimoEntity> consultarEmprestimoPorLivro(Integer id) throws NotFoundException {
      LivroEntity livroEncontrado = repository.findById(id)
            .orElseThrow(() -> new NotFoundException("Livro não encontrado"));

      List<EmprestimoEntity> emprestimoLivro = livroEncontrado.getEmprestimos();
      if (emprestimoLivro.isEmpty()) {
         throw new NotFoundException("Não foi encontrado nenhum emprestimo para esse livro");
      }

      return emprestimoLivro;
   }

   public void atualizar(LivroDTO data, Integer id) throws BadRequestException, NotFoundException {

      AutorEntity autorEncontrado = autorRepository.findById(data.getLivroAutor())
            .orElseThrow(() -> new NotFoundException("Autor não encontrado"));

      LivroEntity livroEncontrado = repository.findById(id)
            .orElseThrow(() -> new NotFoundException("Livro não encontrado"));

      livroEncontrado.setLivroTitulo(data.getLivroTitulo());
      livroEncontrado.setLivroAnoPublicacao(data.getLivroAnoPublicacao());
      livroEncontrado.setLivroIsbn(data.getLivroIsbn());
      livroEncontrado.setLivroAutor(autorEncontrado);

      repository.save(livroEncontrado);

   }

   public void darBaixa(Integer id) throws NotFoundException, BadRequestException {
      LivroEntity livroEncontrado = repository.findById(id)
            .orElseThrow(() -> new NotFoundException("Livro não encontrado"));

      if (livroEncontrado.getLivroDisponivel() == false) {
         throw new BadRequestException("Esse livro já está marcado como indisponivel");
      }

      livroEncontrado.setLivroDisponivel(false);

      repository.save(livroEncontrado);
   }

   public void deletar(Integer id) throws NotFoundException {
      LivroEntity livroEncontrado = repository.findById(id)
            .orElseThrow(() -> new NotFoundException("Livro não encontrado"));

      repository.delete(livroEncontrado);
   }

}
