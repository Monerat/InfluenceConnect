package br.com.influence.influence.deserializer;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;

import br.com.influence.influence.model.Enum.EnumLog;
import br.com.influence.influence.model.exceptions.MyIOException;

import java.io.IOException;

public class EnumLogDeserializer extends JsonDeserializer<EnumLog> {

    @Override
    public EnumLog deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
        JsonNode node = jsonParser.getCodec().readTree(jsonParser);

        if (node.isTextual()) {
            String logStr = node.asText();
            try {
                return EnumLog.valueOf(logStr.toUpperCase());
            } catch (IllegalArgumentException e) {
                throw new MyIOException("Valor inválido para EnumLog: " + logStr);
            }
        } else if (node.isNumber()) {
            int logInt = node.asInt();
            try {
                return EnumLog.values()[logInt];
            } catch (ArrayIndexOutOfBoundsException e) {
                throw new MyIOException("Valor inválido para EnumLog: " + logInt);
            }
        } else {
            throw new MyIOException("Valor inválido para EnumLog: " + node);
        }
    }
}