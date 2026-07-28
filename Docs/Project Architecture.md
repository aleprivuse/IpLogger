# Project Architecture

## Overview

This project is divided into four main components.

Each component has one responsibility, making the code easier to understand, maintain and debug.

The application monitors Linux SSH authentication logs, extracts failed login attempts, stores them inside an SQLite database and displays the information through an Electron desktop application.

* * *

# High-Level Architecture

```
                Linux System
                     │
                     │
             /var/log/auth.log
                     │
                     ▼
              Log Parser (Backend)
                     │
                     │ Creates
                     ▼
             JavaScript Objects
                     │
                     │ Stores
                     ▼
             SQLite Database
                     │
                     │ Requests
                     ▼
           Electron Main Process
                     │
                     │ IPC
                     ▼
          Electron Renderer (UI)
                     │
                     ▼
              User Interface
```

* * *

# Components

## Backend

The backend is responsible for reading the authentication logs and converting raw text into structured data.

Responsibilities:

-   Read Linux authentication logs.
    
-   Parse failed SSH login attempts.
    
-   Create JavaScript objects.
    
-   Insert parsed data into the database.
    

The backend never communicates directly with the user interface.

* * *

## Database

SQLite is used as the project's storage layer.

Responsibilities:

-   Store parsed login attempts.
    
-   Preserve historical data.
    
-   Provide data to the Electron application.
    

The database never parses logs or updates the user interface.

* * *

## Electron

Electron connects the backend with the frontend.

Responsibilities:

-   Create the desktop application.
    
-   Handle IPC communication.
    
-   Load data from the database.
    
-   Send the data to the renderer process.
    

Electron acts as the bridge between the backend and the user interface.

* * *

## User Interface

The renderer process displays the stored information.

Responsibilities:

-   Display login attempts.
    
-   Present information in a readable format.
    
-   Refresh displayed data.
    

The renderer never accesses the database directly.

All communication happens through Electron IPC.

* * *

# Why This Architecture?

Instead of putting everything inside one file, every component has a single responsibility.

Benefits:

-   Easier debugging.
    
-   Easier maintenance.
    
-   Easier to add new features.
    
-   Cleaner code structure.
    

For example, adding the future flagging system will only require changes inside the backend and renderer without modifying the parser itself.

* * *

# Current Data Flow

```
Linux Authentication Log
        │
        ▼
Parser
        │
        ▼
Attempt Object
        │
        ▼
SQLite Database
        │
        ▼
Electron IPC
        │
        ▼
Renderer
        │
        ▼
User Interface
```

Every component performs only one task before passing the data to the next layer.