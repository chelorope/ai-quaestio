export {};

declare global {
  interface Navigator {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    msSaveBlob?: (blob: any, defaultName?: string) => boolean;
    msSaveOrOpenBlob: boolean;
  }
}
