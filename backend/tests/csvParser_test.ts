import { assertEquals } from "https://deno.land/std@0.107.0/testing/asserts.ts";
import { csvToFlatArray } from "../src/modules/csvParser.ts";

Deno.test("csvToFlatArray should return an array", async () => {
  const result = await csvToFlatArray("./data/test.csv");
  assertEquals(Array.isArray(result), true);
});

Deno.test("csvToFlatArray should return a one-dimensional array", async () => {
  const result = await csvToFlatArray("./data/test.csv");
  const isOneDimensional = result.every((item) => typeof item === "string");
  assertEquals(isOneDimensional, true);
});

Deno.test("csvToFlatArray should exclude empty cells", async () => {
  const result = await csvToFlatArray("./data/test.csv");
  const hasEmptyCells = result.some((cell) => cell === "");
  assertEquals(hasEmptyCells, false);
});
