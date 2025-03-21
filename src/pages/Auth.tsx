import { Flex } from "@radix-ui/themes";
import { Option } from "effect";
import { useContext } from "react";

import { LoginButton } from "../components/LoginButton";
import { LogoutButton } from "../components/LogoutButton";
import { AuthProviderContext } from "../context/AuthProviderContext";
import { SessionContext } from "../context/SessionContext";

import { AUTH_PROVIDERS } from "../config/providers.config";

function Auth() {
  const { provider } = useContext(AuthProviderContext);
  const { isAuthenticated } = useContext(SessionContext);

  return (
    <Flex gap="4" justify="center" align="center" wrap="wrap">
      {isAuthenticated ? (
        <LogoutButton provider={Option.getOrThrow(provider)} />
      ) : (
        AUTH_PROVIDERS.map((provider) => (
          <LoginButton key={provider.id} provider={provider} />
        ))
      )}
    </Flex>
  );
}

export { Auth };
