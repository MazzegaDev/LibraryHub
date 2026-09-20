package com.Mazzega_Dev.LibraryHub.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class AutorDTO {
   @NotBlank(message = "Informe um nome valido para o autor")
   private String autorNome;

   @NotBlank(message = "Informe uma nacionalidade valida para o autor")
   private String autorNacionalidade;
}
