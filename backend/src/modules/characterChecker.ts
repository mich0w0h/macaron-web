export function containsKanji(str: string): boolean {
  const regex = /[\p{Script=Han}]/gu;
  return regex.test(str);
}
