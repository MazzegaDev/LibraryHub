package com.Mazzega_Dev.LibraryHub.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.service.annotation.DeleteExchange;

import com.Mazzega_Dev.LibraryHub.database.entity.EmprestimoEntity;
import com.Mazzega_Dev.LibraryHub.database.entity.UsuarioEntity;
import com.Mazzega_Dev.LibraryHub.dto.UsuarioDTO;
import com.Mazzega_Dev.LibraryHub.exception.BadRequestException;
import com.Mazzega_Dev.LibraryHub.exception.NotFoundException;
import com.Mazzega_Dev.LibraryHub.service.UsuarioService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/v1/usuario")
public class UsuarioController {
   private final UsuarioService usuarioService;

   @PostMapping
   @ResponseStatus(HttpStatus.CREATED)
   public void cadastrar(@Valid @RequestBody UsuarioDTO data) throws BadRequestException {
      usuarioService.cadastrar(data);
   }

   @GetMapping()
   @ResponseStatus(HttpStatus.OK)
   public List<UsuarioEntity> consultar() throws NotFoundException {
      return usuarioService.consultar();
   }

   @GetMapping("/{id}")
   @ResponseStatus(HttpStatus.OK)
   public UsuarioEntity consultar(@PathVariable Integer id) throws NotFoundException {
      return usuarioService.consultarPorId(id);
   }

   @GetMapping("/{id}")
   @ResponseStatus(HttpStatus.OK)
   public List<EmprestimoEntity> consultarEmprestimoPorUsuario(@PathVariable Integer id) throws NotFoundException {
      return usuarioService.consultarEmprestimoPorUsuario(id);
   }

   @GetMapping("/{email}")
   @ResponseStatus(HttpStatus.OK)
   public UsuarioEntity consultar(@PathVariable String email) throws NotFoundException {
      return usuarioService.consultarPorEmail(email);
   }

   @PutMapping("/{id}")
   @ResponseStatus(HttpStatus.CREATED)
   public void atualizar(@PathVariable Integer id, @Valid @RequestBody UsuarioDTO data) throws NotFoundException {
      usuarioService.atualizar(data, id);
   }

   @DeleteMapping("/{id}")
   @ResponseStatus(HttpStatus.OK)
   public void deletar(@PathVariable Integer id) throws NotFoundException {
      usuarioService.deletar(id);
   }
}
