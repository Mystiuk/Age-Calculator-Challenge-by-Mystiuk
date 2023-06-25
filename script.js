// Input Data
const dayInp = document.getElementById("day");
const monthInp = document.getElementById("month");
const yearInp = document.getElementById("year");

// Output Data
const dayOut = document.getElementById("DD");
const monthOut = document.getElementById("MM");
const yearOut = document.getElementById("YY");

// Form
const form = document.querySelector("form");

function validate() {
  const inputs = document.querySelectorAll("input");
  let validator = true;

  inputs.forEach((input) => {
    const parent = input.parentElement;

    if (!input.value) {
      input.style.borderColor = "red";
      parent.querySelector("small").innerText = "Enter a valid value.";
      validator = false;
    } else {
      input.style.borderColor = "black";
      parent.querySelector("small").innerText = "";
    }
  });

  return validator;
}

function handleSubmit(e) {
  e.preventDefault();

  if (validate()) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // January is zero-based
    const currentDay = currentDate.getDate();

    const inputYear = parseInt(yearInp.value);
    const inputMonth = parseInt(monthInp.value);
    const inputDay = parseInt(dayInp.value);

    let yearDiff = currentYear - inputYear;
    let monthDiff = currentMonth - inputMonth;
    let dayDiff = currentDay - inputDay;

    if (dayDiff < 0) {
      monthDiff -= 1;
      dayDiff += getDaysInMonth(currentMonth - 1, currentYear);
    }

    if (monthDiff < 0) {
      yearDiff -= 1;
      monthDiff += 12;
    }

    dayOut.innerText = dayDiff;
    monthOut.innerText = monthDiff;
    yearOut.innerText = yearDiff;
  }
}

function getDaysInMonth(month, year) {
  const months = [
    31, // January
    28, // February
    31, // March
    30, // April
    31, // May
    30, // June
    31, // July
    31, // August
    30, // September
    31, // October
    30, // November
    31, // December
  ];

  if (month === 1 && isLeapYear(year)) {
    return 29; // February in a leap year
  }

  return months[month];
}

function isLeapYear(year) {
  // A year is a leap year if it is divisible by 4, but not divisible by 100,
  // except if it is also divisible by 400
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

form.addEventListener("submit", handleSubmit);
