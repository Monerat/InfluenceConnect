package br.com.influence.influence.deserializer;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;

import br.com.influence.influence.model.Enum.EnumRedeSocial;
import br.com.influence.influence.model.exceptions.MyIOException;

import java.io.IOException;

public class EnumRedeSocialDeserializer extends JsonDeserializer<EnumRedeSocial> {

    @Override
    public EnumRedeSocial deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
        JsonNode node = jsonParser.getCodec().readTree(jsonParser);

        if (node.isTextual()) {
            String redeSocialStr = node.asText();
            try {
                return EnumRedeSocial.valueOf(redeSocialStr.toUpperCase());
            } catch (IllegalArgumentException e) {
                throw new MyIOException("Valor inválido para EnumRedeSocial: " + redeSocialStr);
            }
        } else if (node.isNumber()) {
            int redeSocialInt = node.asInt();
            try {
                return EnumRedeSocial.values()[redeSocialInt];
            } catch (ArrayIndexOutOfBoundsException e) {
                throw new MyIOException("Valor inválido para EnumRedeSocial: " + redeSocialInt);
            }
        } else {
            throw new MyIOException("Valor inválido para EnumRedeSocial: " + node);
        }
    }
}