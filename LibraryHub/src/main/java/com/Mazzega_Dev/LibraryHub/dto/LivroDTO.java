package com.Mazzega_Dev.LibraryHub.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
public class LivroDTO {

   @NotBlank(message = "Informe o titulo do livro")
   private String livroTitulo;

   @NotBlank(message = "Informe o ISBN do livro")
   private String livroIsbn;

   @NotNull(message = "Informe o ano")
   private Integer livroAnoPublicacao;

   @NotNull(message = "Informe o autor do livro")
   private Integer livroAutor;
}
