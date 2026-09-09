// Fixed palette of labels available to all cards
const LABEL_PALETTE = [
  { name: "Bug", color: "#eb5a46" },
  { name: "Feature", color: "#61bd4f" },
  { name: "Urgent", color: "#f29100e1" },
  { name: "Backend", color: "#0079bf" }
];

// Preset colors offered when creating a new custom label
const SWATCH_COLORS = [
  "#ff6b6b", // Coral
  "#20c997", // Teal green
  "#845ef7", // Purple
  "#f06595", // Pink
  "#15aabf", // Cyan
  "#fd7e14", // Orange
  "#12b886", // Emerald
  "#be4bdb", // Violet
  "#4dabf7", // Sky blue
  "#82c91e", // Lime green
  "#fab005", // Amber
  "#e64980", // Rose
  "#7950f2", // Indigo
  "#0ca678", // Green teal
  "#868e96", // Gray
  "#343a40"  // Dark gray
];

// This is our single source of truth for the entire board.
// No code should modify the DOM directly — only this object.
let boardData = {
  lists: [
    {
      id: "list-1",
      title: "To Do",
      isDefault: true,
      cards: [
        {
          id: "card-1",
          title: "Sample task 1",
          description: "",
          dueDate: null,
          labels: []
        },
        {
          id: "card-2",
          title: "Sample task 2",
          description: "",
          dueDate: null,
          labels: []
        },
        {
          id: "card-3",
          title: "Sample task 3",
          description: "",
          dueDate: null,
          labels: []
        }
      ]
    },
    {
      id: "list-2",
      title: "In Progress",
      isDefault: true,
      cards: []
    },
    {
      id: "list-3",
      title: "Completed",
      isDefault: true,
      cards: []
    }
  ]
};

// Small helper to generate unique IDs for new lists/cards later.
function generateId(prefix) {
  return prefix + "-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
}
const STORAGE_KEY = "kanban-board-data";

function saveBoardData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(boardData));
}

function loadBoardData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    boardData = JSON.parse(saved);
  }
  // if nothing saved yet, boardData just keeps its hardcoded default above
}

loadBoardData();
