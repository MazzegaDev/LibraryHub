package com.Mazzega_Dev.LibraryHub.database.entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

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

@Entity
@Table(name = "Autor")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter

public class AutorEntity {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Integer autorId;

   @Column(nullable = false)
   private String autorNome;

   @Column(nullable = false)
   private String autorNacionalidade;

   //Usa o nome do atributo da entity
   @OneToMany(mappedBy = "livroAutor")
   @Builder.Default
   @JsonIgnore
   private List<LivroEntity> livros = new ArrayList<>();
}
