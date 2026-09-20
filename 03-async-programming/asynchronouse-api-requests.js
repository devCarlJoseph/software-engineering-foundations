/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Asynchronous API Requests (Native Fetch)
  ==============================================================================

  1. WHAT IS AN ASYNC API REQUEST?
     Calling an external web server over HTTP/HTTPS to fetch data (like user profiles
     or weather info) without refreshing or freezing your program.
     In modern Node.js (v18+) and browsers, we use the native `fetch()` API.

  2. REAL-LIFE ANALOGY:
     Ordering a book from a library in another city:
     You send a catalog request slip over the mail. While waiting for the postal
     service to deliver the book, your day continues normally.

  3. JARGON BUSTER:
     - HTTP Request: Sending a message asking for data (GET) or sending data (POST).
     - Response Object: The preliminary metadata envelope returned by `fetch()` (status code, headers).
     - response.json(): A SECOND asynchronous step that parses the incoming raw stream
       into a real JavaScript object.
     - response.ok: A boolean that is `true` for HTTP status 200-299 and `false` for 404, 500, etc.
*/

// =============================================================================
// STEP 1: ASYNC FETCH WITH ERROR CHECKING & JSON PARSING
// =============================================================================

async function fetchExternalTodoData(todoId) {
  // Public test API: JSONPlaceholder
  const targetUrl = `https://jsonplaceholder.typicode.com/todos/${todoId}`;

  try {
    console.log(`1. Sending HTTP GET request to: ${targetUrl}`);

    // Step A: Await the network response headers
    const response = await fetch(targetUrl);

    // Step B: Always check if the HTTP status is OK (e.g. 200 vs 404/500):
    if (!response.ok) {
      throw new Error(`HTTP Error! Status Code: ${response.status} (${response.statusText})`);
    }

    // Step C: Await the parsing of the JSON response stream
    const data = await response.json();

    console.log("2. Data parsed successfully!");
    console.log("   - Task Title:", data.title);
    console.log("   - Completed status:", data.completed);

    return data;
  } catch (error) {
    console.error("Network or API Request Failed:", error.message);
  }
}

// Execute the API request:
fetchExternalTodoData(1);

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  1. Sending HTTP GET request to: https://jsonplaceholder.typicode.com/todos/1
  2. Data parsed successfully!
     - Task Title: delectus aut autem
     - Completed status: false
*/