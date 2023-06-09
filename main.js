const readingList = [];

const newBookButton = document.getElementById("add-new-book");
const myLibrary = document.getElementById("library-container");
const addBookButton = document.getElementById('add-book');

function bookObject(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages=pages
    this.read = read

}

addBookButton.addEventListener("click", () => {

    // const bookCard = document.getElementById('new-book-card');
    const title = document.getElementById('new-title').value;
    const author = document.getElementById('new-author').value;
    const pages = document.getElementById('new-pages').value;
    const read = document.getElementById('exampleCheck1').checked;
    console.log(read);

    const newEntry = new bookObject(title, author, pages, read);
    console.log(newEntry);

    readingList.push(newEntry);
    createNewCard(title, author, pages, read, myLibrary);

    
})

const newOne = new bookObject('wrwer', 'werwer', 23, false);
console.log(newOne);
newBookButton.addEventListener("click", () => {
    addBook();
})

function addBook() {
    const form = document.getElementById("new-book-card");
    form.style.display = "block";
    console.log(form.style);
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
    removeButton.className = 'btn btn-primary';
    removeButton.textContent = 'Remove';
    cardBody.appendChild(removeButton);

    parent.appendChild(newCard);


}


// createNewCard('Prisoner of Aks', 'JK ROwling', '115', true, myLibrary);


// const newCard = newElement('div', null, 'card', "width: 18rem;", null, myLibrary);

// const cardBody = newElement('div', null, 'card-body', null, null, newCard);