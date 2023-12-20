package br.com.influence.influence.deserializer;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;

import br.com.influence.influence.model.Enum.EnumGenero;
import br.com.influence.influence.model.exceptions.MyIOException;

import java.io.IOException;

public class EnumGeneroDeserializer extends JsonDeserializer<EnumGenero> {

    @Override
    public EnumGenero deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
        JsonNode node = jsonParser.getCodec().readTree(jsonParser);

        if (node.isTextual()) {
            String generoStr = node.asText();
            try {
                return EnumGenero.valueOf(generoStr.toUpperCase());
            } catch (IllegalArgumentException e) {
                throw new MyIOException("Valor inválido para EnumGenero: " + generoStr);
            }
        } else if (node.isNumber()) {
            int generoInt = node.asInt();
            try {
                return EnumGenero.values()[generoInt];
            } catch (ArrayIndexOutOfBoundsException e) {
                throw new MyIOException("Valor inválido para EnumGenero: " + generoInt);
            }
        } else {
            throw new MyIOException("Valor inválido para EnumGenero: " + node);
        }
    }
}