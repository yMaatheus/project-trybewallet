import { currenciesFetch } from '../services';

export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SET_CURRENCIES = 'SET_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const INCREMENT_TOTAL_EXPENSES = 'INCREMENT_TOTAL_EXPENSES';

export const saveEmail = (email) => ({ type: SAVE_EMAIL, email });

const setCurrencies = (currencies) => ({ type: SET_CURRENCIES, currencies });
const addExpense = (expense) => ({ type: ADD_EXPENSE, expense });
const incrementExpenseTotal = (value) => ({ type: INCREMENT_TOTAL_EXPENSES, value });

export const saveCurrencies = () => async (dispatch) => {
  const currencies = await currenciesFetch();
  dispatch(setCurrencies(Object.keys(currencies).filter((moeda) => moeda !== 'USDT')));
};

export const saveExpense = (expense) => async (dispatch) => {
  const currencies = await currenciesFetch();
  expense.exchangeRates = currencies;
  dispatch(addExpense(expense));
  const BRL = expense.value * expense.exchangeRates[expense.currency].ask;
  dispatch(incrementExpenseTotal(BRL));
};
