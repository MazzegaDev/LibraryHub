package com.Mazzega_Dev.LibraryHub.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.Mazzega_Dev.LibraryHub.database.entity.EmprestimoEntity;
import com.Mazzega_Dev.LibraryHub.database.entity.LivroEntity;
import com.Mazzega_Dev.LibraryHub.database.entity.UsuarioEntity;
import com.Mazzega_Dev.LibraryHub.database.repository.IEmprestimoRepository;
import com.Mazzega_Dev.LibraryHub.database.repository.ILivroRepository;
import com.Mazzega_Dev.LibraryHub.database.repository.IUsuarioRepository;
import com.Mazzega_Dev.LibraryHub.dto.EmprestimoDTO;
import com.Mazzega_Dev.LibraryHub.enums.Status;
import com.Mazzega_Dev.LibraryHub.exception.BadRequestException;
import com.Mazzega_Dev.LibraryHub.exception.NotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmprestimoService {
   private final IEmprestimoRepository emprestimoRepository;
   private final IUsuarioRepository usuarioRepository;
   private final ILivroRepository livroRepository;

   private UsuarioEntity buscarUsuario(Integer usuarioId) throws NotFoundException {
      UsuarioEntity usuarioEntity = usuarioRepository.findById(usuarioId).orElse(null);

      if (usuarioEntity == null) {
         throw new NotFoundException("Usuario não encontrado");
      }

      return usuarioEntity;
   }

   private LivroEntity buscarLivro(Integer livroId) throws NotFoundException {
      LivroEntity livroEntity = livroRepository.findById(livroId).orElse(null);

      if (livroEntity == null) {
         throw new NotFoundException("Livro não encontrado");
      }

      return livroEntity;
   }

   public void solicitarEmprestimo(EmprestimoDTO emprestimo) throws NotFoundException, BadRequestException {

      UsuarioEntity uEntity = buscarUsuario(emprestimo.getEmpUsuario());
      LivroEntity lEntity = buscarLivro(emprestimo.getEmpLivro());

      if (lEntity.getLivroDisponivel() == false) {
         throw new BadRequestException("Esse livro já tem um emprestimo ativo, e não pode ser emprestado no momento");
      }

      LocalDate dataEmprestimLocalDate = LocalDate.now();

      EmprestimoEntity emprestimoEntity = EmprestimoEntity.builder()
            .empData(dataEmprestimLocalDate).empLivro(lEntity)
            .empUsuario(uEntity).empStatus(Status.ATIVO).build();

      lEntity.setLivroDisponivel(false);
      emprestimoRepository.save(emprestimoEntity);
   }

   public List<EmprestimoEntity> consultar() {
      return emprestimoRepository.findAll();
   }

   public void mudarStatus(Integer id, Status status) throws NotFoundException {
      EmprestimoEntity emprestimoEntity = emprestimoRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Emprestimo não encontrado"));

      emprestimoEntity.setEmpStatus(status);

      emprestimoRepository.save(emprestimoEntity);
   }

   public void realizarDevolucao(Integer id) throws NotFoundException {
      EmprestimoEntity emprestimoEntity = emprestimoRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Emprestimo não encontrado"));

      LocalDate dataDevolucaoDate = LocalDate.now();

      LivroEntity emprestimoLivroEntity = emprestimoEntity.getEmpLivro();

      emprestimoLivroEntity.setLivroDisponivel(true);
      emprestimoEntity.setEmpDevolucao(dataDevolucaoDate);
      emprestimoEntity.setEmpStatus(Status.DEVOLVIDO);
      // Salvar
      livroRepository.save(emprestimoLivroEntity);
      emprestimoRepository.save(emprestimoEntity);
   }
}
