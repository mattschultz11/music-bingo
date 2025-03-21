import { Button } from "@radix-ui/themes";
import { useContext } from "react";

import { SessionContext } from "../context/SessionContext";
import { AuthProviderConfig } from "../types/auth";

function LogoutButton(props: { provider: AuthProviderConfig }) {
  const { provider } = props;
  const { name, color, icon: Icon } = provider;
  const { logout } = useContext(SessionContext);

  return (
    <Button onClick={() => logout()} color={color} variant="outline">
      {<Icon size="24" />}
      Logout from {name}
    </Button>
  );
}

export { LogoutButton };
