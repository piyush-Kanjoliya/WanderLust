# 🌍 WanderLust


A full-stack travel listing web application built with **Node.js**, **Express.js**, **MongoDB**, and **EJS** templating. WanderLust allows users to explore, create, and manage travel listings — designed as a beginner-friendly full-stack portfolio project demonstrating MVC architecture, RESTful routing, and database integration.

---

## 📋 Project Overview

WanderLust is a travel-focused web platform where users can browse and post travel destination listings. The project is built without any frontend framework — pure **HTML**, **CSS**, and **JavaScript** on the client side, powered by a robust **Node.js + Express** backend with **MongoDB** as the database.

> **Tech Stack:** MongoDB · Express.js · EJS · Node.js · HTML · CSS · JavaScript

---

## ✨ Features

| # | Feature | Description |
|---|---------|-------------|
| 1 | **Browse Listings** | View all travel destination listings on the home page |
| 2 | **Create Listing** | Add new travel destinations with title, description, price, location, and image |
| 3 | **View Details** | See full details of any individual listing |
| 4 | **Edit Listing** | Update existing listing information |
| 5 | **Delete Listing** | Remove listings with confirmation |
| 6 | **Responsive UI** | Clean and responsive design using custom CSS |
| 7 | **MVC Structure** | Organized codebase following Model-View-Controller pattern |

---

## 🗂️ Project Structure

```
WanderLust/
├── init/
│   └── index.js              # Database seeding / initialization script
├── models/
│   └── listing.js            # Mongoose schema & model for listings
├── public/
│   ├── css/                  # Custom stylesheets
│   └── js/                   # Client-side JavaScript
├── utils/
│   └── ExpressError.js       # Custom error handling utility
├── views/
│   ├── listings/             # EJS templates for listings (index, show, new, edit)
│   ├── includes/             # Partials (navbar, footer)
│   └── error.ejs             # Error page template
├── app.js                    # Main Express application entry point
├── package.json              # Project metadata and dependencies
└── .gitignore
```

---

## 🚀 How to Run Locally

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- npm (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/piyush-Kanjoliya/WanderLust.git

# 2. Navigate into the project directory
cd WanderLust

# 3. Install dependencies
npm install

# 4. Start MongoDB (if running locally)
mongod

# 5. (Optional) Seed the database with initial data
node init/index.js

# 6. Start the server
node app.js
```

### Run:

```
http://localhost:8080       # Open in your browser
```

---

## 🔗 RESTful Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/listings` | Display all listings |
| GET | `/listings/new` | Show form to create new listing |
| POST | `/listings` | Create a new listing |
| GET | `/listings/:id` | Show details of a specific listing |
| GET | `/listings/:id/edit` | Show form to edit a listing |
| PUT | `/listings/:id` | Update a specific listing |
| DELETE | `/listings/:id` | Delete a specific listing |

---

## 🛠️ Technologies Used

| Technology | Purpose |
|-----------|---------|
| **Node.js** | JavaScript runtime environment |
| **Express.js** | Web framework for routing and middleware |
| **MongoDB** | NoSQL database for storing listings |
| **Mongoose** | ODM for MongoDB schema and queries |
| **EJS** | Embedded JavaScript templating engine |
| **HTML/CSS** | Frontend structure and styling |
| **JavaScript** | Client-side interactivity |
| **method-override** | Supports PUT/DELETE in HTML forms |

---

## 📐 Application Architecture

```
Client (Browser)
      │
      ▼
  Express.js (app.js)
      │
      ├── Routes (/listings)
      │       │
      │       ▼
      │   Controller Logic
      │       │
      │       ├── Model (Mongoose → MongoDB)
      │       │
      │       └── View (EJS Templates)
      │
      └── Static Files (public/)
```

---

## 🔮 Future Improvements

- [ ] User authentication & authorization (Passport.js)
- [ ] Image upload support (Cloudinary / Multer)
- [ ] Reviews and ratings system
- [ ] Pagination for large datasets
- [ ] Input validation (Joi)

---

## 📚 Learning Goals

This project is ideal for:

- Learning **full-stack web development** from scratch
- Understanding **RESTful API design**
- Working with **MongoDB and Mongoose**
- Practicing **MVC architecture** in Node.js
- Building real-world **CRUD applications**
- Exploring **EJS templating** for server-side rendering

---

## 👤 Author

**Piyush Sharma** — [@piyush-Kanjoliya](https://github.com/piyush-Kanjoliya)

> *"This is my first full-stack project — built to learn and grow."*
