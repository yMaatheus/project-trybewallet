import { currenciesFetch } from '../services';

export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SET_CURRENCIES = 'SET_CURRENCIES';

export const saveEmail = (email) => ({ type: SAVE_EMAIL, email });

const setCurrencies = (currencies) => ({ type: SET_CURRENCIES, currencies });

export const saveCurrencies = () => async (dispatch) => {
  const currencies = await currenciesFetch();
  dispatch(setCurrencies(currencies));
};
