// Joins class names, dropping falsy values.
export function cn(...inputs) {
  return inputs.flat(Infinity).filter(Boolean).join(" ");
}