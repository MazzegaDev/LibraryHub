package com.Mazzega_Dev.LibraryHub.database.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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
@Table(name = "Usuario")
@Entity
public class UsuarioEntity {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Integer usuarioId;

   @Column(nullable = false)
   private String usuarioNome;

   @Column(nullable = false, unique = true)
   private String usuarioEmail;

   @Column(nullable = false, unique = true)
   private String usuarioTelefone;

   @OneToMany(mappedBy = "empUsuario")
   @Builder.Default
   private List<EmprestimoEntity> emprestimos = new ArrayList<>();
}
