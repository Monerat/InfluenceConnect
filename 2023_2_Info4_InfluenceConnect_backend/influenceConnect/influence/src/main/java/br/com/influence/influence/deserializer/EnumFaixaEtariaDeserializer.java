package br.com.influence.influence.deserializer;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;

import br.com.influence.influence.model.Enum.EnumFaixaEtaria;
import br.com.influence.influence.model.exceptions.MyIOException;

import java.io.IOException;

public class EnumFaixaEtariaDeserializer extends JsonDeserializer<EnumFaixaEtaria> {

    @Override
    public EnumFaixaEtaria deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
        JsonNode node = jsonParser.getCodec().readTree(jsonParser);

        if (node.isTextual()) {
            String faixaEtariaStr = node.asText();
            try {
                return EnumFaixaEtaria.valueOf(faixaEtariaStr.toUpperCase());
            } catch (IllegalArgumentException e) {
                throw new MyIOException("Valor inválido para EnumFaixaEtaria: " + faixaEtariaStr);
            }
        } else if (node.isNumber()) {
            int faixaEtariaInt = node.asInt();
            try {
                return EnumFaixaEtaria.values()[faixaEtariaInt];
            } catch (ArrayIndexOutOfBoundsException e) {
                throw new MyIOException("Valor inválido para EnumFaixaEtaria: " + faixaEtariaInt);
            }
        } else {
            throw new MyIOException("Valor inválido para EnumFaixaEtaria: " + node);
        }
    }
}
