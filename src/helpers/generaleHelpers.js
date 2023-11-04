var moment = require('moment');

export const dropdownYears = () => {
  var currentYear = moment().format('YYYY');
  var beginYear = Number(currentYear) - 20;
  var startYear = Number(currentYear) + 20;
  var allYears = [];
  for (beginYear; beginYear <= startYear; beginYear++) {
    allYears.push({ id: beginYear, name: beginYear });
  }
  return { currentYear, allYears };
}


export const dropdownMonths = () => {
  var currentMonth = moment().format('MM');
  var allMonths = [
    { id: '01', name: "January" },
    { id: '02', name: "February" },
    { id: '03', name: "March" },
    { id: '04', name: "April" },
    { id: '05', name: "May" },
    { id: '06', name: "June" },
    { id: '07', name: "July" },
    { id: '08', name: "August" },
    { id: '09', name: "September" },
    { id: '10', name: "October" },
    { id: '11', name: "November" },
    { id: '12', name: "December" }
  ];
  return { currentMonth, allMonths };
}


/**
 * @docs this function is make for mis component data calculation
 * @param {*} component 
 * @param {*} columns 
 * @param {*} minusColumns 
 * @returns 
 */
export const sumData = (component, columns = [], minusColumns = []) => {
  var total = 0;
  columns.forEach((column) => {
    var value = component[column];
    total += makeNumber(value);
  });
  var minus = 0;
  minusColumns.forEach((column) => {
    var value = component[column];
    minus += makeNumber(value);
  });
  return total - minus;
}

/**
 * @docs this function is make for mis component data calculation
 * @param {*} anyNumber 
 * @returns 
 */
export const makeNumber = (anyNumber) => {
  if (typeof anyNumber === 'string') {
    return Number(anyNumber);
  } else if (typeof anyNumber === 'number') {
    return anyNumber;
  }
  return 0;
}

export const percentCalculate = (amount, percent) => {
  var rate = (makeNumber(amount) * makeNumber(percent)) / 100;
  return Math.round(rate);
}
