import React, { useContext } from 'react';
import { Search } from 'lucide-react';
import { Button, Input } from './styles';
import { ThemeContext } from '../../context/themeContext';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = React.useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  const { darkMode } = useContext(ThemeContext);

  return (
    <>
      <Input
        type="text"
        placeholder="Pesquisar..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button $darkMode={darkMode} onClick={handleSearch}>
        <Search size={20} />
      </Button>
    </>
  );
};

export default SearchBar;
