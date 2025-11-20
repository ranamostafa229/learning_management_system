import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const listeners = () => setMatches(media.matches);
    listeners(); // Check on mount and not wait for a resize change to happen
    media.addEventListener("change", listeners);
    return () => media.removeEventListener("change", listeners);
  }, [query]);
  return matches;
}
