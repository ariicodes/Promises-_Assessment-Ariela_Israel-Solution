const { welcome, goodbye, tell } = require('../utils/fortune-teller');

function ask(question) {
	return tell(question).then(response => [
		`Your question was: ${question}`,
		`Your fortune is: ${response}`,
	]);
}

// Function: getFortune
// Parameters: question (string)
// Returns: Promise that resolves to a string or an error message
// TODO: Implement the getFortune function by utilizing the ask function to get the fortune for the question
// Hint: Call the ask function with the question and extract the fortune from the response array
function getFortune(question) {
	return ask(question).catch(error => `There was an error: ${error}`);
}

// Function: fullSession
// Parameters: question (string)
// Returns: Promise that resolves to an array of strings or an error message
// TODO: Create a full session by combining the welcome, getFortune, and goodbye functions
// Hint: Use promise chaining to call the functions in the correct order and concatenate the results
function fullSession(question) {
	let welcomeMessage = '';
	return welcome()
		.then( message => {
			welcomeMessage = message
			if (!question) {
				throw new Error('A question is required...');
			}
			return getFortune(question);
		})
		.then(fortune => {
			return goodbye().then(response => {
				const sessionArr = [
					welcomeMessage,
					`Your question was: ${question}`,
					`Your fortune is: ${fortune}`,
					response,
				];
				console.log(sessionArr);
				return sessionArr;
			});
		})
		.catch(error => {
			const sessionArr = [
				"Provide me a question and I'll give you an answer...",
				`There was an error: ${error.message}`,
				'Best of luck in the future...',
			];
			console.log(sessionArr);
			return sessionArr;
		});

	// Call the welcome function
	// Chain the getFortune function to get the fortune for the question
	// Chain the goodbye function and concatenate the results with the session
	// Return a promise that resolves to the final session array or an error message
}

module.exports = { getFortune, fullSession };
