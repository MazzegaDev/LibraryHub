package com.Mazzega_Dev.LibraryHub.dto;


import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EmprestimoDTO {
   @NotNull(message = "Informe o usuario que solicitou o emprestimo")
   private Integer empUsuario;
   @NotNull(message = "Informe o livro que foi solicitado")
   private Integer empLivro;
}
