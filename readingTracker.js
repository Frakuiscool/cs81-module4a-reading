// Weekly reading log
// This array stores the data for the whole program: a list of objects,
// where each object represents one reading session (day, book, minutes spent).
const readingLog = [
  { day: "Monday", book: "Dune", minutes: 30 },
  { day: "Tuesday", book: "1984", minutes: 20 },
  { day: "Wednesday", book: "Dune", minutes: 25 },
  { day: "Thursday", book: "The Hobbit", minutes: 40 },
  { day: "Friday", book: "1984", minutes: 15 }
];
 
/**
 * addReadBook
 * Purpose: Adds a new reading entry to the reading log.
 * Inputs: day (string), book (string), minutes (number) - the details of one reading session.
 * Output: No return value - it directly modifies (mutates) the readingLog array by adding a new entry to it.
 */
// Adds a new reading entry to the log
function addReadBook(day, book, minutes) {
  // Creates a new object using shorthand property notation, since the
  // parameter names match the property names we want (day, book, minutes).
  const newEntry = { day, book, minutes };
 
  // push() adds the new entry object onto the end of the readingLog array,
  // which is why this function doesn't need a return statement - it changes
  // the array in place rather than creating a new one.
  readingLog.push(newEntry);
}
 
/**
 * totalReadingMinutes
 * Purpose: Calculates the total number of minutes spent reading across all entries in a log.
 * Inputs: log (array) - a list of reading entry objects, each with a "minutes" property.
 * Output: Returns a number representing the sum of all minutes in the log.
 */
// Returns total minutes spent reading all week
function totalReadingMinutes(log) {
  // "total" is a running sum that starts at 0 and grows as we loop through entries.
  let total = 0;
 
  // for...of loops over each object in the array directly (not the index),
  // which makes sense here since we only care about each entry's data, not its position.
  for (let entry of log) {
    // Accessing entry.minutes pulls the numeric minutes value out of each object
    // and adds it to the running total - this line is the core logic of the function.
    total += entry.minutes;
  }
 
  // Once the loop finishes, total holds the sum of every entry's minutes.
  return total;
}
 
/**
 * mostReadBook
 * Purpose: Determines which book appears most frequently in the reading log.
 * Inputs: log (array) - a list of reading entry objects, each with a "book" property.
 * Output: Returns a string with the name of the most frequently read book (or null if the log is empty).
 */
// Returns the book read most frequently
function mostReadBook(log) {
  // bookCounts is an object used like a dictionary/hash map: each key is a
  // book title, and each value is how many times that book shows up in the log.
  const bookCounts = {};
 
  // This loop walks through every entry and tallies up how many times each
  // book title has appeared so far, building up the bookCounts object.
  for (let entry of log) {
    if (!bookCounts[entry.book]) {
      // If this book hasn't been counted yet, start its count at 1.
      bookCounts[entry.book] = 1;
    } else {
      // Otherwise, increment the existing count for that book.
      bookCounts[entry.book]++;
    }
  }
 
  // These two variables track the current "winner" as we scan through bookCounts.
  let maxBook = null;
  let maxCount = 0;
 
  // for...in loops over the KEYS of an object (here, the book titles),
  // which is different from for...of used above for arrays - this is important
  // because bookCounts is an object, not an array.
  for (let book in bookCounts) {
    // Compare each book's count to the highest count seen so far; if it's
    // higher, this book becomes the new leader.
    if (bookCounts[book] > maxCount) {
      maxBook = book;
      maxCount = bookCounts[book];
    }
  }
 
  // Returns the title of whichever book ended up with the highest count.
  return maxBook;
}
 
/**
 * printDailySummary
 * Purpose: Prints a line of text to the console summarizing each day's reading session.
 * Inputs: log (array) - a list of reading entry objects, each with day, book, and minutes properties.
 * Output: No return value - it produces console output as a side effect rather than returning data.
 */
// Prints a summary of minutes read per day
function printDailySummary(log) {
  // Loops through every entry in the log so each day gets its own printed line.
  for (let entry of log) {
    // Template literal pulls three different properties out of the same
    // entry object (day, minutes, book) into one readable sentence.
    console.log(`${entry.day}: ${entry.minutes} mins reading "${entry.book}"`);
  }
}
 
// SUGGESTED IMPROVEMENT:
// mostReadBook() currently returns just the winning book's name, but not its
// count, and it silently returns null if the log is empty. A cleaner version
// would return an object like { book: maxBook, count: maxCount } so callers
// can see both pieces of information without recalculating, and could throw
// or return a clearer message when the log is empty. This would make the
// function more useful for anyone building on top of it later, since right
// now they'd have to re-loop through the log themselves to get the count.
 
// Example usage
addReadBook("Saturday", "Dune", 50);
printDailySummary(readingLog);
console.log("Total minutes read:", totalReadingMinutes(readingLog));
console.log("Most read book:", mostReadBook(readingLog));
 
// TEST CASE:
// Adds a brand new entry with different data than anything already in the
// log, then reprints the summary and totals to confirm the functions still
// work correctly with the new data included.
addReadBook("Sunday", "The Hobbit", 60);
printDailySummary(readingLog);
console.log("Total minutes read after Sunday entry:", totalReadingMinutes(readingLog));
console.log("Most read book after Sunday entry:", mostReadBook(readingLog));
