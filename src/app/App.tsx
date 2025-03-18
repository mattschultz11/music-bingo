import { Flex } from "@radix-ui/themes";

import { AppRoutes } from "./AppRoutes";
import { Header } from "./Header";
import { Main } from "./Main";
import { Providers } from "./Providers";

function App() {
  return (
    <Providers>
      <Flex direction="column" minHeight="100dvh">
        <Header />
        <Main>
          <AppRoutes />
        </Main>
      </Flex>
    </Providers>
  );
}

export { App };
