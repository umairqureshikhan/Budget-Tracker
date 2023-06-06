let totalAmount = document.getElementById("total-amount");
let userAmount = document.getElementById("user-amount");

const checkAmountButton = document.getElementById("check-amount");
const totalAmountButton = document.getElementById("total-amount-button");
const productTitle = document.getElementById("product-title");
const errorMessage = document.getElementById("budget-error");
const productTitleError = document.getElementById("product-title-error");
const amount = document.getElementById("amount");
const expenditureValue = document.getElementById("expenditure-value");
const balanceValue = document.getElementById("balance-amount");
const list = document.getElementById("list");

let tempAmount = 0;

// Set budget
totalAmountButton.addEventListener("click", () => {
    tempAmount = totalAmount.value;
    
    // Empty or negative input
    if (tempAmount === "" || tempAmount < 0) {
        errorMessage.classList.remove("hide");
    } else {
        errorMessage.classList.add("hide");
        
        // Set budget
        amount.innerHTML = tempAmount;
        
        // Set balance
        balanceValue.innerText = tempAmount;
        
        // Clear input box
        totalAmount.value = "";
    }
});

// Function to disable edit and delete buttons
const disableButtons = (bool) => {
    let editButtons = document.getElementsByClassName("edit");
    Array.from(editButtons).forEach((element) => {
        element.disabled = bool;
    });
};

// Function to modify list element
const modifyElement = (element, edit = false) => {
    let parentDiv = element.parentElement;
    let currentBalance = balanceValue.innerText;
    let currentExpense = expenditureValue.innerText;
    let parentAmount = parentDiv.querySelector(".amount").innerText;
    
    if (edit) {
        let parentText = parentDiv.querySelector(".product").innerText;
        productTitle.value = parentText;
        userAmount.value = parentAmount;
        disableButtons(true);
    }
    
    balanceValue.innerText = parseInt(currentBalance) + parseInt(parentAmount);
    expenditureValue.innerText = parseInt(currentExpense) - parseInt(parentAmount);
    parentDiv.remove();
};

// Function to create list
const listCreator = (expenseName, expenseValue) => {
    let sublistContent = document.createElement("div");
    sublistContent.classList.add("sublist-content", "flex-space");
    sublistContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${expenseValue}</p>`;
    
    let editButton = document.createElement("button");
    editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
    editButton.style.fontSize = "24px";
    editButton.style.color = "yellowgreen";
    editButton.addEventListener("click", () => {
        modifyElement(editButton, true);
    });
    
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
    deleteButton.style.fontSize = "24px";
    deleteButton.style.color = "yellowgreen";

    deleteButton.addEventListener("click", () => {
        modifyElement(deleteButton);
    });
    
    sublistContent.appendChild(editButton);
    sublistContent.appendChild(deleteButton);
    document.getElementById("list").appendChild(sublistContent);
};

// Function to add expense
// Function to add expense
checkAmountButton.addEventListener("click", () => {
    // Empty checks
    if (!userAmount.value || !productTitle.value) {
        productTitleError.classList.remove("hide");
        return false;
    }
    
    // Enabled buttons
    disableButtons(false);
    
    // Expense
    let expenditure = parseInt(userAmount.value);
    
    // Total expense (existing + new)
    let sum = parseInt(expenditureValue.innerText) + expenditure;
    expenditureValue.innerText = sum;
    
    // Total balance (budget - total expense)
    const totalBalance = tempAmount - sum;

    if (totalBalance < 0) {
        // Display alert if expense exceeds budget
        alert("You don't have enough money!");
        expenditureValue.innerText -= expenditure; // Rollback the sum
        return false;
    }
    
    balanceValue.innerText = totalBalance;
    
    // Create list
    listCreator(productTitle.value, userAmount.value);
    
    // Empty inputs
    productTitle.value = "";
    userAmount.value = "";
});

