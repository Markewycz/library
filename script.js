"strict mode";
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const emptyLibImage = document.querySelector(".empty-lib-img");

class Library {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
  }

  removeBook(index) {
    this.books.splice(index, 1);
  }

  modifyBook(
    index,
    title,
    author,
    pages,
    read,
    readPages,
    completion,
    radioState
  ) {
    const book = this.books[index];
    book.title = title;
    book.author = author;
    book.pages = pages;
    book.read = read;
    book.readPages = readPages;
    book.completion = completion;
    book.radioState = radioState;
  }
}

class Book {
  constructor(title, author, pages, read, readPages, completion, radioState) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.readPages = readPages;
    this.completion = completion;
    this.radioState = radioState;
  }
}

class Display {
  constructor(library, modal, modalContent, emptyLibImage) {
    this.library = library;
    this.modal = modal;
    this.modalContent = modalContent;
    this.emptyLibImage = emptyLibImage;
  }

  openModal() {
    this.modal.style.display = "grid";
    setTimeout(() => {
      this.modal.style.visibility = "visible";
      this.modal.style.opacity = "1";
    }, 100);
  }

  closeModal() {
    this.modal.style.visibility = "hidden";
    this.modal.style.opacity = "0";
    setTimeout(() => {
      this.modal.style.display = "none";
    }, 250);
  }

  showCompletion() {
    const completion = document.querySelector(".completion-container");
    completion.style.maxHeight = "100px";
    setTimeout(() => {
      completion.style.opacity = "1";
      completion.style.visibility = "visible";
    }, 260);
  }

  hideCompletion() {
    const completion = document.querySelector(".completion-container");
    completion.style.opacity = "0";
    completion.style.visibility = "hidden";
    setTimeout(() => {
      completion.style.maxHeight = "0px";
    }, 300);
  }

  clearInputs() {
    document.getElementById("inputTitle").value = "";
    document.getElementById("inputAuthor").value = "";
    document.getElementById("inputPages").value = "";
    document.getElementById("readRadio").checked = true;
    document.getElementById("inputCompletion").value = "";
    this.hideCompletion();
  }

  addBookModal() {
    this.modalContent.innerHTML = `
          <span class="material-symbols-outlined close" onclick="ui.closeModal()"
            >close</span
          >
          <h3 class="modal-title">Add book</h3>
          <form id="formAddBook" class="add-book-form" action="">
            <label for="inputTitle" class="option">Title:</label>
            <input type="text" id="inputTitle" class="input-text" required />
            <label for="inputAuthor" class="option">Author:</label>
            <input type="text" id="inputAuthor" class="input-text" required />
            <label for="inputPages" class="option">Pages:</label>
            <input
              type="text"
              id="inputPages"
              class="input-text"
              pattern="\\d*"
              required
            />
            <fieldset class="read-fieldset">
              <legend class="option">Read:</legend>
              <div class="radio-container">
                <input
                  type="radio"
                  id="readRadio"
                  value="read"
                  name="read"
                  checked
                />
                <label for="readRadio">Read</label>
              </div>
  
              <div class="radio-container">
                <input type="radio" id="unreadRadio" value="unread" name="read" />
                <label for="unreadRadio">Unread</label>
              </div>
  
              <div class="radio-container">
                <input
                  type="radio"
                  id="inProgessRadio"
                  class="in-progress"
                  value="in progress"
                  name="read"
                />
                <label for="inProgessRadio">In progress</label>
              </div>
              <div class="completion-container">
                <label for="inputCompletion" class="option">Completion:</label>
                <input
                  type="text"
                  id="inputCompletion"
                  class="input-text completion"
                  pattern="\\d*"
                  placeholder="Number of pages read"
                />
              </div>
            </fieldset>
            <button type="submit" id="addBookButton" class="button add-book" data-type="add">
              Add Book
            </button>
          </form>
    `;

    this.openModal();
    this.radioListener();
    this.formListener();
  }

  editBookModal(id) {
    library.books[id].radioState.read === "true" ? "checked" : "";

    modalContent.innerHTML = `
          <span class="material-symbols-outlined close" onclick="closeModal()"
            >close</span
          >
          <h3 class="modal-title">Edit book</h3>
          <form id="formAddBook" class="add-book-form" action="">
            <label for="inputTitle" class="option">Title:</label>
            <input type="text" id="inputTitle" class="input-text" required value="${
              library.books[id].title
            }"/>
            <label for="inputAuthor" class="option">Author:</label>
            <input type="text" id="inputAuthor" class="input-text" required value="${
              library.books[id].author
            }"/>
            <label for="inputPages" class="option">Pages:</label>
            <input
              type="text"
              id="inputPages"
              class="input-text"
              pattern="\\d*"
              required
              value="${library.books[id].pages}"
            />
            <fieldset class="read-fieldset">
              <legend class="option">Read:</legend>
              <div class="radio-container">
                <input
                  type="radio"
                  id="readRadio"
                  value="read"
                  name="read"
                  ${library.books[id].radioState.read === true ? "checked" : ""}
                />
                <label for="readRadio">Read</label>
              </div>
  
              <div class="radio-container">
                <input type="radio" id="unreadRadio" value="unread" name="read" 
                ${
                  library.books[id].radioState.unread === true ? "checked" : ""
                }/>
                <label for="unreadRadio">Unread</label>
              </div>
  
              <div class="radio-container">
                <input
                  type="radio"
                  id="inProgessRadio"
                  class="in-progress"
                  value="in progress"
                  name="read"
                  ${
                    library.books[id].radioState.inProgress === true
                      ? "checked"
                      : ""
                  }
                />
                <label for="inProgessRadio">In progress</label>
              </div>
              <div class="completion-container">
                <label for="inputCompletion" class="option">Completion:</label>
                <input
                  type="text"
                  id="inputCompletion"
                  class="input-text completion"
                  pattern="\\d*"
                  placeholder="Number of pages read"
                  value="${library.books[id].readPages}"
                />
              </div>
            </fieldset>
            <button type="submit" id="addBookButton" class="button add-book" data-type="edit">
              Apply Changes
            </button>
          </form>
    `;
    this.openModal();
    setTimeout(() => {
      library.books[id].radioState.inProgress === true ? showCompletion() : "";
    }, 250);
    this.radioListener();
    this.formListener(id);
  }

