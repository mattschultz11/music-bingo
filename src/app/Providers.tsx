import { Theme } from "@radix-ui/themes";
import { useLocalStorage } from "@uidotdev/usehooks";
import { PropsWithChildren } from "react";

import { AuthProviderProvider } from "../context/AuthProviderContext";
import { SessionProvider } from "../context/SessionContext";

function Providers(props: PropsWithChildren) {
  const { children } = props;
  const [theme] = useLocalStorage<"light" | "dark">("theme", "light");

  return (
    <Theme appearance={theme}>
      <AuthProviderProvider>
        <SessionProvider>{children}</SessionProvider>
      </AuthProviderProvider>
    </Theme>
  );
}

export { Providers };
