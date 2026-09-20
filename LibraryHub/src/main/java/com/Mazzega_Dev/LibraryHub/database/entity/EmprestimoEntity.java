package com.Mazzega_Dev.LibraryHub.database.entity;

import java.time.LocalDate;

import com.Mazzega_Dev.LibraryHub.enums.Status;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Table(name = "Emprestimo")
@Entity
public class EmprestimoEntity {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Integer empId;

   @Column(nullable = false)
   private LocalDate empData;

   private LocalDate empDevolucao;

   @Enumerated(EnumType.STRING)
   @Builder.Default
   private Status empStatus = Status.ATIVO;

   // "Para um empréstimo existir associado a um usuário, o EmprestimoEntity
   // precisa guardar qual UsuarioEntity está relacionado a ele."

   @ManyToOne(fetch = FetchType.LAZY)
   @JoinColumn(name = "usuario_id")
   private UsuarioEntity empUsuario;

   @ManyToOne(fetch = FetchType.LAZY)
   @JoinColumn(name = "livro_id")
   private LivroEntity empLivro;
}
