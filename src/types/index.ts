export interface IBookmark {
  id: string;
  title: string;
  url: string;
  favicon?: string;
}

export interface ICollection {
  id: string;
  title: string;
  bookmarks: IBookmark[];
}

export type TButtonType = "button" | "submit" | "reset" | undefined;
