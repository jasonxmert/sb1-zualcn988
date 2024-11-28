export function getWikipediaUrl(landmarkName: string): string {
  // Replace spaces with underscores and encode special characters
  const formattedName = landmarkName
    .replace(/ /g, '_')
    .replace(/'/g, '%27');
  
  return `https://en.wikipedia.org/wiki/${formattedName}`;
}