"strict mode";

const modal = document.querySelector(".modal");
const emptyLibImg = document.querySelector(".empty-lib-img");
let library = [];

function Book(title, author, pages, read, readPages, completion, radioState) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.readPages = readPages;
  this.completion = completion;
  this.radioState = radioState;

  this.info = function () {
    return `${this.title} by ${this.author} has ${this.pages} pages. Read: ${this.read}`;
  };
}

function modifyBook(title, author, pages, read, readPages, completion, id) {
  const libPos = library[id];
  libPos.title = title;
  libPos.author = author;
  libPos.pages = pages;
  libPos.read = read;
  libPos.readPages = readPages;
  libPos.completion = completion;
}

function printBooks() {
  let books = "";

  if (library.length === 0) {
    emptyLibImg.style.visibility = "visible";
    emptyLibImg.style.opacity = "0.1";
    document.querySelector(".your-books").style.display = "none";
  }

  if (library.length > 0) {
    for (let i = 0; i < library.length; i++) {
      books += `
    <div class="book" data-id="${i}">
      <div class="book-title">
        <span class="option">Title:</span>
        <h4 id="title">${library[i].title}</h4>
      </div>
      <div class="book-author">
        <span class="option">Author:</span>
        <h4 id="author">${library[i].author}</h4>
      </div>
      <div class="book-pages">
        <span class="option">Pages:</span>
        <h4 id="pages">${library[i].pages}</h4>
      </div>
      <div class="book-read">
        <span class="option">Read:</span>
        <h4 id="read">${library[i].read}</h4>
      </div>
      <div class="book-completion">
        <span class="option">Completion:</span>
        <h4 id="completion">${library[i].readPages} (${library[i].completion}%)</h4>
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

      emptyLibImg.style.visibility = "hidden";
      emptyLibImg.style.opacity = "0";
      document.querySelector(".your-books").style.display = "initial";
    }
  }

  document.querySelector(".books-container").innerHTML = books;
  removeBook();
  editBookBtn();
}

function openModal() {
  modal.style.display = "grid";
  setTimeout(() => {
    modal.style.visibility = "visible";
    modal.style.opacity = "1";
  }, 100);
}

function closeModal() {
  modal.style.visibility = "hidden";
  modal.style.opacity = "0";
  setTimeout(() => {
    modal.style.display = "none";
  }, 250);
}

function addBookModal() {
  const modalContent = document.querySelector(".modal-content");

  modalContent.innerHTML = `
        <span class="material-symbols-outlined close" onclick="closeModal()"
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
            <input
              type="radio"
              id="readRadio"
              value="read"
              name="read"
              checked
            />
            <label for="readRadio">Read</label>

            <input type="radio" id="unreadRadio" value="unread" name="read" />
            <label for="unreadRadio">Unread</label>
            <input
              type="radio"
              id="inProgessRadio"
              class="in-progress"
              value="in progress"
              name="read"
            />
            <label for="inProgessRadio">In progress</label>
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

  openModal();
  radioListener();
  formListener();
}

function editBookModal(id) {
  const modalContent = document.querySelector(".modal-content");

  library[id].radioState.read === "true" ? "checked" : "";

  modalContent.innerHTML = `
        <span class="material-symbols-outlined close" onclick="closeModal()"
          >close</span
        >
        <h3 class="modal-title">Edit book</h3>
        <form id="formAddBook" class="add-book-form" action="">
          <label for="inputTitle" class="option">Title:</label>
          <input type="text" id="inputTitle" class="input-text" required value="${
            library[id].title
          }"/>
          <label for="inputAuthor" class="option">Author:</label>
          <input type="text" id="inputAuthor" class="input-text" required value="${
            library[id].author
          }"/>
          <label for="inputPages" class="option">Pages:</label>
          <input
            type="text"
            id="inputPages"
            class="input-text"
            pattern="\\d*"
            required
            value="${library[id].pages}"
          />
          <fieldset class="read-fieldset">
            <legend class="option">Read:</legend>
            <input
              type="radio"
              id="readRadio"
              value="read"
              name="read"
              ${library[id].radioState.read === true ? "checked" : ""}
            />
            <label for="readRadio">Read</label>

            <input type="radio" id="unreadRadio" value="unread" name="read" 
            ${library[id].radioState.unread === true ? "checked" : ""}/>
            <label for="unreadRadio">Unread</label>
            <input
              type="radio"
              id="inProgessRadio"
              class="in-progress"
              value="in progress"
              name="read"
              ${library[id].radioState.inProgress === true ? "checked" : ""}
            />
            <label for="inProgessRadio">In progress</label>
            <div class="completion-container">
              <label for="inputCompletion" class="option">Completion:</label>
              <input
                type="text"
                id="inputCompletion"
                class="input-text completion"
                pattern="\\d*"
                placeholder="Number of pages read"
                value="${library[id].readPages}"
              />
            </div>
          </fieldset>
          <button type="submit" id="addBookButton" class="button add-book" data-type="edit">
            Apply Changes
          </button>
        </form>
  `;
  openModal();
  setTimeout(() => {
    library[id].radioState.inProgress === true ? showCompletion() : "";
  }, 250);
  radioListener();
  formListener(id);
}

function clearInputs() {
  document.getElementById("inputTitle").value = "";
  document.getElementById("inputAuthor").value = "";
  document.getElementById("inputPages").value = "";
  document.getElementById("readRadio").checked = true;
  document.getElementById("inputCompletion").value = "";
  hideCompletion();
}

function showCompletion() {
  const completion = document.querySelector(".completion-container");
  completion.style.maxHeight = "100px";
  setTimeout(() => {
    completion.style.opacity = "1";
    completion.style.visibility = "visible";
  }, 260);
}

function hideCompletion() {
  const completion = document.querySelector(".completion-container");
  completion.style.opacity = "0";
  completion.style.visibility = "hidden";
  setTimeout(() => {
    completion.style.maxHeight = "0px";
  }, 300);
}

function removeBook() {
  const deleteBook = document.querySelectorAll("#delete");
  // DELETE BOOK
  deleteBook.forEach((button) => {
    button.addEventListener("click", (e) => {
      library.splice(button.parentElement.parentElement.dataset.id, 1);
      console.log(library.length);
      printBooks();
    });
  });
}

function editBookBtn() {
  const editBook = document.querySelectorAll("#edit");

  editBook.forEach((button) => {
    const bookId = button.parentElement.parentElement.dataset.id;
    button.addEventListener("click", (e) => {
      editBookModal(bookId);
    });
  });
}

function processFormData(id) {
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
    library.push(
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
    modifyBook(
      title,
      author,
      pages,
      choice,
      readPages,
      percentageCompletion,
      id,
      radioState
    );
  }
}

function radioListener() {
  const radios = document.querySelectorAll("input[type='radio']");
  const inProgress = document.querySelector(".in-progress");
  // SHOW COMPLETION INPUT
  radios.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      if (inProgress.checked) {
        showCompletion();
      } else {
        hideCompletion();
      }
    });
  });
}

function formListener(id) {
  const form = document.getElementById("formAddBook");
  // PROCESS FORM DATA
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    processFormData(id);
    printBooks();
    closeModal();
    setTimeout(() => {
      clearInputs();
    }, 400);
  });
}
