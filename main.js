const readingList = [];
const libraryEntries = []

const storedData = localStorage.getItem('readingList');
console.log(storedData);

const newBookButton = document.getElementById("add-new-book");
const newBookCard = document.getElementById("new-book-card");
const saveListButton = document.getElementById("save-list");
const clearListButton = document.getElementById("clear-list");
const myLibrary = document.getElementById("library-container");
const addBookButton = document.getElementById('add-book');
const cancelButton = document.getElementById('cancel-btn');
// const cancelButton = document.getElementById('alerts-section');



saveListButton.addEventListener("click", () => {
    showAlert('Reading List saved. You can access it any time!');
    updateStoredData(readingList);    
})

clearListButton.addEventListener("click", () => {
    showAlert('Reading List cleared...')
    deleteCards();
    updateStoredData([]);    
})

function bookObject(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages=pages
    this.read = read

}

function updateStoredData(data) {
    const jsonData = JSON.stringify(data);
    localStorage.setItem('readingList', jsonData);
    console.log(localStorage.getItem('readingList'));
}

addBookButton.addEventListener("click", () => {

    // const bookCard = document.getElementById('new-book-card');
    const title = document.getElementById('new-title');
    const author = document.getElementById('new-author');
    const pages = document.getElementById('new-pages');
    const read = document.getElementById('exampleCheck1');
    console.log(read);

    const newEntry = new bookObject(title.value, author.value, pages.value, read.checked);
    console.log(newEntry);

    readingList.push(newEntry);
    // const jsonData = JSON.stringify(readingList);
    // localStorage.setItem('readingList', jsonData)
    createNewCard(title.value, author.value, pages.value, read.checked, myLibrary);
    title.value = "";
    author.value = "";
    pages.value = "";
    read.checked = false;

    
})

cancelButton.addEventListener("click", () => {
    const form = document.getElementById("new-book-card");
    form.style.display = "none";

})

const newOne = new bookObject('wrwer', 'werwer', 23, false);
console.log(newOne);

newBookButton.addEventListener("click", () => {
    
    addBook();
    hideCards();

})

function addBook() {
    const form = document.getElementById("new-book-card");
    form.style.display = "block";
    console.log(form.style);
}

function updateReadingList(removedTitle) {

    readingList.forEach((book, index) => {
        if (book.title === removedTitle) {
          readingList.splice(index, 1);
        }
      });
}


function newElement(tagName, id, className, style, labelFor, parent) {


    const newElement = document.createElement(tagName);
    if (id) {
        newElement.id = id;
    }

    if (className) {
        newElement.className = className;
    }
    if (style) {
        newElement.style = style;
    }

    if (labelFor) {
        newElement.for = labelFor;
    }


    // console.log(newElement);

    parent.appendChild(newElement);

    return newElement;

}


function createNewCard(newTitle, newAuthor, newPages, newRead, parent) {
    const newCard = newElement('div', null, 'card', "width: 18rem;", null, myLibrary);

    const cardBody = newElement('div', null, 'card-body', null, null, newCard);
    const mainHeader = newElement('h5', null, 'card-title', null, null, cardBody);
    mainHeader.textContent = newTitle;
    const bookDetails = newElement('div', null, 'book-details', null, null, cardBody);
    bookDetails.style.display = "none";

    const authorTitle = newElement('h6', null, 'card-title', null, null, bookDetails);
    authorTitle.textContent = 'Author: ';
    const authorText = newElement('p', null, 'card-text', null, null, bookDetails);
    authorText.textContent = newAuthor;

    const pagesTitle = newElement('h6', null, 'card-title', null, null, bookDetails);
    pagesTitle.textContent = 'Pages: ';
    const pagesText = newElement('p', null, 'card-text', null, null, bookDetails);
    pagesText.textContent = newPages;

    const formCheck = newElement('div', null, 'form-check', null, null, bookDetails);
    const readCheck = newElement('input', 'flexCheckDefault', 'form-check-input', null, null, formCheck);
    readCheck.value = '';
    readCheck.type = 'checkbox';
    readCheck.checked = newRead;
    const readLabel = newElement('label', null, 'form-check-label', null, 'form-check-input', formCheck);
    readLabel.textContent = 'Read'
    
    formCheck.appendChild(document.createElement('br'))

    const removeButton = document.createElement('a');
    removeButton.href = '#';
    removeButton.className = 'btn btn-secondary';
    removeButton.textContent = 'Remove';
    bookDetails.appendChild(removeButton);

    removeButton.addEventListener("click", () => {
        parent.removeChild(newCard);
        updateReadingList(newTitle);
    })

    parent.appendChild(newCard);

    newCard.addEventListener("click", () => {
        const form = document.getElementById("new-book-card");
        form.style.display = "none";
        selectCard(newCard);

    })
    


}


function hideCards() {
    const books = document.getElementsByClassName('card');

    for (let i = 0; i < books.length; i++) {
        const element = books[i];
        console.log(element);
        if (element.id !== "new-book-card" && element.id !== "library-container") {
            const cardDetails = element.getElementsByClassName("book-details")[0];
            cardDetails.style.display = "none";
            console.log(cardDetails);
        }
      }
      
}

function deleteCards() {
    const books = document.getElementsByClassName('card');
    const booksArray = Array.from(books);

    booksArray.forEach((element, index) => {
        if (element.id !== "new-book-card" && element.id !== "library-container") {
            myLibrary.removeChild(element);
        }
    })

    // for (let i = 0; i < books.length; i++) {
    //     const element = books[i];
    //     if (element.id !== "new-book-card" && element.id !== "library-container") {
    //         myLibrary.removeChild(books[i]);
    //     }
    //   }
      
}

function showAlert(alertMessage) {

    const alertsSection = document.getElementById('alerts-section');
    alertsSection.innerHTML ='';
    const alert = document.createElement('div');
    alert.className = "alert alert-primary alert-dismissible fade show";
    alert.role = "alert"
    const alertText = document.createElement('strong');
    alertText.textContent = alertMessage;
    alert.appendChild(alertText);
    const dismissButton = document.createElement('button');
    dismissButton.type = 'button';
    dismissButton.className = 'btn-close';
    dismissButton.setAttribute("data-bs-dismiss", "alert");
    dismissButton.setAttribute("aria-label", "Close");
    alert.appendChild(dismissButton);

    alertsSection.appendChild(alert);

}


function selectCard(card) {
    const books = document.getElementsByClassName('card');

    hideCards();

    const activeDetails = card.getElementsByClassName("book-details")[0];
    activeDetails.style.display = "block";
    console.log(activeDetails);

      
}


try {
    const storedReadingList = JSON.parse(storedData);

    storedReadingList.forEach((item, index) => {
        readingList.push(item);
        createNewCard(item.title, item.author, item.pages, item.read, myLibrary)
    })
} catch {
    console.log('Didnt work');
}

