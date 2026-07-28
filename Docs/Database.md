# Database Documentation

## Overview

The database is responsible for storing the SSH login entries collected by the backend.

The main purpose of the database is to make the data persistent. Without a database, all collected information would be lost when the application is closed.

The database allows the application to store previous SSH login attempts and access them again when the application starts.

---

# Why SQLite?

For this project, I decided to use SQLite as the database system.

The main reason was the available development time and the simplicity of SQLite. Compared to larger database systems like MySQL or PostgreSQL, SQLite was easier to learn and faster to integrate into my project.

Because this project is an MVP, I wanted to focus my time on building the main functionality instead of spending a large amount of time learning a more complex database system.

SQLite was enough for my requirements because the project mainly needs local storage for SSH login data.

---

# Database Role in the Project

The database has one main responsibility:

- Store SSH login entries permanently.

The application should not lose its collected data when it is closed.

The data flow works like this:

```text
Linux Authentication Log
          │
          ▼
      Log Parser
          │
          ▼
 JavaScript Object
          │
          ▼
 SQLite Database
          │
          ▼
      Backend
          │
          ▼
    Electron UI
```

The database only stores and provides data.

The backend handles the processing and communication with the UI.

---

# Database Structure

The current database structure is intentionally simple.

The SSH logs are stored inside one table.

## Table: ssh_logs

| Column | Description |
|---|---|
| ip | Stores the IP address of the login attempt |
| username | Stores the username used during the login attempt |
| attemps | Stores the number of failed attempts |
| timestaps | Stores the timestamp of the login attempt |

Example:

```javascript
{
    ip: "192.168.1.199",
    username: "maintest",
    attemps: 1,
    timestaps: "2026-07-27T09:32:22"
}
```

---

# Database Design Decisions

During development, I made some decisions to keep the MVP simple.

The `attemps` column was not originally planned, but during development it was already integrated into the project.

Changing the database structure at that point would have required changing many parts of the application, so I decided to keep the current structure for the MVP.

In a future version, I would improve the database schema and rename some fields to make the structure cleaner.

---

# Database File Structure

All database-related code is stored in its own file.

I separated the database logic from the rest of the application because it makes debugging and maintenance easier.

Instead of writing database commands throughout the project, all database operations are handled in one place.

The database file contains functions for managing the stored data.

Examples:

- Insert new entries
- Delete entries
- Update existing entries

Each function has one clear responsibility.

Example:

```javascript
insert()
```

The purpose of this function is to insert new SSH login data into the database.

---

# SQLite Connection

To connect SQLite with JavaScript, I used the `better-sqlite3` library.

I chose this library because it simplified the connection between the backend and SQLite.

The SQL queries themselves were mostly written manually.

Because I already had previous knowledge of SQL syntax, I was able to create the required database operations.

During development, I had some difficulties understanding functions like:

```javascript
.prepare()
```

and:

```javascript
.run()
```

However, by testing and debugging, I learned how these functions work and how they interact with the database.

---

# Communication With The UI

The UI never communicates directly with the database.

The communication happens through the backend.

This was done intentionally for security and better code organization.

The structure is:

```text
UI
 │
 │ Request data
 ▼
Backend
 │
 │ Database functions
 ▼
SQLite
```

The backend is responsible for:

- Receiving requests.
- Getting data from the database.
- Processing the data.
- Sending the result to the UI.

This keeps each part of the application separated.

---

# Future Improvements

If I continue developing this project, I would improve the database by:

- Fixing naming mistakes in the column names.
- Improving the database structure.
- Creating a cleaner data model.
- Preparing the database for future features like the flagging system.

The current database is designed for the MVP, but it can be expanded later.

---

# Lessons Learned

While building the database, I learned:

- How databases make application data persistent.
- How to connect SQLite with JavaScript.
- How to write SQL queries manually.
- How backend and database communication works.
- The importance of consistent naming.

One important lesson was that small naming mistakes can create large problems.

For example, a missing character in a property name can cause data to become `undefined` and break the communication between different parts of the application.

---

# Summary

| Component | Status |
|---|---|
| SQLite Connection | ✅ Working |
| Database Storage | ✅ Working |
| Insert Function | ✅ Working |
| Backend Communication | ✅ Working |
| UI Direct Database Access | ❌ Not used |
| Future Schema Improvements | Planned |
