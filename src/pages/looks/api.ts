import { LOOKS_DATA, type Look } from "@/mocks/looks.mock";

// временный mock, потом заменится на fetch()
export function fetchLooksByHashtag(query: string): Promise<Look[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!query.trim()) {
        resolve(LOOKS_DATA);
        return;
      }

      const q = query.toLowerCase();

      resolve(
        LOOKS_DATA.filter((look) =>
          look.hashtags?.some((tag) => tag.toLowerCase().includes(q))
        )
      );
    }, 500);
  });
}
