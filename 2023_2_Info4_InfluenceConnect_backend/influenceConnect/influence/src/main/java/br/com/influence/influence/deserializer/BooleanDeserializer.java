package br.com.influence.influence.deserializer;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;

import br.com.influence.influence.model.exceptions.MyIOException;

import java.io.IOException;

public class BooleanDeserializer extends JsonDeserializer<Boolean> {

    @Override
    public Boolean deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
        String fieldName = jsonParser.getCurrentName();

        try {
            JsonNode node = jsonParser.getCodec().readTree(jsonParser);
            String stringValue = node.asText();

            if (!verificarValorString(stringValue)) {
                throw new IllegalArgumentException("A string não representa um valor booleano válido");
            }

            return Boolean.parseBoolean(stringValue);
        } catch (IllegalArgumentException e) {
            throw new MyIOException("Erro ao desserializar o campo '" + fieldName + "', porque o mesmo não representa um valor boleano válido");
        }
    }

    public boolean verificarValorString(String str) {
        return str.equalsIgnoreCase("true") || str.equalsIgnoreCase("false");
    }
}