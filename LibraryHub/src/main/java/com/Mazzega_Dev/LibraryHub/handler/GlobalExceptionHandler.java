package com.Mazzega_Dev.LibraryHub.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.Mazzega_Dev.LibraryHub.dto.ErrorResponseDTO;
import com.Mazzega_Dev.LibraryHub.exception.BadRequestException;
import com.Mazzega_Dev.LibraryHub.exception.NotFoundException;

@RestControllerAdvice 
public class GlobalExceptionHandler {

   @ExceptionHandler(NotFoundException.class)
   public ResponseEntity<ErrorResponseDTO> NotFoundException(NotFoundException e) {
      ErrorResponseDTO bodyResponse = ErrorResponseDTO.builder().message(e.getMessage())
            .status(HttpStatus.NOT_FOUND.value()).build();

      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(bodyResponse);

   }

   @ExceptionHandler(BadRequestException.class)
   public ResponseEntity<ErrorResponseDTO> BadRequestException(BadRequestException e) {
      ErrorResponseDTO bodyResponse = ErrorResponseDTO.builder().message(e.getMessage())
            .status(HttpStatus.BAD_REQUEST.value()).build();

      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(bodyResponse);
   }
}
