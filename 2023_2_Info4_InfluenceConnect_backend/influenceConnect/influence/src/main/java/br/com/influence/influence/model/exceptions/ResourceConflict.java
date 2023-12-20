package br.com.influence.influence.model.exceptions;

public class ResourceConflict extends RuntimeException {

    public static final long serialVersion = 3L;

    public ResourceConflict(String message) {
        super(message);
    }
}