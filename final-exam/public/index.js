let selectedPersonId = null;

async function loadCustomers() {
  const container = document.getElementById("customer-list");
  try {
    const res = await fetch("/api/persons");
    if (!res.ok) throw new Error("Failed to fetch data");
    const data = await res.json();

    container.innerHTML = "";
    if (data.length === 0) {
      container.innerHTML = "<p>No customers found.</p>";
      return;
    }

    data.forEach(person => {
      const div = document.createElement("div");
      div.className = "customer-card";
      div.dataset.id = person.id;
      div.innerHTML = `
        <strong>${person.first_name} ${person.last_name}</strong><br>
        Email: ${person.email}<br>
        Phone: ${person.phone || "-"}
      `;
      div.addEventListener("click", () => selectPerson(person));
      container.appendChild(div);
    });
  } catch (err) {
    console.error(err);
    container.innerHTML = "<p style='color:red;'>Error loading data</p>";
  }
}

function selectPerson(person) {
  selectedPersonId = person.id;

  document.getElementById("first_name").value = person.first_name;
  document.getElementById("last_name").value = person.last_name;
  document.getElementById("email").value = person.email;
  document.getElementById("phone").value = person.phone || "";
  document.getElementById("birth_date").value = person.birth_date
    ? person.birth_date.substring(0, 10)
    : "";

  document.getElementById("delete-btn").style.display = "inline-block";
  document.getElementById("add-btn").textContent = "Add Customer";

  document.querySelectorAll(".customer-card").forEach(card => {
    card.classList.toggle("selected", card.dataset.id == person.id);
  });
}

function clearForm() {
  selectedPersonId = null;
  document.getElementById("person-form").reset();
  document.getElementById("delete-btn").style.display = "none";
  document.getElementById("add-btn").textContent = "Add Customer";
  document.querySelectorAll(".customer-card").forEach(card => {
    card.classList.remove("selected");
  });
}

document.getElementById("person-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const body = {
    first_name: document.getElementById("first_name").value.trim(),
    last_name: document.getElementById("last_name").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    birth_date: document.getElementById("birth_date").value || null,
  };

  try {
    const res = await fetch("/api/persons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (!res.ok) {
      alert("Error: " + (data.error || "Failed to add customer"));
      return;
    }

    clearForm();
    loadCustomers();
  } catch (err) {
    console.error(err);
    alert("Network error");
  }
});

document.getElementById("delete-btn").addEventListener("click", async () => {
  if (!selectedPersonId) return;
  if (!confirm("Are you sure you want to delete this customer?")) return;

  try {
    const res = await fetch(`/api/persons/${selectedPersonId}`, {
      method: "DELETE",
    });

    const data = await res.json();
    if (!res.ok) {
      alert("Error: " + (data.error || "Failed to delete customer"));
      return;
    }

    clearForm();
    loadCustomers();
  } catch (err) {
    console.error(err);
    alert("Network error");
  }
});

loadCustomers();
