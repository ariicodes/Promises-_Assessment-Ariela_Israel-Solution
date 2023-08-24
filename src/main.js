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
	return welcome()
		.then(welcomeMess =>
			ask(question).then(res =>
				goodbye().then(goodbyeMess => [welcomeMess, ...res, goodbyeMess])
			)
		)
		.catch(err =>
			welcome().then(welcomeMess =>
				goodbye().then(goodbyeMess => [
					welcomeMess,
					`There was an error: ${err}`,
					goodbyeMess,
				])
			)
		);

	// Call the welcome function
	// Chain the getFortune function to get the fortune for the question
	// Chain the goodbye function and concatenate the results with the session
	// Return a promise that resolves to the final session array or an error message
}

module.exports = { getFortune, fullSession };
