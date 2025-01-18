import { useState } from "react";
import "../../styles/dashboard.scss";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  onViewChange?: (view: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search",
  onSearch,
  onViewChange,
}) => {
    const [activeButton, setActiveButton] = useState<string>("grid"); 
    const [searchValue, setSearchValue] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    if (onSearch) {
      onSearch(value); 
    }
  };

  const handleButtonClick = (button: string) => {
    setActiveButton(button);
    if (onViewChange) {
        onViewChange(button); // Notify parent of view change
      }
  };

  return (
    <div className="searchbar-container">
      <div className="d-search-bar">
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={searchValue}
          onChange={handleSearch}
        />
        <button className="search-icon">
          <img src="/search-icon.svg" alt="" />
        </button>
      </div>
      <div className="views-icons-container">
        <button
          className={`grid-icon ${activeButton === "grid" ? "active" : ""}`}
          onClick={() => handleButtonClick("grid")}
        >
          <img src="/grid-icon.svg" alt="grid-icon" width={12} />
        </button>
        <button
          className={`list-icon ${activeButton === "list" ? "active" : ""}`}
          onClick={() => handleButtonClick("list")}
        >
          <img src="/list-icon.svg" alt="list-icon" width={17} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
