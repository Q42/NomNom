declare module 'react-native-receive-sharing-intent' {
  export function getReceivedFiles(
    handler: (files: any) => void,
    errorHandler: (error: Error) => void,
  ): void;
  export function clearReceivedFiles(): void;
}
