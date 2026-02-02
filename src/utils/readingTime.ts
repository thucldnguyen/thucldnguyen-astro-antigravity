export function getReadingTime(text: string | undefined): string {
    if (!text) return "1 min read";
    const wordsPerMinute = 200;
    const numberOfWords = text.split(/\s/g).length;
    const minutes = numberOfWords / wordsPerMinute;
    const readTime = Math.ceil(minutes);
    return `${readTime} min read`;
}
