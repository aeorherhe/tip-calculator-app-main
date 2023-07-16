// imports;
import { getAll, get } from "./getElements.js";

const bill = get("#bill");
const persons = get("#persons");
const custom = get("#custom");
const tipBtns = getAll(".tips .btn");
const formGroup = [...getAll(".form-group .error-msg")];
const totalTipAmount = get(".tip-amount");
const totalPrice = get(".total-price");
const resetBtn = get(".reset-btn");

// set state variables
let billAmount = 0.0;
let totalPersons = 1;
let customTip = 0.0;

// handle bill input
bill.addEventListener("input", () => {
  billAmount = Number(bill.value);
  calcTip();
  validateInput(bill, 0);
});

// select tip percent
tipBtns.forEach(function (tipBtn) {
  tipBtn.addEventListener("click", () => {
    customTip = Number(tipBtn.querySelector(".tip-percent").textContent);
    customTip = customTip / 100;
    tipBtns.forEach(function (otherBtns) {
      if (otherBtns !== tipBtn) {
        otherBtns.classList.remove("selected");
      }
    });
    tipBtn.classList.add("selected");
    custom.value = "";
    calcTip();
  });

  custom.addEventListener("input", () => {
    tipBtn.classList.remove("selected");
    customTip = Number(custom.value);
    customTip = customTip / 100;
    calcTip();
    validateInput(custom, 1);
  });
});

// handle input event for no of people
persons.addEventListener("input", () => {
  totalPersons = Number(persons.value);
  calcTip();
  validateInput(persons, 2);
});

// Validate inputs
function validateInput(event, index) {
  if (event.value == "" || Number(event.value) >= 1) {
    event.classList.remove("invalid");
    formGroup[index].textContent = "";
  } else if (Number(event.value) <= 0) {
    event.classList.add("invalid");
    formGroup[index].textContent = "Can't be zero";
  } else if (!Number(event.value)) {
    event.classList.add("invalid");
    formGroup[index].textContent = "Invalid input, numbers only";
    totalTipAmount.textContent = 0.0;
    totalPrice.textContent = 0.0;
  }
}

// calculate tip
function calcTip() {
  if (totalPersons >= 1) {
    validateInput(bill, 0);
    let tipAmountCalc = (billAmount * customTip) / totalPersons;
    totalTipAmount.textContent = tipAmountCalc.toFixed(2);
    totalPrice.textContent = (
      billAmount / totalPersons +
      tipAmountCalc
    ).toFixed(2);
  }
}

// reset btn
resetBtn.addEventListener("click", () => {
  tipBtns.forEach((tipBtn) => {
    tipBtn.classList.remove("selected");
  });
  bill.value = "0.00";
  custom.value = "";
  persons.value = "1";
  totalTipAmount.textContent = "0.00";
  totalPrice.textContent = "0.00";
});
