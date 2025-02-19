import { css } from "@emotion/css";
import { InputEl } from "components/common/Input";
import LoadingSpinner from "components/common/LoadingSpinner";
import { bp } from "../../constants";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import api from "services/api";
import Background from "components/common/Background";

const HeaderSearch: React.FC = () => {
  const { t } = useTranslation("translation", { keyPrefix: "headerSearch" });

  const [searchValue, setSearchValue] = React.useState("");
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState<Artist[]>([]);

  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
    },
    []
  );

  const searchCallback = React.useCallback(async (searchString: string) => {
    if (searchString && searchString.length > 1) {
      setShowSuggestions(true);
      setIsSearching(true);
      const results = await api.getMany<Artist>(`artists`, {
        name: searchString,
      });
      setSearchResults(results.results);
      setIsSearching(false);
    } else {
      setSearchResults([]);
      setShowSuggestions(false);
    }
  }, []);

  React.useEffect(() => {
    searchCallback(searchValue);
  }, [searchCallback, searchValue]);

  return (
    <div
      className={css`
        position: relative;
        margin-right: 1rem;
      `}
    >
      <InputEl
        name="search"
        value={searchValue}
        placeholder="Search artists"
        onChange={onChange}
        className={css`
          margin-bottom: 0 !important;
          border: 1px solid var(--mi-lighter-foreground-color)

          &::placeholder {
            color: white;
          }
        `}
      />
      {showSuggestions && (
        <>
          <Background
            onClick={() => {
              setShowSuggestions(false);
              setSearchValue("");
            }}
          />
          <div
            className={css`
              position: absolute;
              padding: 1rem;
              background: var(--mi-normal-background-color);
              width: 100%;
              z-index: 12;

              @media (max-width: ${bp.small}px) {
                position: fixed;
                left: 0;
                margin-top: 1rem;
              }
            `}
          >
            {t("searchSuggestions")}
            {isSearching && <LoadingSpinner />}
            {!isSearching && searchResults.length > 0 && (
              <ol
                className={css`
                  list-style: none;
                  margin-top: 1rem;
                `}
              >
                {searchResults.map((r) => (
                  <li key={r.id}>
                    <Link to={`/${r.id}`}>{r.name}</Link>
                  </li>
                ))}
              </ol>
            )}
            {!isSearching && searchResults.length === 0 && (
              <>{t("noResults")}</>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default HeaderSearch;
