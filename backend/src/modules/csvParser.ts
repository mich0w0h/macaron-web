import { parse } from "https://deno.land/std@0.107.0/encoding/csv.ts";

/**
 * Reads a CSV file and converts it into a one-dimensional array of strings.
 *
 * This function reads a CSV file from the specified file path, parses it into
 * an array of arrays of strings, then flattens this into a one-dimensional array.
 * Any empty cells in the CSV file are excluded from the resulting array.
 *
 * @param filePath - The path to the CSV file to read.
 *
 * @returns A Promise that resolves to a one-dimensional array of strings
 * representing the cells in the CSV file, excluding any empty cells.
 */
export async function csvToFlatArray(filePath: string): Promise<string[]> {
  const csvContent = await Deno.readTextFile(filePath);
  const parsedArray = (await parse(csvContent, {
    skipFirstRow: false, // Change this to true if your CSV has a header row
    separator: ",", // Change this if your CSV uses a different separator
  })) as string[][];

  // Flatten the array and filter out empty cells
  const flatArray = parsedArray.flat().filter((cell: string) => cell !== "");

  return flatArray;
}
