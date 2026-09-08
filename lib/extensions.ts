export const CATEGORY_EXTENSION: Record<string, string> = {
  tools: ".tool",
  sites: ".site",
  social: ".link",
};

export function extensionFor(categoryId: string): string {
  return CATEGORY_EXTENSION[categoryId] ?? ".link";
}
