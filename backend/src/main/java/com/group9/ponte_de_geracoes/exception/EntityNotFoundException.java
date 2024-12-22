package com.group9.ponte_de_geracoes.exception;

import java.util.List;

public class EntityNotFoundException extends RuntimeException {
    private String message;
    private List<String> errors;

    public EntityNotFoundException(String message){
        super(message);
        this.message = message;
    }

    public EntityNotFoundException(String message, List<String> errors){
        super(message);
        this.message = message;
        this.errors = errors;
    }

    public String getMessage() {
        return message;
    }

    public List<String> getErrors() {
        return errors;
    }
}
