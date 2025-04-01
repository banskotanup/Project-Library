let myLibrary = [];
const displayBook = document.querySelector(".book-list");
const btnAddBook = document.querySelector(".add-book");
const dialog = document.querySelector("dialog");
const closeDialogBtn = document.querySelector(".close-dialog");
const bookName = document.querySelector("#book_name")
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const formSubmitBook = document.querySelector(".add-book-post");
const bookDetail = document.querySelector(".desc");
const bookDetailDialog = document.querySelector(".dialog");

const statusChange = document.querySelector(".btn-status-change");

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
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 230, false);
addBookToLibrary("Harry Potter", "J.K. Rowling", 260, false);
addBookToLibrary("A Game of Thrones", "George R. R. Martin", 270, true);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 275, true);


//loop through the array and display each book.
function displayBooks() {
    displayBook.innerHTML = "";
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

        changeStatusBtn.addEventListener("click", () => {
            toggleBookStatus(myLibrary.id);
        });

        deleteBtn.addEventListener("click", () => {
            deleteBook(myLibrary.id); 
        });
    });
}

function toggleBookStatus(bookId) {
    const book = myLibrary.find((b) => bookId === b.id);
    if (book) {
        book.isRead = !book.isRead;
        displayBooks();
    }
}

function deleteBook(bookId) {
    myLibrary = myLibrary.filter((b) => b.id !== bookId);
    displayBooks();
}

btnAddBook.addEventListener("click", () => {
    dialog.showModal();
});

closeDialogBtn.addEventListener("click", () => {
    dialog.close(); 
});

//add book from from 

formSubmitBook.addEventListener("click", (e) => {
    e.preventDefault();
    const selectedStatus = document.querySelector('input[name="status"]:checked');
    
    if (!bookName.value || !author.value || !pages.value ||!selectedStatus) {
        alert(`Please fill all required fields`);
    }
    else {
        const isRead = (selectedStatus.value === "true");

        // debug value 
        // console.log(bookName.value);
        // console.log(author.value);
        // console.log(pages.value);
        // console.log(isRead);


        //extracting the value using trim()
        const book = bookName.value.trim();
        const authorName = author.value.trim();
        const totalPages = pages.value.trim();

        //debug my library
        console.log("Before input: ", myLibrary);

        //add book to library array
        addBookToLibrary(book, authorName, Number(totalPages), isRead);
        dialog.close();
        console.log("After input: ", myLibrary);
        document.querySelector("form").reset();

        //display all book after updating previous value
        displayBooks();
    }
});


displayBooks();