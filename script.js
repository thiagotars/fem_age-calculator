const yearsResult = document.getElementById("years-result");
const monthsResult = document.getElementById("months-result");
const daysResult = document.getElementById("days-result");
const submitButton = document.getElementById("submit-button");

window.addEventListener("load", (event) => {
  document.getElementById("day-input").value = "";
  document.getElementById("month-input").value = "";
  document.getElementById("year-input").value = "";
  resetResult();
});

//START Helper functions

const isLeapYear = (year) => {
  if (year % 4 !== 0) {
    return false;
  } else if (year % 100 !== 0) {
    return true;
  } else if (year % 400 !== 0) {
    return false;
  } else {
    return true;
  }
};

const showError = (current, message) => {
  current.input.classList.add("border-red");
  current.label.classList.add("font-red");
  current.message.innerHTML = message;
};

const hideError = (field, message) => {
  field.input.classList.remove("border-red");
  field.label.classList.remove("font-red");
  field.message.innerHTML = message;
};

const resetResult = () => {
  yearsResult.innerText = "--";
  monthsResult.innerText = "--";
  daysResult.innerText = "--";
};

const renderResult = (years, months, days) => {
  yearsResult.innerText = years;
  monthsResult.innerText = months;
  daysResult.innerText = days;
};

const getDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

// END Helper functions

const inputFields = [
  {
    id: "day",
    input: document.getElementById("day-input"),
    value: document.getElementById("year-input").value,
    label: document.querySelector(".day__label"),
    message: document.getElementById("day-error"),
    min: 1,
    max: undefined,
    error: "Must be a valid day",
  },
  {
    id: "month",
    input: document.getElementById("month-input"),
    value: document.getElementById("year-input").value,
    label: document.querySelector(".month__label"),
    message: document.getElementById("month-error"),
    min: 1,
    max: 12,
    error: "Must be a valid month",
  },
  {
    id: "year",
    input: document.getElementById("year-input"),
    value: document.getElementById("year-input").value,
    label: document.querySelector(".year__label"),
    message: document.getElementById("year-error"),
    min: 1,
    max: new Date().getFullYear(),
    error: "Must be in the past",
  },
];

const getInputValues = () => {
  let inputValues = [];

  for (let i = 0; i < inputFields.length; i++) {
    let current = inputFields[i];
    if (current.input.value && current.input.value != 0) {
      current.value = Number(current.input.value);
      inputValues.push(current);
      hideError(current, "");
    } else {
      showError(current, "This field is required");
      resetResult();
    }
  }

  if (inputValues.length === 3) {
    validateResult(inputValues);
  }
};

const validateResult = (values) => {
  const daysInMonth = getDaysInMonth(values[2].value, values[1].value);
  const validated = [];
  values[0].max = daysInMonth;

  for (let i = 0; i < values.length; i++) {
    let current = values[i];
    if (current.value < current.min || current.value > current.max) {
      showError(current, current.error);
    } else {
      hideError(current, "");
      validated.unshift(current.value);
    }
  }

  if (validated.length < 3) {
    resetResult();
  } else if (validated.length === 3) {
    calculateAge(validated);
  }
};

const calculateAge = (birthdate) => {
  const today = new Date();
  const birthDate = new Date(birthdate);
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (months < 0 || (months === 0 && days < 0)) {
    years--;
    months += 12;
  }

  if (days < 0) {
    months--;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }

  renderResult(years, months, days);
};

submitButton.addEventListener("click", () => {
  getInputValues();
});
