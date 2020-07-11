declare module 'page-metadata-parser' {
  export interface IPageMetadata {
    description?: string;
    icon: string;
    image?: string;
    keywords?: string[];
    title?: string;
    language?: string;
    type?: string;
    url: string;
    provider: string;
  }

  export type PageMetadataRule = [string, (el: HTMLElement) => string | null];

  export function getMetadata(
    doc: Document | HTMLElement,
    url: string,
    customRuleSets?: Record<string, PageMetadataRule>,
  ): IPageMetadata;
}
