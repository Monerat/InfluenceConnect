package br.com.influence.influence.deserializer;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;

import br.com.influence.influence.model.exceptions.MyIOException;

import com.fasterxml.jackson.databind.JsonDeserializer;
import java.io.IOException;

public class IntegerDeserializer extends JsonDeserializer<Integer> {

    @Override
    public Integer deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
        String fieldName = jsonParser.getCurrentName(); 

        try {
            JsonNode node = jsonParser.getCodec().readTree(jsonParser);
            String stringValue = node.asText();

            if (!verificarValorString(stringValue)) {
                throw new NumberFormatException("A string não representa um número válido");
            }

            return Integer.valueOf(stringValue);
        } catch (NumberFormatException e) {
            throw new MyIOException("Erro ao desserializar o campo '" + fieldName + "', porque o mesmo não representa um número válido");
        }
    }
    
    public boolean verificarValorString(String str) {
        try {
            Integer.parseInt(str);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }
  
}
