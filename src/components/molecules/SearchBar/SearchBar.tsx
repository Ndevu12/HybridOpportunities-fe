import React, { useState } from "react";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";
import Icon from "../../atoms/Icon/Icon";

interface SearchBarProps {
  onSearch: (term: string) => void;
  placeholder?: string;
  initialValue?: string;
  variant?: "default" | "large";
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Search...",
  initialValue = "",
  variant = "default",
}) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm.trim());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const isLarge = variant === "large";

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-center w-full rounded-full overflow-hidden ${
        isLarge ? "shadow-lg" : "shadow-sm"
      }`}
    >
      <div className="relative flex items-center w-full">
        <div
          className={`absolute left-0 flex items-center justify-center ${isLarge ? "pl-6" : "pl-4"}`}
        >
          <Icon
            name="search"
            color="textSecondary"
            size={isLarge ? "md" : "sm"}
          />
        </div>

        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full bg-white border-0 ${
            isLarge ? "py-4 pl-16 pr-4 text-lg" : "py-2 pl-12 pr-4"
          } focus:ring-2 focus:ring-blue-500 focus:outline-none`}
          aria-label="Search"
        />

        <div className="absolute right-0 mr-2">
          <Button
            type="submit"
            variant="primary"
            size={isLarge ? "lg" : "md"}
            className={`rounded-full ${isLarge ? "px-8" : "px-5"}`}
          >
            Search
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
