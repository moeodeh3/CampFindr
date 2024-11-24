export const formatHtmlToSections = (
  html: string
): { heading: string; content: string }[] => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const paragraphs = doc.body.querySelectorAll('p');
  const sections: { heading: string; content: string }[] = [];

  paragraphs.forEach((paragraph) => {
    const boldElement = paragraph.querySelector('b');
    if (boldElement) {
      const heading = boldElement.textContent?.trim() || '';
      const content = paragraph.textContent?.replace(heading, '').trim() || '';
      sections.push({ heading, content });
    } else {
      const content = paragraph.textContent?.trim() || '';
      sections.push({ heading: '', content });
    }
  });

  if (sections.length === 0 && doc.body.textContent) {
    sections.push({ heading: '', content: doc.body.textContent.trim() });
  }

  return sections;
};
