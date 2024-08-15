document.addEventListener("DOMContentLoaded", () => {
  const textInput = document.getElementById("textInput");
  const wordCountDisplay = document.getElementById("wordCount");
  const charCountDisplay = document.getElementById("charCount");
  const readingSpeedDisplay = document.getElementById("readingSpeed");
  const clearButton = document.getElementById("clearButton");
  const copyButton = document.getElementById("copyButton");
  const darkModeButton = document.querySelector(".dark-mode-button");
  const commonWordsDisplay = document.getElementById("commonWords");

  textInput.addEventListener("input", updateCounts);

  darkModeButton.addEventListener("click", toggleDarkMode);

  clearButton.addEventListener("click", () => {
    textInput.value = "";
    updateCounts();
  });

  copyButton.addEventListener("click", () => {
    textInput.select();
    document.execCommand("copy");
    alert("Text copied to clipboard!");
  });

  function updateCounts() {
    const text = textInput.value.trim().toLowerCase();
    const wordsArray = text === "" ? [] : text.split(/\s+/);
    const wordCount = wordsArray.length;
    const charCount = text.length;
    const readingSpeed = calculateReadingSpeed(wordCount);

    wordCountDisplay.textContent = wordCount;
    charCountDisplay.textContent = charCount;
    readingSpeedDisplay.textContent = readingSpeed;

    updateCommonWords(wordsArray);
  }

  function calculateReadingSpeed(wordCount) {
    const wordsPerMinute = 200; //Average reading speed
    const readingTime = wordCount / wordsPerMinute;
    return readingTime.toFixed(2); // reading time in minutes
  }

  function updateCommonWords(wordsArray) {
    const wordFrequency = {};

    //calculate frequency of each word
    wordsArray.forEach((word) => {
      if (wordFrequency[word]) {
        wordFrequency[word]++;
      } else {
        wordFrequency[word] = 1;
      }
    });

    //sort the words by frequency
    const sortedWords = Object.entries(wordFrequency).sort(
      (a, b) => b[1] - a[1]
    );

    //Getting the top 7 words
    const topWords = sortedWords.slice(0, 7);

    //Display the top words and their frequency
    commonWordsDisplay.innerHTML = topWords
      .map(([word, count]) => `<p>${word}: ${count}</p>`)
      .join("");
  }

  function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
  }

  updateCounts();
});
