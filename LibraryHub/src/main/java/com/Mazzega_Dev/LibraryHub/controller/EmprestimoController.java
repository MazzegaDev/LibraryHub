package com.Mazzega_Dev.LibraryHub.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.Mazzega_Dev.LibraryHub.database.entity.EmprestimoEntity;
import com.Mazzega_Dev.LibraryHub.dto.EmprestimoDTO;
import com.Mazzega_Dev.LibraryHub.enums.Status;
import com.Mazzega_Dev.LibraryHub.exception.BadRequestException;
import com.Mazzega_Dev.LibraryHub.exception.NotFoundException;
import com.Mazzega_Dev.LibraryHub.service.EmprestimoService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RequiredArgsConstructor
@Validated
@RestController
@RequestMapping("/v1/emprestimo")
public class EmprestimoController {
   private final EmprestimoService emprestimoService;

   @PostMapping()
   @ResponseStatus(HttpStatus.CREATED)
   public void solicitarEmprestimo(@Valid @RequestBody EmprestimoDTO entity) throws NotFoundException,
         BadRequestException {
      emprestimoService.solicitarEmprestimo(entity);
   }

   @GetMapping()
   @ResponseStatus(HttpStatus.OK)
   public List<EmprestimoEntity> consultar() {
      return emprestimoService.consultar();
   }

   @PatchMapping("/{id}")
   @ResponseStatus(HttpStatus.CREATED)
   public void mudarStatus(@PathVariable Integer id, @Valid @RequestBody Status status) throws NotFoundException {
      emprestimoService.mudarStatus(id, status);
   }

   @PatchMapping("/devolver/{id}")
   @ResponseStatus(HttpStatus.CREATED)
   public void realizarDevolucao(@PathVariable Integer id) throws NotFoundException {
      emprestimoService.realizarDevolucao(id);
   }
}
