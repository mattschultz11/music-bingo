import { IconButton } from "@radix-ui/themes";
import { IconMoonStars, IconSunFilled } from "@tabler/icons-react";
import { useLocalStorage } from "@uidotdev/usehooks";

function ThemeButton() {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  return theme === "light" ? (
    <IconButton variant="ghost" color="gray" onClick={() => setTheme("dark")}>
      <IconSunFilled />
    </IconButton>
  ) : (
    <IconButton variant="ghost" color="gray" onClick={() => setTheme("light")}>
      <IconMoonStars />
    </IconButton>
  );
}

export { ThemeButton };