  editBookBtn() {
    const editBook = document.querySelectorAll("#edit");

    editBook.forEach((button) => {
      const id = button.parentElement.parentElement.dataset.id;
      button.addEventListener("click", (e) => {
        this.editBookModal(id);
      });
    });
  }

  deleteBookBtn() {
    const deleteBook = document.querySelectorAll("#delete");

    deleteBook.forEach((book) => {
      book.addEventListener("click", (e) => {
        const id = book.parentElement.parentElement.dataset.id;
        library.removeBook(id);
        this.printBooks();
      });
    });
  }

  printBooks() {
    let books = "";

    if (library.books.length === 0) {
      this.emptyLibImage.style.visibility = "visible";
      this.emptyLibImage.style.opacity = "0.1";
      document.querySelector(".your-books").style.display = "none";
    }

    if (library.books.length > 0) {
      for (let i = 0; i < library.books.length; i++) {
        books += `
      <div class="book" data-id="${i}">
        <div class="book-title">
          <span class="option">Title:</span>
          <h4 id="title">${library.books[i].title}</h4>
        </div>
        <div class="book-author">
          <span class="option">Author:</span>
          <h4 id="author">${library.books[i].author}</h4>
        </div>
        <div class="book-pages">
          <span class="option">Pages:</span>
          <h4 id="pages">${library.books[i].pages}</h4>
        </div>
        <div class="book-read">
          <span class="option">Read:</span>
          <h4 id="read">${library.books[i].read}</h4>
        </div>
        <div class="book-completion">
          <span class="option">Completion:</span>
          <h4 id="completion">${library.books[i].readPages} (${library.books[i].completion}%)</h4>
        </div>
        <div class="books-edit">
          <button type="button" class="button" id="edit">
            <span class="material-symbols-outlined">edit</span>
          </button>
          <button type="button" class="button delete" id="delete">
            <span class="material-symbols-outlined">delete</span>
          </button>
        </div>
      </div>`;
        this.emptyLibImage.style.visibility = "hidden";
        this.emptyLibImage.style.opacity = "0";
        document.querySelector(".your-books").style.display = "initial";
      }
    }

    document.querySelector(".books-container").innerHTML = books;
    this.deleteBookBtn();
    this.editBookBtn();
  }

  processFormData(id) {
    const title = document.getElementById("inputTitle").value;
    const author = document.getElementById("inputAuthor").value;
    const pages = document.getElementById("inputPages").value;
    const radio = document.querySelectorAll("input[type='radio']");
    const submitBtn = document.getElementById("addBookButton");

    let choice = "";
    let readPages = 0;
    let percentageCompletion = 0;
    let radioState = {
      read: false,
      unread: false,
      inProgress: false,
    };

    // CHECK WHICH RADIO IS CHECKED AND FIRE CORRESPONDING ACTION
    for (let i = 0; i < radio.length; i++) {
      if (radio[i].checked) {
        choice = radio[i].value;
        if (choice === "in progress") {
          readPages = document.querySelector(".completion").value;
          radioState.inProgress = true;
          if (+readPages > +pages) {
            alert("You can't read more than the book has");
            readPages = 0;
            return;
          } else if (+readPages === +pages) {
            choice = radio[0].value;
          }
        } else if (choice === "read") {
          readPages += +pages;
          radioState.read = true;
        } else {
          readPages = 0;
          radioState.unread = true;
        }
        percentageCompletion = ((readPages / pages) * 100).toFixed(2);
      }
    }

    if (submitBtn.dataset.type === "add") {
      library.books.push(
        new Book(
          title,
          author,
          pages,
          choice,
          readPages,
          percentageCompletion,
          radioState
        )
      );
    }
    if (submitBtn.dataset.type === "edit") {
      library.modifyBook(
        id,
        title,
        author,
        pages,
        choice,
        readPages,
        percentageCompletion,
        radioState
      );
    }
  }

  radioListener() {
    const radios = document.querySelectorAll("input[type='radio']");
    const inProgress = document.querySelector(".in-progress");
    // SHOW COMPLETION INPUT
    radios.forEach((radio) => {
      radio.addEventListener("change", (e) => {
        if (inProgress.checked) {
          this.showCompletion();
        } else {
          this.hideCompletion();
        }
      });
    });
  }

  formListener(id) {
    const form = document.getElementById("formAddBook");
    // PROCESS FORM DATA
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.processFormData(id);
      this.printBooks();
      this.closeModal();
      setTimeout(() => {
        this.clearInputs();
      }, 400);
    });
  }
}

const library = new Library();
const ui = new Display(library, modal, modalContent, emptyLibImage);
