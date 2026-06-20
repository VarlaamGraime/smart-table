export function initSearching(searchFields) {
  return (query, state) => {
    const search = searchFields
      .map((field) => state[field])
      .filter(Boolean)
      .join(" ");

    return search
      ? { ...query, search }
      : query;
  };
}