import { Flex, Spinner, Text } from "@radix-ui/themes";
import { HashMap, Option } from "effect";
import { useContext, useEffect, useMemo, useState } from "react";
import { Navigate, useParams } from "react-router";

import { SessionContext } from "../context/SessionContext";

import { AUTH_PROVIDERS_BY_ID } from "../config/providers.config";

function AuthCallback() {
  const { providerId } = useParams<{ providerId: string }>();
  const { isAuthenticated, handleCallback } = useContext(SessionContext);
  const [error, setError] = useState<string | undefined>();

  const provider = useMemo(
    () => Option.getOrUndefined(HashMap.get(AUTH_PROVIDERS_BY_ID, providerId)),
    [providerId],
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const error = searchParams.get("error");
    if (!isAuthenticated && provider) {
      handleCallback(provider, { code, state, error }).catch(setError);
    }
  }, [handleCallback, provider, isAuthenticated]);

  if (error || !provider) {
    return (
      <Text color="red" size="4">
        {`${error}` || "Provider not found"}
      </Text>
    );
  }

  if (isAuthenticated) {
    return <Navigate to={{ pathname: "/", search: "" }} replace />;
  }

  return (
    <Flex align="center" justify="center" gap="2" height="100%">
      <Text>Authenticating with {provider.name} ...</Text>
      <Spinner size="3" />
    </Flex>
  );
}

export { AuthCallback };
