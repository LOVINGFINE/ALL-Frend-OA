export const mapInsertFirstKey = (
  map: { [key: string]: string },
  key: string
): { [key: string]: string } => {
  const dataMaps: { [key: string]: string } = {};
  for (const name in map) {
    dataMaps[`${key}-${name}`] = map[name];
  }
  return dataMaps;
};
