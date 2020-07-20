import React, { useState, ReactNode, useEffect } from "react";
import "./Autocomplete.scss";
import TextInput from "../common/TextInput/TextInput";
import LoadingIcon from "../common/LoadingIcon/LoadingIcon";

export interface AutocompleteItem {
  id: number;
  title: string;
  subtitle: string;
  icon: ReactNode;
  url: string;
}

interface AutocompleteContentProps {
  isLoading: boolean;
  isError: boolean;
  isDataValid: boolean;
  isEmpty: boolean;
  items: Array<AutocompleteItem>;
}

const AutocompleteContent = ({
  isLoading,
  isError,
  isDataValid,
  isEmpty,
  items
}: AutocompleteContentProps) => {
  if (isDataValid) {
    return (
      <>
        {items.map((_item: AutocompleteItem, _index: number) => (
          <a
            href={_item.url}
            target="none"
            className="autocomplete-items__listing"
            key={_item.title}
            data-testid="autocomplete-listing"
          >
            <p className="autocomplete-items__title">
              <span className="autocomplete-items__icon">{_item.icon}</span>
              {_item.title}
            </p>
            <p className="autocomplete-items__subtitle">{_item.subtitle}</p>
          </a>
        ))}
      </>
    );
  } else if (isLoading) {
    return <LoadingIcon />;
  } else if (isError) {
    return (
      <article className="autocomplete-items__info">
        <h4 className="autocomplete-items__info-error">
          Oops, something went wrong
        </h4>
      </article>
    );
  } else if (isEmpty) {
    return (
      <article className="autocomplete-items__info">
        <h4 className="autocomplete-items__info-empty">
          There were no results
        </h4>
      </article>
    );
  } else {
    return (
      <article className="autocomplete-items__info" data-testid="autocomplete-error">
        <h4 className="autocomplete-items__info-error">
          Oops, something went terribly wrong
        </h4>
      </article>
    );
  }
};

export interface AutocompleteProps {
  className?: string;
  onChange: (value: string) => void;
  value: string;
  items: Array<AutocompleteItem>;
  isLoading?: boolean;
  showThreshold?: number;
  isError?: boolean;
}

const Autocomplete = ({
  className = "",
  onChange,
  value,
  items = [{} as AutocompleteItem],
  isLoading = false,
  showThreshold = 3,
  isError = false,
}: AutocompleteProps) => {
  const [isShown, setShown] = useState(false);

  useEffect(() => {
  }, [])

  const handleInputChange = (inputText: string) => {
    onChange(inputText);
    inputText.length >= showThreshold ? setShown(true) : setShown(false);
  };

  const isDataValid = !isLoading && !isError && isShown && items.length >= 0;

  return (
    <div className={`autocomplete-wrapper ${className}`} data-testid="autocomplete-component">
      <TextInput
        className={`autocomplete-input`}
        onChange={handleInputChange}
        value={value}
      />
      <ul
        className={`autocomplete-items ${
          isLoading || isError || items.length === 0 ? "autocomplete-info" : ""
        } ${!isShown ? "autocomplete-hidden" : ""}`}
        data-testid="autocomplete-itemlist"
      >
        <AutocompleteContent
          isLoading={isLoading}
          isError={isError}
          isDataValid={isDataValid}
          isEmpty={items.length === 0 && !isError}
          items={items}
        />
      </ul>
    </div>
  );
};

export default Autocomplete;
