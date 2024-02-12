import { containsKanji } from "../src/modules/characterChecker.ts";
import { assertEquals } from "https://deno.land/std/assert/assert_equals.ts";

Deno.test("containsKanji should return true when the string contains kanji", () => {
  const str = "今日はいい天気ですね。";
  const result = containsKanji(str);

  assertEquals(result, true);
});

Deno.test("containsKanji should return false when the string does not contain kanji", () => {
  const str = "こんにちは。";
  const result = containsKanji(str);

  assertEquals(result, false);
});

Deno.test("containsKanji should return false for an empty string", () => {
  const str = "";
  const result = containsKanji(str);

  assertEquals(result, false);
});
