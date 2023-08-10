export function noteFiltration(filterOptions) {
  const filters = {};
  for (let [key, value] of Object.entries(filterOptions)) {
    if (key == 'tags') {
      filters[key] = { some: { tag: { title: { in: value } } } };
      continue;
    }

    if (key == 'color') {
      filters[key] = { title: { in: value } };
      continue;
    }

    filters[key] = { contains: value };
  }

  return filters;
}
