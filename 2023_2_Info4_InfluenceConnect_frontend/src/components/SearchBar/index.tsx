import React, { useContext } from "react";
import { Input, Button, ContainerInput } from "./styles";
import { Search } from "lucide-react";
import { ThemeContext } from "../../context/themeContext";

interface SearchBarProps {
  labelButton: string
  labelInput: string
  onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, labelButton, labelInput }) => {

  const { darkMode } = useContext(ThemeContext);
  const [query, setQuery] = React.useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <ContainerInput>
      <label htmlFor="searchInput" className="visually-hidden">
        {labelInput}
      </label>
      <Input
        id="searchInput"
        aria-label={labelInput}
        $darkMode={darkMode}
        type="text"
        placeholder="Pesquisar..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <Button aria-label={labelButton} $darkMode={darkMode} onClick={handleSearch}>
        <Search aria-label="Icone Pesquisa" size={20} />
      </Button>
    </ContainerInput>
  );
};