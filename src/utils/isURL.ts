export default function isURL(input: string): boolean {
  try {
    new URL(input);
    return true;
  } catch (error) {
    return false;
  }
}
