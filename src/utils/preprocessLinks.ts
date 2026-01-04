export function preprocessLinks(text: string): string {
  return text.replace(
    /(?<!https?:\/\/)(?:(?:www\.)?github\.com\/[^\s]+|linkedin\.com\/[^\s]+)/gi,
    (match) => {
      return `https://${match}`;
    }
  );
}
