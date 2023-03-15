export default function arrayModifier(ids: number[]): string {
  const idString = ids.join(",");
  const formattedIds = `(${idString})`;
  return formattedIds;
}
