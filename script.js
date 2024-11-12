// Function to fetch and parse the CSV file
async function loadVocabFromCSV() {
  const response = await fetch('Loss_summaries.csv'); 
  const csvText = await response.text();
  const vocabList = parseCSV(csvText);
  populateVocabList(vocabList);
}

// Function to parse CSV text into an array of vocab objects
function parseCSV(csvText) {
  const lines = csvText.split('\n');
  const vocabList = [];
  for (let i = 1; i < lines.length; i++) {
    const [word, definition] = lines[i].split(',');
    if (word && definition) {
      vocabList.push({ word: word.trim(), definition: definition.trim() });
    }
  }
  return vocabList;
}

// Function to dynamically create HTML elements for each vocab item
function populateVocabList(vocabList) {
  const container = document.getElementById('vocab-container');
  
  vocabList.forEach(item => {
    const vocabItem = document.createElement('div');
    vocabItem.classList.add('vocab-item');
    
    const wordElement = document.createElement('span');
    wordElement.classList.add('word');
    wordElement.textContent = item.word;
    
    const definitionElement = document.createElement('p');
    definitionElement.classList.add('definition');
    definitionElement.textContent = item.definition;
    
    // Append word and definition to the vocab item
    vocabItem.appendChild(wordElement);
    vocabItem.appendChild(definitionElement);

    // Add the vocab item to the container
    container.appendChild(vocabItem);

    // Add click functionality to toggle definition visibility
    wordElement.addEventListener('click', () => {
      definitionElement.style.display = (definitionElement.style.display === 'block') ? 'none' : 'block';
    });
  });
}

// Load the vocab data when the page is loaded
window.onload = loadVocabFromCSV;
