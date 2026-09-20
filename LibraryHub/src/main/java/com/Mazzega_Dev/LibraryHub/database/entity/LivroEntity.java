package com.Mazzega_Dev.LibraryHub.database.entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Livro")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder 
public class LivroEntity {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Integer livroId;

   @Column(nullable = false)
   private String livroTitulo;

   @Column(nullable = false, unique = true)
   private String livroIsbn;

   @Column(nullable = false)
   private Integer livroAnoPublicacao;

   @Builder.Default
   @Column(nullable = false)
   private Boolean livroDisponivel = true;


   //Muitos livros para um autor
   @ManyToOne(fetch = FetchType.EAGER)
   @JoinColumn (name = "autor_id")
   //atributo autor representa o relacionamento entre Autor e Livro
   @JsonIgnore
   private AutorEntity livroAutor; 

   @OneToMany(mappedBy = "empLivro")
   @Builder.Default
   private List<EmprestimoEntity> emprestimos = new ArrayList<>();
}
