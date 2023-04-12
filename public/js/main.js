// Define a function to handle the form submission event
function onSubmit(e) {
    // Prevent the default form submission behavior
    e.preventDefault();
  
    // Clear any previous error messages and image
    document.querySelector('.msg').textContent = '';
    document.querySelector('#image').src = '';
  
    // Get the prompt and size values from the form
    const prompt = document.querySelector('#prompt').value;
    const size = document.querySelector('#size').value;
  
    // If the prompt is empty, display an alert and return
    if (prompt === '') {
      alert('Please add some text');
      return;
    }
  
    // Call the generateImageRequest function with the prompt and size values
    generateImageRequest(prompt, size);
  }
  
  // Define an asynchronous function to generate an image using the OpenAI API
  async function generateImageRequest(prompt, size) {
    try {
      // Show the spinner while the image is being generated
      showSpinner();
  
      // Send a POST request to the server with the prompt and size values
      const response = await fetch('/openai/generateimage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          size,
        }),
      });
  
      // If the response is not ok, remove the spinner and throw an error
      if (!response.ok) {
        removeSpinner();
        throw new Error('This image cannot be generated: description may involve unlicensed copyright, portrait rights or gore, violence, inappropriate sexually suggestive content, etc.');
      }
  
      // Parse the response data as JSON
      const data = await response.json();
      
      // Get the image URL from the response data
      const imageUrl = data.data;
  
      // Set the image source to the image URL
      document.querySelector('#image').src = imageUrl;
  
      // Remove the spinner
      removeSpinner();
    } catch (error) {
      // If an error occurs, display the error message
      document.querySelector('.msg').textContent = error;
    }
  }
  
  // Define a function to show the spinner
  function showSpinner() {
    document.querySelector('.spinner').classList.add('show');
  }
  
  // Define a function to remove the spinner
  function removeSpinner() {
    document.querySelector('.spinner').classList.remove('show');
  }
  
  // Add an event listener to the form to listen for the submit event
  document.querySelector('#image-form').addEventListener('submit', onSubmit);
  