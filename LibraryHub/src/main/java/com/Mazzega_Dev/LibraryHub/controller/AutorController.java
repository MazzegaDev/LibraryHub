package com.Mazzega_Dev.LibraryHub.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.Mazzega_Dev.LibraryHub.database.entity.AutorEntity;
import com.Mazzega_Dev.LibraryHub.database.entity.LivroEntity;
import com.Mazzega_Dev.LibraryHub.dto.AutorDTO;
import com.Mazzega_Dev.LibraryHub.exception.NotFoundException;
import com.Mazzega_Dev.LibraryHub.service.AutorService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RequestMapping("/v1/autor")
@RestController
@Validated
@RequiredArgsConstructor
public class AutorController {
   private final AutorService service;

   @PostMapping
   @ResponseStatus(HttpStatus.CREATED)
   public void cadastrar(@Valid @RequestBody AutorDTO entity) {
      service.cadastrar(entity);
   }

   @GetMapping
   @ResponseStatus(HttpStatus.OK)
   public List<AutorEntity> consultar() throws NotFoundException {
      return service.consultar();
   }

   @GetMapping("/{id}/livros")
   @ResponseStatus(HttpStatus.OK)
   public List<LivroEntity> consultarLivrosPorAutor(@PathVariable Integer id) throws NotFoundException {
      return service.consultarLivrosPorAutor(id);
   }

   @GetMapping("/{id}")
   @ResponseStatus(HttpStatus.OK)
   public AutorEntity consultarPorId(@PathVariable Integer id) throws NotFoundException {
      return service.consultarPorId(id);
   }

   @PutMapping("/{id}")
   @ResponseStatus(HttpStatus.CREATED)
   public void atualizar(@PathVariable Integer id, @Valid @RequestBody AutorDTO entity) throws NotFoundException {
      service.atualizar(entity, id);
   }

   @DeleteMapping("/{id}")
   @ResponseStatus(HttpStatus.OK)
   public void deletar(@PathVariable Integer id) throws NotFoundException {
      service.deletar(id);
   }

}
