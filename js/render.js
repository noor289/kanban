function isOverdue(dueDateStr) {
  const due = new Date(dueDateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return due < today;
}
function formatDueDate(dueDateStr) {
  const due = new Date(dueDateStr);
  return due.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric"
  });
}
function renderSidebar() {
  const sidebarItems = document.getElementById("sidebarItems");

  sidebarItems.innerHTML = "";
  boardData.lists.forEach(list => {
    const itemEl = document.createElement("button");
    itemEl.className = "sidebar-item";
    itemEl.dataset.listId = list.id;
    itemEl.innerHTML = `
      <span class="sidebar-item-name">${list.title}</span>
      <span class="sidebar-item-count">${list.cards.length}</span>
    `;
    itemEl.addEventListener("click", () => {
      const targetList = document.querySelector(
        `.list[data-list-id="${list.id}"]`
      );
      if (targetList) {
        targetList.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest"
        });
      }
    });
    sidebarItems.appendChild(itemEl);
  });
}
function renderBoard() {
  const board = document.getElementById("board");
  board.innerHTML = "";
  boardData.lists.forEach(list => {
    const listEl = document.createElement("section");

    listEl.className = "list";
    listEl.dataset.listId = list.id;
    const headerEl = document.createElement("div");

    headerEl.className = "list-header";

    headerEl.innerHTML = `
      <h2 class="list-title">${list.title}</h2>
      <span class="card-count">${list.cards.length}</span>
      ${
        list.isDefault
          ? ""
          : `<button class="delete-list-btn" data-list-id="${list.id}">🗑</button>`
      }
    `;

    listEl.appendChild(headerEl);
    const cardsContainerEl = document.createElement("div");
    cardsContainerEl.className = "cards-container";
    cardsContainerEl.dataset.listId = list.id;
    cardsContainerEl.addEventListener("dragover", handleDragOver);
    cardsContainerEl.addEventListener("drop", handleDrop);
    if (list.cards.length === 0) {
      const emptyEl = document.createElement("div");
      emptyEl.className = "empty-state";
      emptyEl.textContent = "No tasks yet — add one!";
      cardsContainerEl.appendChild(emptyEl);
    } else {
      list.cards.forEach(card => {
        const cardEl = document.createElement("div");
        cardEl.className = "card";
        cardEl.dataset.cardId = card.id;
        cardEl.draggable = true;
        const titleEl = document.createElement("div");
        titleEl.className = "card-title";
        titleEl.textContent = card.title;
        cardEl.appendChild(titleEl);
        if (card.labels && card.labels.length > 0) {
          const labelsEl = document.createElement("div");
          labelsEl.className = "card-labels";
          card.labels.forEach(labelName => {
            const labelData = LABEL_PALETTE.find(
              l => l.name === labelName
            );
            if (!labelData) {
              return;
            }
            const tag = document.createElement("span");
            tag.className = "label-tag";
            tag.style.backgroundColor = labelData.color;
            tag.textContent = labelData.name;
            labelsEl.appendChild(tag);
          });
          cardEl.appendChild(labelsEl);
        }
        if (card.dueDate) {
          const dueEl = document.createElement("div");
          dueEl.className = "card-due-date";
          dueEl.textContent = formatDueDate(card.dueDate);
          if (isOverdue(card.dueDate)) {
            dueEl.classList.add("overdue");
          }
          cardEl.appendChild(dueEl);
        }
        cardEl.addEventListener("dragstart", handleDragStart);
        cardEl.addEventListener("dragend", handleDragEnd);
        cardsContainerEl.appendChild(cardEl);
      });
    }
    listEl.appendChild(cardsContainerEl);
    const addCardBtn = document.createElement("button");
    addCardBtn.className = "add-card-btn";
    addCardBtn.textContent = "+ Add a card";
    listEl.appendChild(addCardBtn);
    board.appendChild(listEl);
  });
  const addListBtn = document.createElement("button");
  addListBtn.className = "add-list-btn";
  addListBtn.textContent = "+ Add another list";
  board.appendChild(addListBtn);
  renderSidebar();
  saveBoardData();
}
