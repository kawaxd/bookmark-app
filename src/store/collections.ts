import { defineStore } from "pinia";

import { ICollection, IBookmark } from "@/types";
import generateUUID from "@/utils/generateUUID";

import { ref } from "vue";
import fetchFavicon from "@/utils/fetchFavicon";

export const useCollections = defineStore("collections", {
  state: () => ({
    collections: ref<ICollection[]>([]),
  }),
  persist: true,

  getters: {
    getCollections: (state) => state.collections,

    getCollectionById: (state) => (id: string) =>
      state.collections.find((collection) => collection.id === id),
  },

  actions: {
    async createCollection(title: string, id: string) {
      this.collections.push({ title, id, bookmarks: [] });
    },

    async deleteCollection(collectionId: string) {
      const indexToDelete = this.collections.findIndex(
        (collection) => collection.id === collectionId
      );

      if (indexToDelete !== -1) {
        this.collections.splice(indexToDelete, 1);
      }
    },

    async addBookmark(collectionId: string, bookmark: IBookmark) {
      const collection = this.getCollectionById(collectionId);
      if (collection) {
        collection.bookmarks.push(bookmark);
      }
    },

    async moveBookmarks(collectionId: string, newBookmarks: IBookmark[]) {
      const collection = this.getCollectionById(collectionId);
      if (collection) {
        collection.bookmarks = newBookmarks;
      }
    },

    async editBookmark(
      collectionId: string,
      bookmarkId: string,
      updatedBookmark: IBookmark
    ) {
      const collection = this.getCollectionById(collectionId);
      if (collection) {
        const bookmarkIndex = collection.bookmarks.findIndex(
          (bookmark) => bookmark.id === bookmarkId
        );
        if (bookmarkIndex !== -1) {
          collection.bookmarks[bookmarkIndex] = updatedBookmark;
        }
      }
    },

    async removeBookmark(collectionId: string, bookmarkId: string) {
      const collection = this.getCollectionById(collectionId);
      if (collection) {
        const bookmarkIndex = collection.bookmarks.findIndex(
          (bookmark) => bookmark.id === bookmarkId
        );
        if (bookmarkIndex !== -1) {
          collection.bookmarks.splice(bookmarkIndex, 1);
        }
      }
    },

    async importOPML(opmlCode: string, collectionTitle?: string) {
      try {
        const parser = new DOMParser();
        const opmlDoc = parser.parseFromString(opmlCode, "text/xml");
        const outlines = opmlDoc.getElementsByTagName("outline");

        if (outlines.length === 0) {
          throw new Error("No valid outlines found in the OPML code.");
        }

        const bookmarks: IBookmark[] = [];
        for (let i = 0; i < outlines.length; i++) {
          const outline = outlines[i];
          const title = outline.getAttribute("text");
          const url = outline.getAttribute("url");

          if (title && url) {
            const favicon = await fetchFavicon(url);

            bookmarks.push({
              id: generateUUID(),
              title,
              url,
              favicon,
            });
          }
        }
        console.log(bookmarks);
        if (bookmarks.length > 0) {
          const collectionId = generateUUID();
          const newTitle = collectionTitle ?? "Imported Collection";
          await this.createCollection(newTitle, collectionId);
          (
            this.collections.find(
              (col) => col.id === collectionId
            ) as ICollection
          ).bookmarks = bookmarks;
        }
      } catch (error) {
        console.error("Error importing OPML:", error);
        throw error;
      }
    },

    async exportToOPML(collectionId: string) {
      const collection = this.getCollectionById(collectionId);
      if (collection) {
        // parse bookmarks into OPML
        const opml = `<?xml version="1.0" encoding="UTF-8"?>` + "\n";
        const head = `<opml version="1.0">` + "\n";
        const body = `<body>` + "\n";
        const outline = collection.bookmarks
          .map(
            (bookmark) =>
              `<outline text="${bookmark.title}" url="${bookmark.url}" />` +
              "\n"
          )
          .join("");
        const end = `</body>` + "\n" + `</opml>`;
        const opmlString = opml + head + body + outline + end;

        // download OPML file
        const blob = new Blob([opmlString], { type: "text/xml" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${collection.title}.opml`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    },
  },
});
