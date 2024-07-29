export const Json = {
  // deno-lint-ignore no-explicit-any
  write(text: any, space: number = 2): string {
    return JSON.stringify(text, null, space);
  },

  read(text: string): string {
    return JSON.parse(text);
  },
};
