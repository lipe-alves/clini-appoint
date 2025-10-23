export function removeWhitespaces(input: string): string {
    return input.trim().replace(/\s+/g, " ");
}