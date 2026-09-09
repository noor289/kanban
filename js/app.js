const board = document.getElementById("board");
board.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-card-btn")) {
    showAddCardForm(e.target);
  }
  if (e.target.classList.contains("add-list-btn")) {
    showAddListForm(e.target);
  }
  if (e.target.classList.contains("delete-list-btn")) {
    const listId = e.target.dataset.listId;
    const list = boardData.lists.find(l => l.id === listId);
    const confirmed = confirm(
      `Delete "${list.title}" and all its cards? This can't be undone.`
    );
    if (confirmed) {
      boardData.lists = boardData.lists.filter(
        l => l.id !== listId
      );

      renderBoard();
    }
  }
  if (e.target.classList.contains("cancel-btn")) {
    renderBoard();
  }
  if (e.target.classList.contains("submit-card-btn")) {
    const listId = e.target.dataset.listId;
    const wrapper = e.target.closest(".add-card-form");
    const textarea = wrapper.querySelector(".add-card-input");
    const title = textarea.value.trim();
    if (title !== "") {
      const list = boardData.lists.find(
        l => l.id === listId
      );
      list.cards.push({
        id: generateId("card"),
        title: title,
        description: "",
        dueDate: null,
        labels: []
      });
      renderBoard();
    }
  }
  if (e.target.classList.contains("submit-list-btn")) {
    const wrapper = e.target.closest(".add-list-form");
    const input = wrapper.querySelector(".add-list-input");
    const title = input.value.trim();
    if (title !== "") {
      boardData.lists.push({
        id: generateId("list"),
        title: title,
        isDefault: false,
        cards: []
      });
      renderBoard();
    }
  }
});
board.addEventListener("contextmenu", (e) => {
  const card = e.target.closest(".card");
  if (card) {
    e.preventDefault();
    openEditModal(card.dataset.cardId);
  }
});
function showAddCardForm(button) {
  const listId = button.closest(".list").dataset.listId;
  const formHTML = `
    <textarea
      class="add-card-input"
      placeholder="Enter a card title..."
      rows="3"
    ></textarea>
    <div class="form-actions">
      <button
        class="submit-card-btn"
        data-list-id="${listId}"
      >
        Add card
      </button>

      <button class="cancel-btn">✕</button>
    </div>
  `;
  const wrapper = document.createElement("div");
  wrapper.className = "add-card-form";
  wrapper.innerHTML = formHTML;
  button.replaceWith(wrapper);
  wrapper.querySelector("textarea").focus();
}
function showAddListForm(button) {
  const formHTML = `
    <input
      type="text"
      class="add-list-input"
      placeholder="Enter list title..."
    />
    <div class="form-actions">
      <button class="submit-list-btn">
        Add list
      </button>
      <button class="cancel-btn">✕</button>
    </div>
  `;
  const wrapper = document.createElement("div");
  wrapper.className = "add-list-form";
  wrapper.innerHTML = formHTML;
  button.replaceWith(wrapper);
  wrapper.querySelector("input").focus();
}
const sidebarToggle = document.getElementById("sidebarToggle");
const sidebar = document.getElementById("sidebar");
sidebarToggle.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
});
