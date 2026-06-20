export function initSearching(searchField) {
  return (query, state) => {
    return state[searchField]
      ? {
          ...query,
          search: state[searchField],
        }
      : query;
  };
}
