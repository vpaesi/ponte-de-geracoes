package com.group9.ponte_de_geracoes.config;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import com.group9.ponte_de_geracoes.dto.ErrorResponseDTO;
import com.group9.ponte_de_geracoes.exception.EntityNotFoundException;
import com.group9.ponte_de_geracoes.exception.ImageStorageException;


@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ErrorResponseDTO> handleNotFoundEntityException(EntityNotFoundException ex){
        ErrorResponseDTO response = new ErrorResponseDTO();
        response.setStatus(HttpStatus.NOT_FOUND.value());
        response.setMessage(ex.getMessage());
        response.setTimestamp(LocalDateTime.now().toString());
        response.setErrors(ex.getErrors());
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ImageStorageException.class)
    public ResponseEntity<ErrorResponseDTO> handleImageStorageException(ImageStorageException ex){
        ErrorResponseDTO response = new ErrorResponseDTO();
        response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
        response.setMessage(ex.getMessage());
        response.setTimestamp(LocalDateTime.now().toString());
        response.setErrors(ex.getErrors());
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(MultipartException.class)
    public ResponseEntity<ErrorResponseDTO> handleImageInputException(){
        ErrorResponseDTO response = new ErrorResponseDTO();
        response.setStatus(HttpStatus.BAD_REQUEST.value());
        response.setMessage("Current request is not a multipart request");
        response.setTimestamp(LocalDateTime.now().toString());
        response.setErrors(List.of("A requisição feita não é uma requisição multipart com imagem"));
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
    
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ErrorResponseDTO> handleIncorrectHttpMethodURL(HttpRequestMethodNotSupportedException e){
        String message = "HTTP method not supported: " + e.getMethod();
        String error = "O método HTTP " + e.getMethod() + " não é suportado. Métodos esperados: " + e.getSupportedHttpMethods();

        ErrorResponseDTO response = new ErrorResponseDTO();
        response.setStatus(HttpStatus.METHOD_NOT_ALLOWED.value());
        response.setMessage(message);
        response.setTimestamp(LocalDateTime.now().toString());
        response.setErrors(List.of(error));
        return new ResponseEntity<>(response, HttpStatus.METHOD_NOT_ALLOWED);
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<ErrorResponseDTO> handleNoResourceFound(NoResourceFoundException e) {
        ErrorResponseDTO response = new ErrorResponseDTO();
        response.setStatus(HttpStatus.NOT_FOUND.value());
        response.setMessage(e.getMessage());
        response.setTimestamp(LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        response.setErrors(List.of("O recurso solicitado não foi encontrado."));

        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }
}
