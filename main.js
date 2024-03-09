// Define a Book class with a constructor that accepts title, author, genre and reviews.
class Book {
  constructor(title, author, genre, reviews) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.reviews = reviews;
  }
}

// addButton function fetches data from the document and creates a new book object. It then adds the book to session storage and displays the updated book list.
function addBook() {
  // Fetching input values from the Document
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let genre = document.getElementById("genre").value;
  let reviews = document.getElementById("reviews").value;

  // Creating a new instance of Book and storing in variable 'book'
  let book = new Book(title, author, genre, reviews);

  // Adding 'book' to session storage
  addToSessionStorage(book);

  // displaying updated books list
  displayBooks();
}

// addToSessionStorage function adds the provided book object to the ‘books’ item in the session storage.
function addToSessionStorage(book) {
  let books;
  if (sessionStorage.getItem("books") === null) {
    books = [];
  } else {
    books = JSON.parse(sessionStorage.getItem("books"));
  }

  // Adding new book to 'books'
  books.push(book);

  // Overwriting 'books' in session storage
  sessionStorage.setItem("books", JSON.stringify(books));

  // Reset the input fields
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("genre").value = "";
  document.getElementById("reviews").value = "";
  
}

// displayBooks function fetches all the books from the session storage and displays them in the HTML.
function displayBooks() {
  let books;
  if (sessionStorage.getItem("books") === null) {
    books = [];
  } else {
    books = JSON.parse(sessionStorage.getItem("books"));
  }

  let bookList = document.getElementById("bookList");
  bookList.innerHTML = "";

  for (let i = 0; i < books.length; i++) {
    let title = books[i].title;
    let author = books[i].author;
    let genre = books[i].genre;
    let reviews = books[i].reviews;

    // Inserting each book's info into the 'bookList' HTML element
    bookList.innerHTML += `<div class="book">
              <h3>Title: ${title}</h3>
              <p>Author: ${author}</p>
              <p>Genre: ${genre}</p>
              <p>Reviews: ${reviews}</p>
              <button class="btn-delete" onClick="removeBook('${title}')">Delete</button>
              <button class="btn-edit" onClick="editBook('${title}')">Edit</button>
          </div>`;
  }
}

// removeBook function deletes the book with the provided title from the session storage and updates the displayed list of books.
function removeBook(title) {
  let books = JSON.parse(sessionStorage.getItem("books"));

  // Removing the book having the same title
  for (let i = 0; i < books.length; i++) {
    if (books[i].title == title) {
      books.splice(i, 1);
    }
  }

  // Updating 'books' in session storage
  sessionStorage.setItem("books", JSON.stringify(books));

  // Displaying updated books list
  displayBooks();
}

// editBook function populates the form with the details of the book to be edited. It then removes the original book from the session storage.
function editBook(title) {
  let books = JSON.parse(sessionStorage.getItem("books"));

  // Populating the form with the book details and removing that book from 'books'
  for (let i = 0; i < books.length; i++) {
    if (books[i].title == title) {
      document.getElementById("title").value = books[i].title;
      document.getElementById("author").value = books[i].author;
      document.getElementById("genre").value = books[i].genre;
      document.getElementById("reviews").value = books[i].reviews;
      books.splice(i, 1);
    }
  }

  // Updating 'books' in session storage
  sessionStorage.setItem("books", JSON.stringify(books));

  // Displaying updated books list
  displayBooks();
}

// Initial call to displayBooks to populate the bookList field if any books data is present in the session storage.
displayBooks();
