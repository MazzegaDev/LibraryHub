package com.Mazzega_Dev.LibraryHub.dto;

import jakarta.validation.constraints.NotBlank;
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
public class UsuarioDTO {
   @NotBlank(message = "Informe um nome para o usuario")
   private String usuarioNome;

   @NotBlank(message = "Informe um email ao usuario")
   private String usuarioEmail;

   @NotBlank(message = "Informe um telefone ao usuario")
   private String usuarioTelefone;
}
