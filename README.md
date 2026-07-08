# Dentist Appointment Calendar

A lightweight React calendar widget built for clinic front-desk staff to manage patient appointments, replacing manual paper and spreadsheet-based tracking.

## Overview

This application provides a simple, reliable interface for scheduling and viewing patient appointments. It was built to address operational slowdowns and data loss caused by manual scheduling methods, giving front-desk staff a fast and dependable digital tool.

## Features

- Monthly calendar view with day selection
- Add appointments with patient name and time
- Form validation with clear error indicators for missing or invalid input
- Empty state messaging when no appointments exist for a selected day
- Simulated loading state and network error handling to reflect real-world connectivity conditions
- Input sanitization to prevent injection of unsafe content
- Full keyboard navigation and ARIA labeling for accessibility
- Simulated analytics logging for key user interactions

## Tech Stack

- React (Vite)
- Plain CSS (no external UI frameworks)
- Hooks-based state management (`useState`, `useEffect`)

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm

### Installation

```bash
git clone https://github.com/SheeryRose/dentist-appointment-calendar.git
cd dentist-appointment-calendar
npm install
```

### Running the App

```bash
npm run dev
```

The application will be available at `http://localhost:5173/`.

### Linting

```bash
npm run lint
```

## Project Structure