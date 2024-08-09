import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import App from "../App";

test("displays a top-level heading with the text `Hi, I'm _______`", () => {
  render(<App />);

  const topLevelHeading = screen.getByRole("heading", {
    name: /hi, i'm/i,
    exact: false,
    level: 1,
  });

  expect(topLevelHeading).toBeInTheDocument();
});

test("displays an image of yourself", () => {
  render(<App />);

  const image = screen.getByAltText("My profile pic");

  expect(image).toHaveAttribute("src");
});

test("displays second-level heading with the text `About Me`", () => {
  render(<App />);

  const secondLevelHeading = screen.getByRole("heading", {
    name: /about me/i,
    level: 2,
  });

  expect(secondLevelHeading).toBeInTheDocument();
});

test("displays a paragraph for your biography", () => {
  render(<App />);

  const bio = screen.getByText(/I'm a highly advanced/i);

  expect(bio).toBeInTheDocument();
});

test("displays the correct links", () => {
  render(<App />);

  const githubLink = screen.getByRole("link", {
    name: /github/i,
  });
  const linkedinLink = screen.getByRole("link", {
    name: /linkedin/i,
  });

  expect(githubLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://github.com/Bethwel123")
  );

  expect(linkedinLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://linkedin.com/in/bethwel-langat-3b7b97312")
  );
});

test("the form includes text inputs for name and email address", () => {
  render(<App />);
  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });
  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
});

test("the form includes three checkboxes to select areas of interest", () => {
  render(<App />);
  const checkboxes = screen.getAllByRole("checkbox");
  expect(checkboxes).toHaveLength(3);
});

test("the checkboxes are initially unchecked", () => {
  render(<App />);
  const checkboxes = screen.getAllByRole("checkbox");
  checkboxes.forEach((checkbox) => expect(checkbox).not.toBeChecked());
});

test("the page shows information the user types into the name and email address form fields", () => {
  render(<App />);
  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });
  userEvent.type(nameInput, "John Doe");
  userEvent.type(emailInput, "john@example.com");
  expect(nameInput).toHaveValue("John Doe");
  expect(emailInput).toHaveValue("john@example.com");
});

test("checked status of checkboxes changes when user clicks them", () => {
  render(<App />);
  const checkboxes = screen.getAllByRole("checkbox");
  checkboxes.forEach((checkbox) => {
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});

test("a message is displayed when the user clicks the Submit button", async () => {
  render(<App />);
  const submitButton = screen.getByRole("button", { name: /submit/i });
  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });

  await userEvent.type(nameInput, "John Doe");
  await userEvent.type(emailInput, "john@example.com");
  await userEvent.click(submitButton);

  const message = screen.getByText(/thank you for signing up, john doe!/i);
  expect(message).toBeInTheDocument();
});
