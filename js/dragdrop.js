let draggedCardId = null;
function handleDragStart(e) {
  draggedCardId = e.currentTarget.dataset.cardId;
  e.currentTarget.classList.add("dragging");
  e.dataTransfer.setData("text/plain", draggedCardId);
  e.dataTransfer.effectAllowed = "move";
}
function handleDragEnd(e) {
  e.currentTarget.classList.remove("dragging");
  removePlaceholder();
  draggedCardId = null;
}
function handleDragOver(e) {
  e.preventDefault();
  const container = e.currentTarget;
  const afterElement = getCardAfterPosition(container, e.clientY);
  showPlaceholder(container, afterElement);
}
function handleDrop(e) {
  e.preventDefault();
  const targetListId = e.currentTarget.dataset.listId;
  if (!draggedCardId) return;
  const sourceList = findListContainingCard(draggedCardId);
  const cardIndex = sourceList.cards.findIndex(c => c.id === draggedCardId);
  const [movedCard] = sourceList.cards.splice(cardIndex, 1);
  const container = e.currentTarget;
  const afterElement = getCardAfterPosition(container, e.clientY);
  const targetList = boardData.lists.find(l => l.id === targetListId);
  if (afterElement == null) {
    targetList.cards.push(movedCard); // dropped at the end
  } else {
    const afterCardId = afterElement.dataset.cardId;
    const insertIndex = targetList.cards.findIndex(c => c.id === afterCardId);
    targetList.cards.splice(insertIndex, 0, movedCard);
  }
  removePlaceholder();
  renderBoard();
}
function getCardAfterPosition(container, mouseY) {
  const cards = [...container.querySelectorAll(".card:not(.dragging)")];
  return cards.reduce((closest, card) => {
    const box = card.getBoundingClientRect();
    const offset = mouseY - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: card };
    } else {
      return closest;
    }
  }, { offset: -Infinity, element: null }).element;
}
function showPlaceholder(container, afterElement) {
  removePlaceholder(); // only ever one placeholder on screen
  const placeholder = document.createElement("div");
  placeholder.className = "drop-placeholder";
  if (afterElement == null) {
    container.appendChild(placeholder);
  } else {
    container.insertBefore(placeholder, afterElement);
  }
}
function removePlaceholder() {
  document.querySelectorAll(".drop-placeholder").forEach(el => el.remove());
}
