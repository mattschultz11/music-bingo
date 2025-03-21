import { Button, Flex, Text } from "@radix-ui/themes";
import { useCallback, useContext, useState } from "react";

import { SessionContext } from "../context/SessionContext";
import { AuthProviderConfig } from "../types/auth";

function LoginButton(props: { provider: AuthProviderConfig }) {
  const { provider } = props;
  const { name, color, icon: Icon } = provider;
  const { login } = useContext(SessionContext);
  const [error, setError] = useState<string | undefined>();

  const handleLogin = useCallback(() => {
    setError(undefined);
    login(provider).catch(setError);
  }, [login, provider]);

  return (
    <Flex direction="column" gap="2">
      <Button onClick={handleLogin} color={color} variant="solid">
        <Icon size="24" />
        Login with {name}
      </Button>
      {error && (
        <Text color="red" size="2">
          {error}
        </Text>
      )}
    </Flex>
  );
}

export { LoginButton };
