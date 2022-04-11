import { currenciesFetch } from '../services';

export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SET_CURRENCIES = 'SET_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const saveEmail = (email) => ({ type: SAVE_EMAIL, email });
export const removeExpense = (id) => ({ type: DELETE_EXPENSE, id });
export const editExpense = (expense) => ({ type: EDIT_EXPENSE, expense });

const setCurrencies = (currencies) => ({ type: SET_CURRENCIES, currencies });
const addExpense = (expense) => ({ type: ADD_EXPENSE, expense });

export const saveCurrencies = () => async (dispatch) => {
  const currencies = await currenciesFetch();
  dispatch(setCurrencies(Object.keys(currencies).filter((moeda) => moeda !== 'USDT')));
};

export const saveExpense = (expense) => async (dispatch) => {
  const currencies = await currenciesFetch();
  expense.exchangeRates = currencies;
  dispatch(addExpense(expense));
};
