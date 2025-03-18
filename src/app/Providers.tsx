import { Theme } from "@radix-ui/themes";
import { useLocalStorage } from "@uidotdev/usehooks";
import { PropsWithChildren } from "react";

import { AuthProvider } from "../context/AuthContext";

import "@radix-ui/themes/styles.css";

function Providers(props: PropsWithChildren) {
  const { children } = props;
  const [theme] = useLocalStorage<"light" | "dark">("theme", "light");

  return (
    <Theme appearance={theme}>
      <AuthProvider>{children}</AuthProvider>
    </Theme>
  );
}

export { Providers };
