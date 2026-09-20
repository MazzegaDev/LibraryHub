package com.Mazzega_Dev.LibraryHub.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.Mazzega_Dev.LibraryHub.database.entity.EmprestimoEntity;
import com.Mazzega_Dev.LibraryHub.database.entity.UsuarioEntity;
import com.Mazzega_Dev.LibraryHub.database.repository.IUsuarioRepository;
import com.Mazzega_Dev.LibraryHub.dto.UsuarioDTO;
import com.Mazzega_Dev.LibraryHub.exception.BadRequestException;
import com.Mazzega_Dev.LibraryHub.exception.NotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UsuarioService {
   private final IUsuarioRepository usuarioRepository;

   private void verificarDisponibilidadeEmail(String usuarioEmail) throws BadRequestException {
      UsuarioEntity usuarioEntity = usuarioRepository.findByEmail(usuarioEmail)
            .orElse(null);

      if (usuarioEntity != null) {
         throw new BadRequestException("Esse E-mail já foi cadastrado");

      }
   }

   private void verificarDisponibilidadeTelefone(String usuarioTelefone) throws BadRequestException {
      UsuarioEntity usuarioEntity = usuarioRepository.findByTelefone(usuarioTelefone)
            .orElse(null);

      if (usuarioEntity != null) {
         throw new BadRequestException("Esse telefone já foi cadastrado");

      }
   }

   public void cadastrar(UsuarioDTO data) throws BadRequestException {
      verificarDisponibilidadeEmail(data.getUsuarioEmail());
      verificarDisponibilidadeTelefone(data.getUsuarioTelefone());

      UsuarioEntity usuarioEntity = UsuarioEntity.builder()
            .usuarioNome(data.getUsuarioNome()).usuarioEmail(data.getUsuarioEmail())
            .usuarioTelefone(data.getUsuarioTelefone()).build();

      usuarioRepository.save(usuarioEntity);
   }

   public List<UsuarioEntity> consultar() throws NotFoundException {
      return usuarioRepository.findAll();
   }

   public UsuarioEntity consultarPorId(Integer id) throws NotFoundException {
      return usuarioRepository.findById(id).orElseThrow(() -> new NotFoundException("Usuario não encontrado"));
   }

   public List<EmprestimoEntity> consultarEmprestimoPorUsuario(Integer id) throws NotFoundException {
      UsuarioEntity usuarioEntity = consultarPorId(id);

      List<EmprestimoEntity> emprestimoUsuario = usuarioEntity.getEmprestimos();

      if (emprestimoUsuario.isEmpty()) {
         throw new NotFoundException("Esse usuario não possui nenhum emprestimo");
      }

      return emprestimoUsuario;
   }

   public UsuarioEntity consultarPorEmail(String email) throws NotFoundException {
      return usuarioRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("Usuario não encontrado"));
   }

   public void atualizar(UsuarioDTO data, Integer id) throws NotFoundException {
      UsuarioEntity usuarioEntity = consultarPorId(id);

      usuarioEntity.setUsuarioNome(data.getUsuarioNome());
      usuarioEntity.setUsuarioEmail(data.getUsuarioEmail());
      usuarioEntity.setUsuarioTelefone(data.getUsuarioTelefone());

      usuarioRepository.save(usuarioEntity);
   }

   public void deletar(Integer id) throws NotFoundException {
      UsuarioEntity usuarioEntity = consultarPorId(id);

      usuarioRepository.delete(usuarioEntity);
   }
}
