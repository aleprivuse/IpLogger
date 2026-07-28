# IP Logger

## Status

Work in Proggress

## Description

IP Logger is a desktop application built with Electron and Node.js that collects, stores, and displays IP-related logs.

The application uses Electron's main process and renderer process architecture, with IPC communication and preload scripts to safely connect frontend functionality with backend operations.

Data is stored locally using SQLite through the `better-sqlite3` library, allowing the application to save and retrieve logs efficiently.

This project focuses on learning and applying desktop application development concepts, including:

- Electron application architecture
- Main process and renderer process communication
- Preload scripts and context bridging
- IPC communication
- Local database integration
- Frontend DOM manipulation

---

## Features

- Display stored IP logs in a table
- Retrieve log data from a local database
- Store and manage application data using SQLite
- Communicate between Electron processes using IPC
- Separate frontend and backend responsibilities

---

## Technologies Used

- Electron
- Node.js
- JavaScript
- HTML/CSS
- SQLite
- better-sqlite3

---

## Purpose

This project was created as part of an SSH hardening lab to explore security monitoring and logging concepts.

The goal was to build a desktop application capable of collecting, storing, and displaying SSH-related log information in a structured way.

Through this project, I am learning how security tools can interact with system logs, databases, and user interfaces while applying concepts such as:

- SSH security hardening
- Log monitoring and analysis
- Database storage
- Desktop application development
- Communication between application layers

The project combines cybersecurity concepts with software development by creating a practical tool for analyzing authentication-related events.


