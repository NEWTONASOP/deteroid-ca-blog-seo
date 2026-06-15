/**
 * Converts a string into a clean, URL-friendly slug.
 * Used for generating HTML anchor IDs from headings.
 */
export const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word characters
    .replace(/\-\-+/g, '-')         // Replace multiple consecutive hyphens with a single one
    .replace(/^-+/, '')             // Trim hyphens from the start of the text
    .replace(/-+$/, '');            // Trim hyphens from the end of the text
};
