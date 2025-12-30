export const formatDotPrice = (price: number) => {
  return new Intl.NumberFormat("ru-RU").format(price).replace(/\s/g, ".");
};

// пример "76.300"
// formatDotPrice(76300);

export const formatSpacePrice = (price: number) => {
  return new Intl.NumberFormat("ru-RU").format(price);
};

// пример "76 000"
// formatSpacePrice(76000);
