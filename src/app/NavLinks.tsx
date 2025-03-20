import { Button, Flex, Heading } from "@radix-ui/themes";
import { PropsWithChildren } from "react";
import { Link, NavLink, NavLinkProps } from "react-router";

function HomeLink() {
  return (
    <Flex asChild align="center" display="inline-flex">
      <Link to="/">
        <img
          src="/music-bingo/music-bingo-logo.png"
          alt="Music Bingo Generator Logo"
          className="h-12 p-2"
        />
        <Heading size="5">Music Bingo Generator</Heading>
      </Link>
    </Flex>
  );
}

function NavLinks() {
  return (
    <Flex asChild align="center" justify="center" gap="4">
      <nav>
        <NavButton to="/playlist">Playlist</NavButton>
        <NavButton to="/bingo">Bingo</NavButton>
      </nav>
    </Flex>
  );
}

function NavButton(props: PropsWithChildren<Omit<NavLinkProps, "children">>) {
  const { children, ...rest } = props;

  return (
    <NavLink {...rest}>
      {({ isActive }) => (
        <Button
          variant={isActive ? "solid" : "outline"}
          color="gray"
          radius="full"
          highContrast
          asChild
        >
          <span>{children}</span>
        </Button>
      )}
    </NavLink>
  );
}

export { HomeLink, NavLinks };
