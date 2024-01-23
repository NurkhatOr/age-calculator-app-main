//My elements
let day = document.getElementById("day");
let month = document.getElementById("month");
let year = document.getElementById("year");
let errMessages = document.querySelectorAll(".err-messages");
let button = document.querySelector(".button");
let inputs = document.querySelectorAll("input");

//Date methods
let currentDate = new Date();
let currentDay = currentDate.getDate();
let currentMonth = currentDate.getMonth() + 1;
let currentYear = currentDate.getFullYear();

//Result display
let yearRes = document.querySelector(".years");
let monthRes = document.querySelector(".months");
let dayRes = document.querySelector(".days");

//For calculation

function getDaysInMonth(year, month) {
  let daysInMonth = new Date(year, month, 0).getDate();
  return daysInMonth;
}

let daysInMonth;

let monthsNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

button.addEventListener("click", (e) => {
  e.preventDefault();
  errorMsgs();
  errMessages.forEach((errMessage) => {
    if (errMessage.innerHTML == "") {
      calculate();
      animation();
    }
  });
});

function errorMsgs() {
  for (let i = 0; i <= inputs.length - 1; i++) {
    if (inputs[i].value == "") {
      errMessages[i].innerHTML = "This field is requiered";
    } else if (inputs[i].value != "") {
      errMessages[i].innerHTML = "";
    }
  }

  daysInMonth = getDaysInMonth(parseInt(year.value), parseInt(month.value));
  if (parseInt(day.value) > daysInMonth) {
    errMessages[0].innerHTML = `There is no more ${daysInMonth} days in ${
      monthsNames[parseInt(month.value) - 1]
    }`;
  } else if (parseInt(month.value) > 12) {
    errMessages[1].innerHTML = "Input an appropriate month";
  } else if (year.value.length != 4 || parseInt(year.value) > currentYear) {
    errMessages[2].innerHTML = "Input an approriate year";
  }
}

function calculate() {
  let calcYear = parseInt(year.value);
  let calcMonth = parseInt(month.value);
  let calcDay = parseInt(day.value);

  let yearResult = currentYear - calcYear;
  let monthResult = currentMonth - calcMonth;
  let dayResult = currentDay - calcDay;

  if (currentMonth < calcMonth && currentDay > calcDay) {
    yearResult--;
    monthResult = 12 - calcMonth + currentMonth;
    console.log(1);
  } else if (currentMonth <= calcMonth && currentDay < calcDay) {
    yearResult--;
    monthResult =
      currentMonth != 1 ? 12 - calcMonth + currentMonth : 12 - calcMonth;
    console.log(2);
    if (currentMonth == 1) {
      daysInMonth = getDaysInMonth(calcYear - 1, 12);
      dayResult = daysInMonth - calcDay + currentDay;
      console.log(3);
    } else if (currentMonth != 1) {
      daysInMonth = getDaysInMonth(currentYear, currentMonth - 1);
      dayResult = daysInMonth - calcDay + currentDay;

      console.log(4);
    }
  } else if (
    currentDay == 28 &&
    day.value == "29" &&
    (currentMonth == parseInt(month.value)) == 2
  ) {
    monthResult--;
    console.log(5);
  }

  yearRes.setAttribute("data-val", yearResult);
  monthRes.setAttribute("data-val", monthResult);
  dayRes.setAttribute("data-val", dayResult);
}

function animation() {
  let valueDisplays = document.querySelectorAll(".result");
  let interval = 500;

  valueDisplays.forEach((valueDisplay) => {
    let startValue = 0;
    let endValue = parseInt(valueDisplay.getAttribute("data-val"));
    let duration = Math.floor(interval / endValue);

    let counter = setInterval(function () {
      startValue += 1;
      valueDisplay.textContent = startValue;
      if (startValue == endValue || endValue == 0) {
        clearInterval(counter);
        if (endValue == 0) {
          valueDisplay.textContent = 0;
      }
    }, duration);
  });
}
