import React, { useState } from "react";
import "./GithubAutocomplete.scss";
import {
  fetchGithubRepositoryByName,
  fetchGithubUsersByName,
  GithubResponse,
  GithubRepoItem,
  GithubUserItem,
} from "../../helpers/fetches";
import Autocomplete, { AutocompleteItem } from "../Autocomplete/Autocomplete";
import RepoIcon from "../common/RepoIcon/RepoIcon";

const GithubAutocomplete = () => {
  const [inputValue, setInputValue] = useState("");
  const [valuesToDisplay, setValuesToDisplay] = useState<
    Array<AutocompleteItem>
  >();
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  const handleInputChange = async (text: string) => {
    setInputValue(text);
    setError(false);
    setLoading(true);
    try {
      if (text.length >= 3) {
        const fetchedRepos = await fetchGithubRepositoryByName(text, 1, 50);
        const fetchedUsers = await fetchGithubUsersByName(text, 1, 50);
        const fetchedReposParsed: Array<AutocompleteItem> = fetchedRepos.items.map(
          (_repoItem: GithubRepoItem) => {
            return {
              id: _repoItem.id,
              title: _repoItem.full_name,
              subtitle: _repoItem.description,
              icon: <RepoIcon />,
              url: _repoItem.html_url,
            };
          }
        );
        const fetchedUsersParsed: Array<AutocompleteItem> = fetchedUsers.items.map(
          (_userItem: GithubUserItem) => {
            return {
              id: _userItem.id,
              title: _userItem.login,
              subtitle: "Github user",
              icon: (
                <img
                  className="github-autocomplete__userImage"
                  src={_userItem.avatar_url}
                />
              ),
              url: _userItem.html_url,
            };
          }
        );
        setValuesToDisplay(
          fetchedReposParsed
            .concat(fetchedUsersParsed)
            .sort((a, b) =>
              a.title.toLowerCase().localeCompare(b.title.toLowerCase())
            )
            .slice(0, 50)
        );
      }
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="github-autocomplete">
        <Autocomplete
          value={inputValue}
          onChange={handleInputChange}
          items={valuesToDisplay}
          isLoading={isLoading}
          isError={isError}
        />
    </div>
  );
};

export default GithubAutocomplete;
