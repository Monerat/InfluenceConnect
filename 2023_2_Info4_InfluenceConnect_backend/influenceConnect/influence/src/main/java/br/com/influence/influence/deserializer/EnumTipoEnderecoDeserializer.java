package br.com.influence.influence.deserializer;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import br.com.influence.influence.model.Enum.EnumTipoEndereco;
import br.com.influence.influence.model.exceptions.MyIOException;

import java.io.IOException;

public class EnumTipoEnderecoDeserializer extends JsonDeserializer<EnumTipoEndereco> {

    @Override
    public EnumTipoEndereco deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
        JsonNode node = jsonParser.getCodec().readTree(jsonParser);

        if (node.isTextual()) {
            String tipoEnderecoStr = node.asText();
            try {
                return EnumTipoEndereco.valueOf(tipoEnderecoStr.toUpperCase());
            } catch (IllegalArgumentException e) {
                throw new MyIOException("Valor inválido para EnumTipoEndereco: " + tipoEnderecoStr);
            }
        } else if (node.isNumber()) {
            int tipoEnderecoInt = node.asInt();
            try {
                return EnumTipoEndereco.values()[tipoEnderecoInt];
            } catch (ArrayIndexOutOfBoundsException e) {
                throw new MyIOException("Valor inválido para EnumTipoEndereco: " + tipoEnderecoInt);
            }
        } else {
            throw new MyIOException("Valor inválido para EnumTipoEndereco: " + node);
        }
    }
}