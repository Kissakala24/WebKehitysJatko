// ===============================
// 1) DOM references
// ===============================
const actions = document.getElementById("resourceActions");
const resourceNameContainer = document.getElementById("resourceNameContainer");
const resourceDesc = document.getElementById("resourceDescription");
const form = document.getElementById("resourceForm");

// Example role: can be "reserver" or "admin"
const role = "admin";

// Buttons
let createButton = null;
let updateButton = null;
let deleteButton = null;

// ===============================
// 2) Button helpers
// ===============================
const BUTTON_BASE_CLASSES =
  "w-full rounded-2xl px-6 py-3 text-sm font-semibold transition-all duration-200 ease-out";
const BUTTON_ENABLED_CLASSES = "bg-brand-primary text-white hover:bg-brand-dark/80 shadow-soft";

function addButton({ label, type = "button", value, classes = "" }) {
  const btn = document.createElement("button");
  btn.type = type;
  btn.textContent = label;
  btn.name = "action";
  if (value) btn.value = value;

  btn.className = `${BUTTON_BASE_CLASSES} ${classes}`.trim();
  actions.appendChild(btn);
  return btn;
}

function setButtonEnabled(btn, enabled) {
  if (!btn) return;
  btn.disabled = !enabled;
  btn.classList.toggle("cursor-not-allowed", !enabled);
  btn.classList.toggle("opacity-50", !enabled);
  if (!enabled) btn.classList.remove("hover:bg-brand-dark/80");
  else if (btn.value === "create" || btn.textContent === "Create") {
    btn.classList.add("hover:bg-brand-dark/80");
  }
}

// ===============================
// 3) Render action buttons
// ===============================
function renderActionButtons(currentRole) {
  if (currentRole === "reserver") {
    createButton = addButton({ label: "Create", type: "submit", classes: BUTTON_ENABLED_CLASSES });
  }
  if (currentRole === "admin") {
    createButton = addButton({ label: "Create", type: "submit", value: "create", classes: BUTTON_ENABLED_CLASSES });
    updateButton = addButton({ label: "Update", value: "update", classes: BUTTON_ENABLED_CLASSES });
    deleteButton = addButton({ label: "Delete", value: "delete", classes: BUTTON_ENABLED_CLASSES });
  }

  // Disable initially
  setButtonEnabled(createButton, false);
  setButtonEnabled(updateButton, false);
  setButtonEnabled(deleteButton, false);
}

// ===============================
// 4) Input creation & validation
// ===============================
function createResourceNameInput(container) {
  const input = document.createElement("input");
  input.id = "resourceName";
  input.name = "resourceName";
  input.type = "text";
  input.placeholder = "e.g., Meeting Room A";
  input.className = `
    mt-2 w-full rounded-2xl border border-black/10 bg-white
    px-4 py-3 text-sm outline-none
    focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/30
    transition-all duration-200 ease-out
  `;
  container.appendChild(input);
  return input;
}

function isResourceNameValid(value) {
  const trimmed = value.trim();
  const allowedPattern = /^[a-zA-Z0-9äöåÄÖÅ ]+$/;
  return trimmed.length >= 5 && trimmed.length <= 30 && allowedPattern.test(trimmed);
}

function isResourceDescriptionValid(value) {
  const trimmed = value.trim();
  const allowedPattern = /^[a-zA-Z0-9äöåÄÖÅ ,.!?()-]+$/;
  return trimmed.length >= 10 && trimmed.length <= 50 && allowedPattern.test(trimmed);
}

function setInputVisualState(input, state) {
  input.classList.remove(
    "border-green-500",
    "bg-green-100",
    "focus:ring-green-500/30",
    "border-red-500",
    "bg-red-100",
    "focus:ring-red-500/30",
    "focus:border-brand-blue",
    "focus:ring-brand-blue/30"
  );
  input.classList.add("focus:ring-2");

  if (state === "valid") input.classList.add("border-green-500", "bg-green-100", "focus:ring-green-500/30");
  else if (state === "invalid") input.classList.add("border-red-500", "bg-red-100", "focus:ring-red-500/30");
}

function attachValidation(input, validator) {
  const update = () => {
    const value = input.value;
    const valid = validator(value);
    setInputVisualState(input, value === "" ? "neutral" : valid ? "valid" : "invalid");

    // Enable create only if both fields valid
    const nameValid = isResourceNameValid(resourceNameInput.value);
    const descValid = isResourceDescriptionValid(resourceDesc.value);
    setButtonEnabled(createButton, nameValid && descValid);
  };
  input.addEventListener("input", update);
  update();
}

// ===============================
// 5) Bootstrap
// ===============================
renderActionButtons(role);
const resourceNameInput = createResourceNameInput(resourceNameContainer);
attachValidation(resourceNameInput, isResourceNameValid);
attachValidation(resourceDesc, isResourceDescriptionValid);



