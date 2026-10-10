# BlueLib Catalogue – Assignment 2

## Project Overview
BlueLib Catalogue is a responsive and interactive single-page front-end web application developed for the BlueCrest College Library. It allows students and staff to browse available books, filter them by category, search by title, check out available copies via a dynamic "Borrow" button, and add new books using a validated HTML form.

## Technologies Used
* **HTML5:** Semantic structural layout (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
* **CSS3:** Custom properties (variables), Flexbox, CSS Grid, and responsive design media queries.
* **Vanilla JavaScript (ES6+):** DOM manipulation, array methods (`filter`, `find`, `forEach`), event listeners, and dynamic template literals.

## Features Implemented
1. **Dynamic Rendering:** Displays an initial set of 6 book items stored in a JavaScript array as interactive UI cards.
2. **Search and Filter:** Real-time filtering by title input and category selection dropdown.
3. **Interactive Borrowing:** Decreases copy count on click; automatically toggles to "Out of stock" and disables the button when inventory reaches zero.
4. **Form Validation:** Validates user inputs on submission to ensure fields are populated and "Copies Available" is a valid whole number ($\ge 0$).