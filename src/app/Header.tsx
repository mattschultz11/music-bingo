import { Button, Flex, Grid, Separator } from "@radix-ui/themes";
import { useContext } from "react";

import { SessionContext } from "../context/SessionContext";
import { useScreenSizes } from "../hooks/use-screen-sizes";
import { HeaderMenu } from "./HeaderMenu";
import { HomeLink, NavLinks } from "./NavLinks";
import { ThemeButton } from "./ThemeButton";

function Header() {
  const { sm } = useScreenSizes();

  return (
    <Flex
      direction="column"
      className="sticky top-0 z-10"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      {sm ? <HeaderSM /> : <HeaderXS />}
      <Separator size="4" />
    </Flex>
  );
}

function HeaderSM() {
  const { isAuthenticated, logout } = useContext(SessionContext);

  return (
    <Grid asChild columns="1fr auto 1fr" align="center" px="4">
      <header>
        <Flex justify="start">
          <HomeLink />
        </Flex>
        <div>{isAuthenticated && <NavLinks />}</div>
        <Flex align="center" justify="end" gap="4">
          {isAuthenticated && (
            <Button variant="outline" color="gray" onClick={() => logout()}>
              Logout
            </Button>
          )}
          <ThemeButton />
        </Flex>
      </header>
    </Grid>
  );
}

function HeaderXS() {
  return (
    <Flex asChild align="center" justify="between" px="4">
      <header>
        <HomeLink />
        <HeaderMenu />
      </header>
    </Flex>
  );
}

export { Header };
