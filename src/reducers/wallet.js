import { SET_CURRENCIES, ADD_EXPENSE, INCREMENT_TOTAL_EXPENSES } from '../actions';

const INITIAL_STATE = {
  expensesTotal: 0,
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_CURRENCIES:
    return { ...state, currencies: action.currencies };
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.expense] };
  case INCREMENT_TOTAL_EXPENSES:
    return {
      ...state,
      expensesTotal: (Number(state.expensesTotal) + Number(action.value)),
    };
  default:
    return state;
  }
}

export default wallet;
