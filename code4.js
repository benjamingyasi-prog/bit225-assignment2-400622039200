// Initial Book Array containing at least 6 book objects
let books = [
    { id: 1, title: "Database System Concepts", author: "Avi Silberschatz", category: "IT", copies: 5 },
    { id: 2, title: "Modern Operating Systems", author: "Andrew S. Tanenbaum", category: "IT", copies: 2 },
    { id: 3, title: "Principles of Marketing", author: "Philip Kotler", category: "Business", copies: 0 },
    { id: 4, title: "Fundamentals of Physics", author: "Halliday & Resnick", category: "Science", copies: 4 },
    { id: 5, title: "Introduction to Algorithms", author: "Thomas H. Cormen", category: "IT", copies: 3 },
    { id: 6, title: "History of Modern Art", author: "H.H. Arnason", category: "Arts", copies: 1 }
];

// DOM Elements
const bookContainer = document.getElementById('bookContainer');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const addBookForm = document.getElementById('addBookForm');
const formMessage = document.getElementById('formMessage');

// Function to render books dynamically into the DOM
function renderBooks(booksToRender) {
    bookContainer.innerHTML = '';

    if (booksToRender.length === 0) {
        bookContainer.innerHTML = '<p>No books found matching your criteria.</p>';
        return;
    }

    booksToRender.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';

        // Set card structure and data binding
        card.innerHTML = `
            <div>
                <h3>${book.title}</h3>
                <span class="badge">${book.category}</span>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Copies Available:</strong> <span id="copies-${book.id}">${book.copies}</span></p>
            </div>
            <button onclick="borrowBook(${book.id})" id="btn-${book.id}" ${book.copies === 0 ? 'disabled' : ''}>
                ${book.copies === 0 ? 'Out of stock' : 'Borrow'}
            </button>
        `;
        bookContainer.appendChild(card);
    });
}

// Function to handle the "Borrow" button action
function borrowBook(id) {
    const book = books.find(b => b.id === id);
    if (book && book.copies > 0) {
        book.copies -= 1;
        filterAndSearchBooks(); // Re-render keeping current filter/search states
    }
}

// Function to handle Search and Filter logic simultaneously
function filterAndSearchBooks() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;

    const filtered = books.filter(book => {
        const matchesTitle = book.title.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === "" || book.category === selectedCategory;
        return matchesTitle && matchesCategory;
    });

    renderBooks(filtered);
}

// Event Listeners for search input and category filter dropdown
searchInput.addEventListener('input', filterAndSearchBooks);
categoryFilter.addEventListener('change', filterAndSearchBooks);

// Event Listener for Adding a New Book via Form Submission with Validation
addBookForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent page reload

    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();
    const category = document.getElementById('category').value;
    const copiesInput = document.getElementById('copies').value;
    const copies = parseInt(copiesInput, 10);

    // Validation checks
    if (!title || !author || !category || copiesInput === "") {
        formMessage.textContent = "All fields must be filled out correctly.";
        return;
    }

    if (isNaN(copies) || copies < 0 || !Number.isInteger(Number(copiesInput))) {
        formMessage.textContent = "Copies available must be a whole number of 0 or more.";
        return;
    }

    // Clear error message if validation passes
    formMessage.textContent = "";

    // Create new book object and push to array
    const newBook = {
        id: Date.now(), // Unique ID using timestamp
        title: title,
        author: author,
        category: category,
        copies: copies
    };

    books.push(newBook);

    // Reset form fields
    addBookForm.reset();

    // Refresh the catalogue view
    filterAndSearchBooks();
    
    alert("Book successfully added to the catalogue!");
});

// Initial render call when the page loads
document.addEventListener('DOMContentLoaded', () => {
    renderBooks(books);
});