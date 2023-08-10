export function tagFiltration(filterOptions) {
  const filters = {};
  for (let [key, value] of Object.entries(filterOptions)) {
    filters[key] = { contains: value };
  }

  return filters;
}
