export function capitalizeFirstLetter(string) {
  if (!string) return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function cleanString(input) {
  // Tüm satır sonlarını kaldır ve iki veya daha fazla boşluğu tek boşluğa indir
  return input.replace(/\s+/g, ' ').trim();
}
