export const fetchGithubRepositoryByName = async (
  name: string,
  page: number,
  perPage: number
) => {
  const response = await fetch(
    `https://api.github.com/search/repositories?q=${name}&page=${page}&per_page=${perPage}`
  );
  const data = await response.json();
  if (response.status >= 400) throw new Error(data.errors);
  return data;
};

export const fetchGithubUsersByName = async (
  name: string,
  page: number,
  perPage: number
) => {
  const response = await fetch(
    `https://api.github.com/search/users?q=${name}&page=${page}&per_page=${perPage}`
  );
  const data = await response.json();
  if (response.status >= 400) throw new Error(data.errors);
  return data;
};

export interface GithubRepoItem {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  description: string;
  html_url: string;
  //more data
}

export interface GithubUserItem {
  id: number;
  node_id: string;
  login: string;
  avatar_url: string;
  html_url: string;
  //more data
}

export interface GithubResponse<T> {
  total_count: number;
  incomplete_results: boolean;
  items: Array<T>;
}
