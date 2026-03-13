const READING_SPEED_WPM = 235;
const IMAGE_READING_SECONDS = 12;
const CODE_BLOCK_PENALTY_PER_10_LINES = 8;

export function readingTime(text: string) {
  if (!text || typeof text !== 'string') return '0 min read';

  const wordCount =
    text
      .replace(/<[^>]*>/g, ' ')
      .replace(/```[\s\S]*?```/g, match => {
        const lines = match.split('\n').length;
        return ' '.repeat((lines / 10) * CODE_BLOCK_PENALTY_PER_10_LINES * 5);
      })
      .replace(/!\[.*?\]\(.*?\)/g, ' img ')
      .match(/\w+/g)?.length || 0;

  const imageCount = (text.match(/!\[.*?\]\(.*?\)/g) || []).length;

  const wordsSeconds = (wordCount / READING_SPEED_WPM) * 60;
  const imagesSeconds = imageCount * IMAGE_READING_SECONDS;
  const totalSeconds = Math.ceil(wordsSeconds + imagesSeconds);

  const minutes = Math.round(totalSeconds / 60);
  return minutes;
}
