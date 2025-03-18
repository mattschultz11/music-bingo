import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";

import { App } from "../../src/app/App";

describe("App", () => {
  test("renders", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Music Bingo Generator",
    );
  });
});
