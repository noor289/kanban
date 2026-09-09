# Kanban Task Board

A lightweight, Trello-style Kanban task board built with vanilla HTML, CSS, and JavaScript. No frameworks, no build step. Organize tasks across customizable columns with full drag-and-drop, due dates, colored labels, and a clean, distraction-free interface.

## Live Demo

[Kanban](https://kanban-jade-omega.vercel.app/)

## Features

- **Multi-column layout**: default "To Do", "In Progress", and "Completed" columns, plus unlimited custom columns
- **Full card management**: create, edit, and delete tasks with a title, description, due date, and labels
- **Drag and drop**: reorder cards within a column or move them between columns, with a live drop-position placeholder and smooth visual feedback (lift, shadow, slight rotation)
- **Due dates**: overdue tasks are automatically highlighted
- **Custom labels**: create your own colored labels beyond the built-in set (Bug, Feature, Urgent, Design, Backend)
- **Collapsible sidebar**: quick navigation between columns, with live card-count badges
- **Protected default lists**: "To Do", "In Progress", and "Completed" can't be deleted; user-created lists can be
- **Confirmation before delete**: for both cards and lists
- **Empty states**: clear "No tasks yet" messaging on empty columns
- **Persistent storage**: your board is saved to the browser's `localStorage`, so it survives a page refresh
- **Responsive layout**: 2-column grid view on mobile, full multi-column view on desktop
- **Accessible**: visible keyboard focus states, respects reduced-motion preferences

## How to use

1. Right-click any card to open it and edit the title, description, due date, or labels
2. Click "+ Add a card" at the bottom of a column to create a new task
3. Click "+ Add another list" to create a new column
4. Drag any card to reorder it or move it to a different column
5. Click the menu icon next to "Lists" in the sidebar to collapse or expand it
6. Click a list name in the sidebar to jump straight to that column

## Notes

- Data is stored per browser via `localStorage`. It will not sync across devices or browsers.
- Custom labels are shared globally across all cards but reset if the page's `localStorage` is cleared.

## Tech stack

Plain HTML, CSS, and JavaScript. No frameworks, no dependencies, no build tools.
