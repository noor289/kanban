let currentEditingCardId = null;
const modalOverlay = document.getElementById("modalOverlay");
const editTitleInput = document.getElementById("editTitleInput");
const editDescInput = document.getElementById("editDescInput");
const editDueDateInput = document.getElementById("editDueDateInput");
const deleteConfirm = document.getElementById("deleteConfirm");
const labelPicker = document.getElementById("labelPicker");

let selectedSwatchColor = SWATCH_COLORS[0];
function findCardById(cardId) {
  for (const list of boardData.lists) {
    const card = list.cards.find(c => c.id === cardId);
    if (card) {
      return card;
    }
  }
  return null;
}
function findListContainingCard(cardId) {
  return boardData.lists.find(list =>
    list.cards.some(c => c.id === cardId)
  );
}
function renderLabelPicker(card) {
  labelPicker.innerHTML = "";
  LABEL_PALETTE.forEach(label => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "label-chip";
    chip.textContent = label.name;
    chip.style.backgroundColor = label.color;
    const isActive = card.labels.includes(label.name);
    if (isActive) {
      chip.classList.add("active");
    }
    chip.addEventListener("click", () => {
      if (card.labels.includes(label.name)) {
        card.labels = card.labels.filter(
          l => l !== label.name
        );
      } else {
        card.labels.push(label.name);
      }
      renderLabelPicker(card);
    });
    labelPicker.appendChild(chip);
  });
  const createBtn = document.createElement("button");
  createBtn.type = "button";
  createBtn.className = "create-label-btn";
  createBtn.textContent = "+ Create label";
  createBtn.addEventListener("click", () => {
    renderCreateLabelForm(card);
  });
  labelPicker.appendChild(createBtn);
}
function renderCreateLabelForm(card) {
  const formEl = document.createElement("div");
  formEl.className = "create-label-form";
  formEl.innerHTML = `
    <input
      type="text"
      class="new-label-name"
      placeholder="Label name..."
      maxlength="20"
    />
    <div class="swatch-row"></div>
    <div class="form-actions">
      <button type="button" class="submit-new-label-btn">Add</button>
      <button type="button" class="cancel-btn">✕</button>
    </div>
  `;
  const swatchRow = formEl.querySelector(".swatch-row");
  SWATCH_COLORS.forEach(color => {
    const swatch = document.createElement("button");
    swatch.type = "button";
    swatch.className = "swatch";
    swatch.style.backgroundColor = color;
    if (color === selectedSwatchColor) {
      swatch.classList.add("selected");
    }
    swatch.addEventListener("click", () => {
      selectedSwatchColor = color;
      swatchRow
        .querySelectorAll(".swatch")
        .forEach(s => s.classList.remove("selected"));
      swatch.classList.add("selected");
    });
    swatchRow.appendChild(swatch);
  });
  formEl
    .querySelector(".submit-new-label-btn")
    .addEventListener("click", () => {
      const nameInput = formEl.querySelector(".new-label-name");
      const name = nameInput.value.trim();
      if (name === "") {
        return;
      }
      LABEL_PALETTE.push({
        name: name,
        color: selectedSwatchColor
      });
      card.labels.push(name);
      renderLabelPicker(card);
    });
  formEl
    .querySelector(".cancel-btn")
    .addEventListener("click", () => {
      renderLabelPicker(card);
    });
  const createBtn = labelPicker.querySelector(".create-label-btn");
  createBtn.replaceWith(formEl);
  formEl.querySelector(".new-label-name").focus();
}
function openEditModal(cardId) {
  const card = findCardById(cardId);
  if (!card) {
    return;
  }
  currentEditingCardId = cardId;
  editTitleInput.value = card.title;
  editDescInput.value = card.description || "";
  editDueDateInput.value = card.dueDate || "";
  deleteConfirm.style.display = "none";
  renderLabelPicker(card);
  modalOverlay.style.display = "flex";
  editTitleInput.focus();
}
function closeModal() {
  modalOverlay.style.display = "none";
  currentEditingCardId = null;
}
function saveCurrentCard() {
  const card = findCardById(currentEditingCardId);

  if (!card) {
    return;
  }
  const newTitle = editTitleInput.value.trim();

  if (newTitle === "") {
    return;
  }
  card.title = newTitle;
  card.description = editDescInput.value.trim();
  card.dueDate = editDueDateInput.value || null;
  renderBoard();
  closeModal();
}
function deleteCurrentCard() {
  const list = findListContainingCard(currentEditingCardId);

  if (!list) {
    return;
  }
  list.cards = list.cards.filter(
    c => c.id !== currentEditingCardId
  );
  renderBoard();
  closeModal();
}
document
  .getElementById("modalCloseBtn")
  .addEventListener("click", closeModal);
document
  .getElementById("saveCardBtn")
  .addEventListener("click", saveCurrentCard);
document
  .getElementById("deleteCardBtn")
  .addEventListener("click", () => {
    deleteConfirm.style.display = "block";
  });
document
  .getElementById("cancelDeleteBtn")
  .addEventListener("click", () => {
    deleteConfirm.style.display = "none";
  });
document
  .getElementById("confirmDeleteBtn")
  .addEventListener("click", deleteCurrentCard);
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    closeModal();
  }
});
