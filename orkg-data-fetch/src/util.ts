export function localName(iriOrText: string): string {
  try {
    const u = new URL(iriOrText);
    const last = u.pathname.split(/[\\/]/).filter(Boolean).pop();
    return last ?? iriOrText;
  } catch {
    const m = iriOrText.match(/[^#\\/]+$/);
    return m ? m[0] : iriOrText;
  }
}

export function toSlugId(input: string): string {
  const s = input
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return s || fnv1a32Hex(input);
}

// FNV-1a 32-bit hex
export function fnv1a32Hex(str: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = (h >>> 0) * 0x01000193;
  }
  return (h >>> 0).toString(16);
}

export const norm = (s: string) =>
  s.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, ' ').trim();
