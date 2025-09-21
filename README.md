<img width="951" height="478" alt="image" src="https://github.com/user-attachments/assets/24685dc5-7490-432a-94fd-0043defdf2f1" />


Getting Started
Install dependencies
npm install

Run the project

You need two terminals:

Frontend (React app)

npm start


Open http://localhost:3000

Backend (Mock API with json-server)

npm run server


Open http://localhost:4000/books

How it works

Frontend:

React handles the UI.

React Router manages pages (/, /books/new, /books/:id/edit).

React Query fetches/caches data and updates automatically after add/edit/delete.

Tailwind CSS gives fast, utility-based styling.

Axios talks to the backend.

Backend:

json-server serves the db.json file as a full REST API.

Supports GET /books, POST /books, PUT /books/:id, DELETE /books/:id.
