// Remove acentos/diacríticos. Usado SÓ no texto exibido nos pesos Expanded
// da Base Neue, cujos glifos acentuados (é, ó, ã…) saem malformados. O dado
// original (em artist-data) permanece acentuado e correto para metadados,
// alt text e textos renderizados nas larguras Regular/Condensed.
export function stripAccents(input: string): string {
  return input.normalize("NFD").replace(/\p{Diacritic}/gu, "");
}
