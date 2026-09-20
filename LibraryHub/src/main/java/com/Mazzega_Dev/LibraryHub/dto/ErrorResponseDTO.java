package com.Mazzega_Dev.LibraryHub.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter 
@Setter 
@Builder 
@NoArgsConstructor 
@AllArgsConstructor
public class ErrorResponseDTO {
   private String message;
   private Integer status;
}
