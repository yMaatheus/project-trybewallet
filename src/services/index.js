export const currenciesFetch = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const resolve = await response.json();
  return resolve;
};

export const currencyToString = ({ currency }) => {
  if (currency === 'USD') {
    return 'Dólar Comercial';
  }
  if (currency === 'CAD') {
    return 'Dólar Canadense';
  }
  if (currency === 'EUR') {
    return 'Euro';
  }
  return currency;
};

export const stringToCurrency = (str) => {
  if (str === 'Dólar Comercial') {
    return 'USD';
  }
  if (str === 'Dólar Canadense') {
    return 'CAD';
  }
  if (str === 'Euro') {
    return 'EUR';
  }
  return str;
};

export const formatExpenseValue = ({ value }) => Number(value).toFixed(2);

export const formatExpenseAsk = (expense) => Number(
  expense.exchangeRates[expense.currency].ask,
).toFixed(2);

export const expenseValueInBRL = ({ value, exchangeRates,
  currency }) => (exchangeRates[currency].ask * value).toFixed(2);
