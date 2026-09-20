package com.Mazzega_Dev.LibraryHub.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.Mazzega_Dev.LibraryHub.dto.ErrorResponseDTO;
import com.Mazzega_Dev.LibraryHub.exception.BadRequestException;
import com.Mazzega_Dev.LibraryHub.exception.NotFoundException;

public class GlobalExceptionHandler {
   public ResponseEntity<ErrorResponseDTO> notFoundException(NotFoundException e){
      ErrorResponseDTO bodyResponse = ErrorResponseDTO.builder().message(e.getMessage()).status(HttpStatus.NOT_FOUND.value()).build();

      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(bodyResponse);

   }


   public ResponseEntity<ErrorResponseDTO> badRequestException(BadRequestException e){
      ErrorResponseDTO bodyResponse = ErrorResponseDTO.builder().message(e.getMessage()).status(HttpStatus.BAD_REQUEST.value()).build();

      return  ResponseEntity.status(HttpStatus.NOT_FOUND).body(bodyResponse);
   }
}
