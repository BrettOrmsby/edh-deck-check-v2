export default function (cardName: string): string {
  return (
    cardName
      .trim()
      .toLowerCase()
      // Commander spellbook only used the first part of a card
      .split(/ \/\/? /)[0]
      // inconsistent punctuation
      .replace(/[^\w\s]/g, "")
  );
}
