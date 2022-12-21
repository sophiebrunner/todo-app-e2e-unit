/// <reference types="jest" />

import { isDuplicate } from "./src/lib";

test("isDuplicate should return true when todo is already in todo list", () => {
  const result = isDuplicate(["eat", "sleep", "code", "repeat"], "eat");
  expect(result).toBe(true);
});
test("isDuplicate should return false when todo is not yet in todo list", () => {
  const result = isDuplicate(["eat", "sleep", "repeat"], "code");
  expect(result).toBe(false);
});
test("isDuplicate ignores casing", () => {
  const result = isDuplicate(["Eat", "sleep", "code", "repeat"], "Eat");
  expect(result).toBe(true);
});
