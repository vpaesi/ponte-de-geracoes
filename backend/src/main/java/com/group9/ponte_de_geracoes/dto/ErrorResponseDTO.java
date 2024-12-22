// Classe usada para padronizar a forma como os erros são enviados de volta ao cliente, geralmente em APIs REST.
package com.group9.ponte_de_geracoes.dto;

import java.util.List;

public class ErrorResponseDTO {
    private String message;
    private int status;
    private String timestamp;
    private List<String> errors;

    public ErrorResponseDTO(){
    }

    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public int getStatus() {
        return status;
    }
    public void setStatus(int status) {
        this.status = status;
    }
    public String getTimestamp() {
        return timestamp;
    }
    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }
    public List<String> getErrors() {
        return errors;
    }
    public void setErrors(List<String> errors) {
        this.errors = errors;
    }    
}
