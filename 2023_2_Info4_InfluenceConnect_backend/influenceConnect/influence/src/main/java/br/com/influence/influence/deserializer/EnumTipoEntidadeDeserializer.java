package br.com.influence.influence.deserializer;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;

import br.com.influence.influence.model.Enum.EnumTipoEntidade;
import br.com.influence.influence.model.exceptions.MyIOException;

import java.io.IOException;

public class EnumTipoEntidadeDeserializer extends JsonDeserializer<EnumTipoEntidade> {

    @Override
    public EnumTipoEntidade deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
        JsonNode node = jsonParser.getCodec().readTree(jsonParser);

        if (node.isTextual()) {
            String tipoEntidadeStr = node.asText();
            try {
                return EnumTipoEntidade.valueOf(tipoEntidadeStr.toUpperCase());
            } catch (IllegalArgumentException e) {
                throw new MyIOException("Valor inválido para EnumTipoEntidade: " + tipoEntidadeStr);
            }
        } else if (node.isNumber()) {
            int tipoEntidadeInt = node.asInt();
            try {
                return EnumTipoEntidade.values()[tipoEntidadeInt];
            } catch (ArrayIndexOutOfBoundsException e) {
                throw new MyIOException("Valor inválido para EnumTipoEntidade: " + tipoEntidadeInt);
            }
        } else {
            throw new MyIOException("Valor inválido para EnumTipoEntidade: " + node);
        }
    }
}
