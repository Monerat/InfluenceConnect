package br.com.influence.influence.deserializer;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import br.com.influence.influence.model.Enum.EnumTipoUsuario;
import br.com.influence.influence.model.exceptions.MyIOException;

import java.io.IOException;

public class EnumTipoUsuarioDeserializer extends JsonDeserializer<EnumTipoUsuario> {

    @Override
    public EnumTipoUsuario deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
        JsonNode node = jsonParser.getCodec().readTree(jsonParser);

        if (node.isTextual()) {
            String tipoUsuarioStr = node.asText();
            try {
                return EnumTipoUsuario.valueOf(tipoUsuarioStr.toUpperCase());
            } catch (IllegalArgumentException e) {
                throw new MyIOException("Valor inválido para EnumTipoUsuario: " + tipoUsuarioStr);
            }
        } else if (node.isNumber()) {
            int tipoUsuarioInt = node.asInt();
            try {
                return EnumTipoUsuario.values()[tipoUsuarioInt];
            } catch (ArrayIndexOutOfBoundsException e) {
                throw new MyIOException("Valor inválido para EnumTipoUsuario: " + tipoUsuarioInt);
            }
        } else {
            throw new MyIOException("Valor inválido para EnumTipoUsuario: " + node);
        }
    }
}
