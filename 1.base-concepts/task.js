"use strict";

function solveEquation(a, b, c) {
    let d = b ** 2 - 4 * a * c;
    let arr = [];

    if (d < 0) {
    } else if (d === 0) {
        let root = -b / (2 * a);
        arr.push(root);
    } else {
        let sqrtD = Math.sqrt(d);
        let root1 = (-b + sqrtD) / (2 * a);
        let root2 = (-b - sqrtD) / (2 * a);
        arr.push(root1, root2);
    }

    return arr;
}

function calculateTotalMortgage(percent, contribution, amount, countMonths) {
    percent = Number(percent);
    contribution = Number(contribution);
    amount = Number(amount);
    countMonths = Number(countMonths);

    if (isNaN(percent) || isNaN(contribution) || isNaN(amount) || isNaN(countMonths)) {
        return false;
    }

    let monthlyPercent = (percent / 100) / 12;

    let loanBody = amount - contribution;

    if (loanBody <= 0) {
        return 0;
    }

    let monthlyPayment = loanBody * (monthlyPercent * Math.pow(1 + monthlyPercent, countMonths)) / (Math.pow(1 + monthlyPercent, countMonths) - 1);

    let totalPayment = monthlyPayment * countMonths;

    return Number(totalPayment.toFixed(2));
}