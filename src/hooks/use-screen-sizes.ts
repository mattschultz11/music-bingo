import { useMediaQuery } from "@uidotdev/usehooks";
import { useMemo } from "react";

function useScreenSizes() {
  const xs = useMediaQuery("only screen and (min-width : 520px)");
  const sm = useMediaQuery("only screen and (min-width : 768px)");
  const md = useMediaQuery("only screen and (min-width : 1024px)");
  const lg = useMediaQuery("only screen and (min-width : 1280px)");
  const xl = useMediaQuery("only screen and (min-width : 1640px)");

  return useMemo(() => {
    return { xs, sm, md, lg, xl } as const;
  }, [xs, sm, md, lg, xl]);
}

export { useScreenSizes };
