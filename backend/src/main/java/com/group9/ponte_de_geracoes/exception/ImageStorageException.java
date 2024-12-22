package com.group9.ponte_de_geracoes.exception;

import java.util.List;

public class ImageStorageException extends RuntimeException {
        private String message;
    private List<String> errors;

    public ImageStorageException(String message){
        super(message);
        this.message = message;
    }

    public ImageStorageException(String message, List<String> errors){
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
