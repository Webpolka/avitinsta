export function formatCountRu(num: number) {
  const formatter = new Intl.NumberFormat("ru-RU", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1,
  });

  return formatter
    .format(num)
    .replace("тыс.", " к")
    .replace("млн", " млн")
    .replace("млрд", " млрд");
}
