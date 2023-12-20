package br.com.influence.influence.deserializer;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;

import br.com.influence.influence.model.exceptions.MyIOException;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateDeserializer extends JsonDeserializer<Date> {

    private final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd"); 

    @Override
    public Date deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
        String fieldName = jsonParser.getCurrentName();

        try {
            JsonNode node = jsonParser.getCodec().readTree(jsonParser);
            String stringValue = node.asText();

            if (!verificarValorString(stringValue)) {
                throw new IllegalArgumentException("A string não representa uma data válida");
            }

            return dateFormat.parse(stringValue);
        } catch (ParseException | IllegalArgumentException e) {
            throw new MyIOException("Erro ao desserializar o campo '" + fieldName + "', porque o mesmo não representa uma data válida! O formato correto é: yyyy-MM-dd");
        }
    }

    public boolean verificarValorString(String str) {
        try {
            dateFormat.parse(str);
            return true;
        } catch (ParseException e) {
            return false;
        }
    }
}