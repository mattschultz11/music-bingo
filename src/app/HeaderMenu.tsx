import { DropdownMenu, Flex, IconButton } from "@radix-ui/themes";
import { IconMenu2, IconMoonStars, IconSunFilled } from "@tabler/icons-react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Option } from "effect";
import { useContext } from "react";
import { NavLink } from "react-router";

import { AuthContext } from "../context/AuthContext";

function HeaderMenu() {
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton variant="ghost" color="gray">
          <IconMenu2 />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {Option.getOrElse(isAuthenticated, () => false) && (
          <>
            <DropdownMenu.Item asChild>
              <NavLink to="/playlist">Playlist</NavLink>
            </DropdownMenu.Item>
            <DropdownMenu.Item asChild>
              <NavLink to="/bingo">Bingo</NavLink>
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item asChild>
              <NavLink to="/logout" onClick={() => logout()}>
                Logout
              </NavLink>
            </DropdownMenu.Item>
          </>
        )}
        {theme === "light" ? (
          <Flex asChild align="center" justify="center">
            <DropdownMenu.Item onClick={() => setTheme("dark")}>
              <IconMoonStars />
            </DropdownMenu.Item>
          </Flex>
        ) : (
          <Flex asChild align="center" justify="center">
            <DropdownMenu.Item onClick={() => setTheme("light")}>
              <IconSunFilled />
            </DropdownMenu.Item>
          </Flex>
        )}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export { HeaderMenu };
