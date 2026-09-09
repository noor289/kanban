const LABEL_PALETTE = [
  { name: "Bug", color: "#eb5a46" },
  { name: "Feature", color: "#61bd4f" },
  { name: "Urgent", color: "#f29100e1" },
  { name: "Backend", color: "#0079bf" }
];
const SWATCH_COLORS = [
  "#ff6b6b",
  "#20c997",
  "#845ef7",
  "#f06595",
  "#15aabf",
  "#fd7e14",
  "#12b886",
  "#be4bdb",
  "#4dabf7",
  "#82c91e",
  "#fab005",
  "#e64980",
  "#7950f2",
  "#0ca678",
  "#868e96",
  "#343a40"
];
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
}
loadBoardData();
