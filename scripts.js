document.addEventListener("DOMContentLoaded", () => {
  const textInput = document.getElementById("textInput");
  const wordCountDisplay = document.getElementById("wordCount");
  const charCountDisplay = document.getElementById("charCount");
  const readingSpeedDisplay = document.getElementById("readingSpeed");
  const clearButton = document.getElementById("clearButton");
  const copyButton = document.getElementById("copyButton");
  const darkModeButton = document.querySelector(".dark-mode-button");

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
    const text = textInput.value.trim();
    const wordCount = text === "" ? 0 : text.split(/\s+/).length;
    const charCount = text.length;
    const readingSpeed = calculateReadingSpeed(wordCount);

    wordCountDisplay.textContent = wordCount;
    charCountDisplay.textContent = charCount;
    readingSpeedDisplay.textContent = readingSpeed;
  }

  function calculateReadingSpeed(wordCount) {
    const wordsPerMinute = 200; //Average reading speed
    const readingTime = wordCount / wordsPerMinute;
    return readingTime.toFixed(2); // reading time in minutes
  }

  function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
  }

  updateCounts();
});
