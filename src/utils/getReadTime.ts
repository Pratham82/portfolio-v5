const getReadTime = (content: string) => {
  // Count the number of words in the MDX content
  const wordCount = content.split(/\s+/).length;

  // Estimate reading speed (words per minute)
  const readingSpeed = 200; // You can adjust this value

  // Calculate read time in minutes
  const readTimeMinutes = wordCount / readingSpeed;

  return Math.ceil(readTimeMinutes); // Round up to the nearest minute
};

export default getReadTime;
