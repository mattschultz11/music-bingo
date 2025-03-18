import { Container } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

function Main(props: PropsWithChildren) {
  const { children } = props;

  return (
    <Container asChild p="4">
      <main>{children}</main>
    </Container>
  );
}

export { Main };
