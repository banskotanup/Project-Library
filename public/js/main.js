const myLibrary = [];
const displayBook = document.querySelector(".book-list");

function Books(title, author, pages, isRead) {
    if (!new.target) {
        throw "You should use new in constructor.";
    }
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;

    this.info = () => {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${(this.isRead) ? "read" : "not yet read"}.`    
    }
} 

function addBookToLibrary(title, author, pages, isRead) {
    const newBook = new Books(title, author, pages, isRead);
    myLibrary.push(newBook);
}


//manual add data to array and check whether its working or not.
addBookToLibrary("John", "Anup", 230, false);
addBookToLibrary("Ram", "Shristy", 260, false);
addBookToLibrary("Shyam", "Sanam", 270, true);
addBookToLibrary("Hari", "Anoop", 275, true);


//loop through the array and display each book.
myLibrary.forEach(myLibrary => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    const bookTitle = document.createElement("h1");
    bookTitle.classList.add("card-head");
    bookTitle.textContent = `${myLibrary.title}`;
    bookCard.appendChild(bookTitle);

    const author = document.createElement("p");
    author.classList.add("card-content");
    author.textContent = `Author: ${myLibrary.author}`;
    bookCard.appendChild(author);

    const pages = document.createElement("p");
    pages.classList.add("card-content");
    pages.textContent = `Pages: ${myLibrary.pages}`;
    bookCard.appendChild(pages);

    const status = document.createElement("p");
    status.classList.add("card-content");
    status.textContent = `Status: ${myLibrary.isRead ? "read" : "not yet read"}`;
    bookCard.appendChild(status);

    const btnsDiv = document.createElement("div");
    btnsDiv.classList.add("btns-div");

    const changeStatusBtn = document.createElement("button");
    changeStatusBtn.classList.add("btn-status-change");
    changeStatusBtn.textContent = "Change Status";
    btnsDiv.appendChild(changeStatusBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn-delete");
    deleteBtn.textContent = "Remove book";
    btnsDiv.appendChild(deleteBtn);

    bookCard.appendChild(btnsDiv);
    displayBook.appendChild(bookCard);
});
