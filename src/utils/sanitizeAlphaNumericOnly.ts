export default function sanitizeAlphaNumericOnly(input: string): boolean {
  return /^[a-z0-9]+$/i.test(input);
}
