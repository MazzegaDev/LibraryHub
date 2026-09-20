package com.Mazzega_Dev.LibraryHub.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.Mazzega_Dev.LibraryHub.database.entity.AutorEntity;
import com.Mazzega_Dev.LibraryHub.database.entity.LivroEntity;
import com.Mazzega_Dev.LibraryHub.database.repository.IAutorRepository;
import com.Mazzega_Dev.LibraryHub.dto.AutorDTO;
import com.Mazzega_Dev.LibraryHub.exception.NotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AutorService {
   private final IAutorRepository repository;

   public void cadastrar(AutorDTO data) {
      AutorEntity autorEntity = AutorEntity.builder().autorNacionalidade(data.getAutorNacionalidade())
            .autorNome(data.getAutorNome()).build();

      repository.save(autorEntity);
   }

   public List<AutorEntity> consultar() {
      return repository.findAll();
   }

   public AutorEntity consultarPorId(Integer id) throws NotFoundException {
      AutorEntity autorEncontrado = repository.findById(id)
            .orElseThrow(() -> new NotFoundException("Autor não encontrado"));

      return autorEncontrado;
   }

   public List<LivroEntity> consultarLivrosPorAutor(Integer id) throws NotFoundException {
      AutorEntity autorEncontrado = repository.findById(id).orElse(null);
      if (autorEncontrado == null) {
         throw new NotFoundException("Autor não encontrado");
      }

      List<LivroEntity> livrosDoAutor = autorEncontrado.getLivros();

      return livrosDoAutor;
   }

   public void atualizar(AutorDTO data, Integer id) throws NotFoundException {
      AutorEntity autorEncontrado = repository.findById(id).orElse(null);
      if (autorEncontrado == null) {
         throw new NotFoundException("Autor não encontrado");
      }

      autorEncontrado.setAutorNome(data.getAutorNome());
      autorEncontrado.setAutorNacionalidade(data.getAutorNacionalidade());

      repository.save(autorEncontrado);

   }

   public void deletar(Integer id) throws NotFoundException {
      AutorEntity autorEncontrado = repository.findById(id).orElse(null);
      if (autorEncontrado == null) {
         throw new NotFoundException("Autor não encontrado");
      }

      repository.delete(autorEncontrado);
   }

}
