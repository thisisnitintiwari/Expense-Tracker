document.addEventListener("DOMContentLoaded", () => {
  const inputName = document.getElementById("name-input");
  const inputAmount = document.getElementById("amount-input");
  const addButton = document.getElementById("add-button");
  const expenseList = document.getElementById("expense-list");
  const totalValue = document.getElementById("total-amount");
  const form = document.getElementById("expense-form");

  let expense = JSON.parse(localStorage.getItem("expenses")) || [];
  renderExpense();
  let totalExpense = calcualteExpense();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = inputName.value.trim();
    const amount = inputAmount.value.trim();

    if (!name || !amount) return;

    const data = {
      id: Date.now(),
      name: name,
      amount: parseFloat(amount),
    };

    //now i have to put this data into expense list
    expense.push(data);
    saveExpenseToLocal();
    renderExpense(); // it takes values from local storage and display it on expense List
    updateTotal();

    form.reset();
  });

  function renderExpense() {
    expenseList.innerText = "";
    expense.forEach((exp) => {
      const tag = document.createElement("div");
      tag.classList.add("design");
      tag.innerHTML = `
      <span class = "expense-text"> ${exp.name} - $${exp.amount} </span> 
      <button data-id=${exp.id} class = "delete-button"> Delete </button> 
    `;
      expenseList.appendChild(tag);
    });
  }

  //delete button working
  expenseList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const getId = parseInt(e.target.getAttribute("data-id"));
      expense = expense.filter((val) => getId !== val.id);
      saveExpenseToLocal();
      renderExpense();
      updateTotal();
    }
  });

  function saveExpenseToLocal() {
    localStorage.setItem("expenses", JSON.stringify(expense));
  }

  function calcualteExpense() {
    return expense.reduce((sum, exp) => (sum += exp.amount), 0);
  }

  function updateTotal() {
    totalValue.innerText = `$${calcualteExpense()}`;
  }
});
