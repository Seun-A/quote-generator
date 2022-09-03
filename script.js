/** GLOBAL VARIABLES **/
const quoteContainer = document.getElementById('quote-container'); 
const quoteText = document.getElementById('quote'); 
const authorText = document.getElementById('author'); 
const twitterBtn = document.getElementById('twitter'); 
const newQuoteBtn = document.getElementById('new-quote'); 



/** W3SCHOOLS LOADER **/
const loader = document.getElementById('loader'); 

// Toggle loader 
function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function hideLoadingSpinner() {
  loader.hidden = true; 
  quoteContainer.hidden = false; 
}



let apiQuotes = []; 



/** CREATE NEW QUOTE **/
function newQuote() {
  showLoadingSpinner(); // Putting this again to have a loader even when the fetch is done 
  // Pick a random quote form the API quotes array 
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]; 

  // Replace the content with the random text
  // Check if author field is blank and replace with 'Unknown'
  if (!quote.author) {
    authorText.textContent = '~ Unknown';      
  } else {
    authorText.innerHTML = `<i class="fas fa-feather-alt"></i> ${quote.author}`; 
  }
  
  // If Quote length is too long, make text smaller (defined in css)
  if (quote.text.length > 100) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }

  // Set Quote and Hide Loader
  quoteText.textContent = quote.text; 
  hideLoadingSpinner(); 
}



/** FETCH QUOTES FROM API */
async function getQuotes() {
  showLoadingSpinner(); // Calling the loader before we fetch
  const apiUrl = 'https://type.fit/api/quotes'; 

  try {
    // 'fetch' such that the api data is called only once, making functionality easier
    const response = await fetch(apiUrl); 

    // The constant response will not be populated until it has fetched the data from the api 
    apiQuotes = await  response.json(); 

    newQuote();
  } catch (error) {
    console.log(error);  
  }
}



/** TWEET QUOTE **/
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`; 
  window.open(twitterUrl, '_blank'); 
}



/** EVENT LISTENERS **/
newQuoteBtn.addEventListener('click', newQuote); 
twitterBtn.addEventListener('click', tweetQuote); 



/** run on load **/
getQuotes(); 

// At the initial moment of writing this, twitter was banned in my country :)
