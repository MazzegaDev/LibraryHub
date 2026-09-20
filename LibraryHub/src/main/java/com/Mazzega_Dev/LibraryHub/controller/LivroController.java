package com.Mazzega_Dev.LibraryHub.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.Mazzega_Dev.LibraryHub.database.entity.EmprestimoEntity;
import com.Mazzega_Dev.LibraryHub.database.entity.LivroEntity;
import com.Mazzega_Dev.LibraryHub.dto.LivroDTO;
import com.Mazzega_Dev.LibraryHub.exception.BadRequestException;
import com.Mazzega_Dev.LibraryHub.exception.NotFoundException;
import com.Mazzega_Dev.LibraryHub.service.LivroService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/livro")
@Validated
public class LivroController {
   private final LivroService service;

   @PostMapping
   @ResponseStatus(HttpStatus.CREATED)
   public void cadastrar(@Valid @RequestBody LivroDTO data) throws BadRequestException, NotFoundException {
      service.cadastrar(data);
   }

   @GetMapping
   @ResponseStatus(HttpStatus.OK)
   public List<LivroEntity> consultar() throws NotFoundException {
      return service.consultar();
   }

   @GetMapping("/{id}")
   @ResponseStatus(HttpStatus.OK)
   public LivroEntity consultarPorId(@PathVariable Integer id) throws NotFoundException {
      return service.consultarPorId(id);
   }

   @GetMapping("/{id}/emprestimos")
   @ResponseStatus(HttpStatus.OK)
   public List<EmprestimoEntity> getMethodName(@PathVariable Integer id) throws NotFoundException {
      return service.consultarEmprestimoPorLivro(id);
   }

   @PutMapping("/{id}")
   @ResponseStatus(HttpStatus.OK)
   public void atualizar(@PathVariable Integer id, @Valid @RequestBody LivroDTO dataDto)
         throws BadRequestException, NotFoundException {
      service.atualizar(dataDto, id);
   }

   @PatchMapping("/{id}")
   @ResponseStatus(HttpStatus.OK)
   public void darBaixa(@PathVariable Integer id)
         throws NotFoundException, BadRequestException {
      service.darBaixa(id);
   }

   @DeleteMapping("/{id}")
   @ResponseStatus(HttpStatus.OK)
   public void deletar(@PathVariable Integer id)
         throws NotFoundException {
      service.deletar(id);
   }

}
