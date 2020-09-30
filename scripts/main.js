// Connect to #library node
const libraryDisplay = document.getElementById('library');
const newBookButton = document.getElementById("new-book-button")

// Set up library array
var myLibrary = [];

// Book constructor
function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = "Unread";
}

// Add funnction to Book.prototype object
Book.prototype.displayBook = function(bookRefNum) {

    // create a book holder (a space on the book shelf)
    let shelfSpace = document.createElement('div');
    shelfSpace.className = "shelf-space"
    // add a corresponding book-num to the shelfSpace
    shelfSpace.setAttribute('data-book-num', bookRefNum);

    // create the book <div> and give it a className
    let book = document.createElement('div');
    book.className = "book";

    // create the HTML syntax for the books
    let bookCoverText = document.createElement('div');
    bookCoverText.className = "book-cover-text-wrapper";

    let bookTitle = document.createElement('h2');
    bookTitle.className = "book-title"
    bookTitle.insertAdjacentHTML("afterbegin", this.title);

    let by = document.createElement('p');
    by.insertAdjacentHTML("afterbegin", "by");

    let bookAuthor = document.createElement('h3');
    bookAuthor.insertAdjacentHTML("afterbegin", this.author);

    // build append title, by, and auther to the bookCoverText
    bookCoverText.appendChild(bookTitle);
    bookCoverText.appendChild(by);
    bookCoverText.appendChild(bookAuthor);

    // <div class="book-cover-text-wrapper">
    // <h2 class="book-title">${this.title}</h2>
    // <p>by</p>
    // <h3 class="author">${this.author}</h3>
    // </div>

    // place the book syntax into the book div
    book.appendChild(bookCoverText)
    // place book on the shelf within a shelfSpace <div>
    shelfSpace.appendChild(book);

    // show number of pages
    let pageCount = document.createElement('p');
    pageCount.className = "page-count";
    pageCount.insertAdjacentHTML("afterbegin", "Pages: " + this.pages);

    // creat a read/unread button
    let readButton = document.createElement('button');
    readButton.className = "book-read-button";
    readButton.insertAdjacentHTML("afterbegin", this.read);
    // add a corresponding book-num to the delete button
    readButton.setAttribute('data-book-num', bookRefNum);
    readButton.addEventListener("click", markRead);
    
    // create a delete button
    let deleteBookButton = document.createElement('button');
    deleteBookButton.className = "delete-book-button";
    deleteBookButton.insertAdjacentHTML("afterbegin", "Delete Book");
    // add a corresponding book-num to the delete button
    deleteBookButton.setAttribute('data-book-num', bookRefNum);
    deleteBookButton.addEventListener("click", deleteBook);

    // create a book info wrapper
    let bookInfoWrapper = document.createElement('div');
    bookInfoWrapper.className = "book-info-wrapper";
    // append info wrapper to shelfSpace
    shelfSpace.appendChild(bookInfoWrapper);

    // place the page count, read button and delete button into bookInfoWrapper
    bookInfoWrapper.appendChild(pageCount);
    bookInfoWrapper.appendChild(readButton);
    bookInfoWrapper.appendChild(deleteBookButton);

    // append the shelfSpace to the library
    libraryDisplay.appendChild(shelfSpace);
}

// Add book to library function
function addBookToLibrary(title, author, pages) {
    let book = new Book(title, author, pages);
    myLibrary.push(book);
}

// Display books to page
function displayBooksToPage(library) {
    // clear library so it doesn't duplicate
    libraryDisplay.innerHTML = "";
    for (let book in library) {
        // run displayBook() all books in the library
        library[book].displayBook(book);
    }
    
}

// function for delete a book
function deleteBook() {
    // get book-num of the delete button that was clicked
    let bookIndexNum = this.getAttribute('data-book-num');
    console.log(bookIndexNum);

    // remove book from myLibrary array and the DOM
    myLibrary.splice(bookIndexNum, 1);

    // show updated library
    displayBooksToPage(myLibrary);
}

// add prototype function to change read status
function markRead() {
    // get book-num of the read button that was clicked
    let bookIndexNum = this.getAttribute('data-book-num');
    // conditional for the read status innn the object
    if (myLibrary[bookIndexNum].read === "Unread") {
        this.textContent = "Read";                  // this refers to the button
        myLibrary[bookIndexNum].read = "Read";
    } else {
        this.textContent = "Unread";                // this refers to the button
        myLibrary[bookIndexNum].read = "Unread";
    }
}

// Build a starting library
// addBookToLibrary("La Comida del Campo", "Charo Santiago", 57);
// addBookToLibrary("Surviving Life", "Luther Calvin Riggs", 187);
// addBookToLibrary("No Pregnancy is the Same", "Ashley Espinal Riggs", 132);
// addBookToLibrary("My Birthday", "Alma Lucia Riggs", 1129);

// display starting library on screen 
// displayBooksToPage(myLibrary);

// Allow user to add a new book with a button click
newBookButton.addEventListener("click", () => {
    // prompt user for input
    let title = window.prompt("what is the title of the book?");
    let author = window.prompt("Who is the author of the book?");
    let pages = window.prompt("How many pages does the book have?");

    // add new book to library
    addBookToLibrary(title, author, pages);
    // show updated library
    displayBooksToPage(myLibrary);
})




// Test for localStorage
if (!localStorage.getItem('library')) {
    console.log("NO localStorage")
    populateStorage();
} else {
    console.log("localStorage present")
    displayBooksFromStorage();
}

// Get values from localStorage
function displayBooksFromStorage() {
    var storedLibrary = localStorage.getItem('storedLibrary')
    displayBooksToPage(storedLibrary);
}

// Set values to localStorage
function populateStorage() {
    localStorage.setItem('storedLibrary', myLibrary);
    
    displayBooksFromStorage();
}

// onchange handler to update the localStorage
document.onchange = populateStorage;