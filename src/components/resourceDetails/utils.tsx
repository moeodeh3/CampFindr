import he from "he";

export const getWithoutHtmlTags = (html:string) => {
    return he.decode(
        stripHtmlTags(html)
      );
}

const stripHtmlTags = (html: string) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};
