package br.com.influence.influence.model.exceptions;

public class MethodNotSupportedException extends RuntimeException{
    public static final long serialVersion = 6L;

    public MethodNotSupportedException(String message) {
        super(message);
    }
}
