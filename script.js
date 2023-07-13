"strict mode";

const modal = document.querySelector(".modal");
const form = document.getElementById("formAddBook");
const radios = document.querySelectorAll("input[type='radio']");
const inProgress = document.querySelector(".in-progress");
const completion = document.querySelector(".completion-container");
let library = [];

function Book(title, author, pages, read, completion) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.completion = completion;

  this.info = function () {
    return `${this.title} by ${this.author} has ${this.pages} pages. Read: ${this.read}`;
  };
}

function addBook(title, author, pages, read, completion) {
  library.push(new Book(title, author, pages, read, completion));
}

function printBooks() {
  let books = "";
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
        <h4 id="completion">${library[i].completion}%</h4>
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
  }

  document.querySelector(".books-container").innerHTML = books;
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

function clearInputs() {
  document.getElementById("inputTitle").value = "";
  document.getElementById("inputAuthor").value = "";
  document.getElementById("inputPages").value = "";
  document.getElementById("readRadio").checked = true;
  document.getElementById("inputCompletion").value = "";
  hideCompletion();
}

function showCompletion() {
  completion.style.maxHeight = "100px";
  setTimeout(() => {
    completion.style.opacity = "1";
    completion.style.visibility = "visible";
  }, 260);
}

function hideCompletion() {
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
      console.log(button.parentElement.parentElement);
      library.splice(button.parentElement.parentElement.dataset.id, 1);
      // library.splice(e.target.parentElement.dataset.id, 1);
      printBooks();
    });
  });
}

// PROCESS FORM DATA
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("inputTitle").value;
  const author = document.getElementById("inputAuthor").value;
  const pages = document.getElementById("inputPages").value;
  const radio = document.querySelectorAll("input[type='radio']");
  let choice = "";
  let progress = 0;
  let percentageCompletion = 0;

  for (let i = 0; i < radio.length; i++) {
    if (radio[i].checked) {
      choice = radio[i].value;
      if (choice === "in progress") {
        progress = document.querySelector(".completion").value;
        if (progress > pages) {
          alert("You can't read more than the book has");
          progress = 0;
          return;
        }
      } else if (choice === "read") {
        progress += +pages;
      } else {
        progress = 0;
      }
      percentageCompletion = ((progress / pages) * 100).toFixed(2);
    }
  }

  addBook(title, author, pages, choice, percentageCompletion);
  printBooks();
  closeModal();
  setTimeout(() => {
    clearInputs();
  }, 400);
  removeBook();
});

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
