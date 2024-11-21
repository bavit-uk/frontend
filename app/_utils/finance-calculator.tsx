/**
 *
 * Calculates the monthly, bi-weekly, and weekly payments for a loan.
 *
 * @param {number} newCarPrice - The price of the new car.
 * @param {number} tradeInAllowance - The trade-in allowance. This is the amount the dealer is willing to pay for your old car.
 * @param {number} tradeInLoanBalance - The amount of money you still owe on your old car.
 * @param {number} downPaymentAndRebates - The down payment and rebates. This is the amount of money you are paying up front.
 * @param {number} loanDuration - The duration of the loan in years.
 * @param {number} salesTaxRate - The sales tax rate in percentage. This is the sales tax rate in your state.
 * @param {number} interestRate - The interest rate in percentage. This is the interest rate the bank is charging you.
 * @returns {Object} - An object containing the total amount and the payments.
 */

export const calcPayments = (
  newCarPrice = 0,
  tradeInAllowance = 0,
  tradeInLoanBalance = 0,
  downPaymentAndRebates = 0,
  loanDuration = 0,
  salesTaxRate = 0,
  interestRate = 0,
) => {
  // Calculating the sales tax on the new vehicle
  const tax = (salesTaxRate / 100) * (newCarPrice - tradeInAllowance);

  // Calculating the principal
  // Principal is the amount of money you are borrowing from the bank
  // Principal = New Car Price - Trade-In Allowance + Trade-In Loan Balance - Down Payment and Rebates + Tax
  let principal = newCarPrice - tradeInAllowance + tradeInLoanBalance - downPaymentAndRebates + tax;

  // Rounding the principal to 2 decimal places to avoid floating point errors
  principal = Math.round(principal * 100) / 100.0;

  // Sales tax on the new vehicle minus the sales tax on the trade-in vehicle
  const saleTaxOfNewVehicle = (salesTaxRate / 100) * newCarPrice;
  const saleTaxOfTradeInVehicle = (salesTaxRate / 100) * tradeInAllowance;

  const saleText = saleTaxOfNewVehicle - saleTaxOfTradeInVehicle;

  const totalAmount = newCarPrice - downPaymentAndRebates + tradeInLoanBalance - tradeInAllowance + saleText;

  const ret = [];
  ret.push(calculateLoanPayments(principal, interestRate, 12, loanDuration | 0, "Monthly"));
  ret.push(
    calculateLoanPayments(principal, interestRate, 26, Math.ceil(loanDuration * 2.1666666666666682), "Bi-Weekly"),
  );

  ret.push(calculateLoanPayments(principal, interestRate, 52, Math.ceil(loanDuration * 4.33333333333333304), "Weekly"));

  return {
    totalAmount: isNaN(totalAmount) ? 0 : totalAmount,
    payments: ret,
  };
};

/**
 * Calculates loan payments and interest.
 *
 * @param {number} principal - The initial loan amount.
 * @param {number} annualInterestRatePercent - The annual interest rate in percentage.
 * @param {number} paymentsPerYear - The number of payments made in a year.
 * @param {number} totalPayments - The total number of payments.
 * @param {string} frequencyString - A string indicating the payment frequency.
 * @returns {Object} - An object containing payment information.
 */
const calculateLoanPayments = (
  principal = 0,
  annualInterestRatePercent = 0,
  paymentsPerYear = 0,
  totalPayments = 0,
  frequencyString = "",
) => {
  // Convert the annual interest rate from percentage to decimal
  const annualInterestRateDecimal = annualInterestRatePercent / 100;

  // Calculate the number of periods
  const numberOfPeriods = totalPayments / (1.0 * paymentsPerYear);

  // Calculate the denominator for the payment formula
  const denominator =
    paymentsPerYear *
    (1.0 - Math.pow(1.0 + annualInterestRateDecimal / paymentsPerYear, -1.0 * numberOfPeriods * paymentsPerYear));

  // Calculate the monthly payment
  const monthlyPayment = (principal * annualInterestRateDecimal) / denominator;

  // Calculate the total interest paid
  const totalInterestPaid = monthlyPayment * numberOfPeriods * paymentsPerYear - principal;

  return {
    frequency: frequencyString,
    payment:
      isNaN(Math.round(monthlyPayment * 100) / 100.0) || !isFinite(Math.round(monthlyPayment * 100) / 100.0)
        ? 0
        : Math.round(monthlyPayment * 100) / 100.0,
    interest:
      isNaN(Math.round(totalInterestPaid * 100) / 100.0) || !isFinite(Math.round(monthlyPayment * 100) / 100.0)
        ? 0
        : Math.round(totalInterestPaid * 100) / 100.0,
  };
};
