import { SET_CURRENCIES, ADD_EXPENSE, DELETE_EXPENSE, EDIT_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_CURRENCIES:
    return { ...state, currencies: action.currencies };
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.expense] };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.id),
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.map((expense) => {
        const { id, value, description, currency, method, tag } = action.expense;
        if (expense.id === id) {
          expense.value = value;
          expense.description = description;
          expense.currency = currency;
          expense.method = method;
          expense.tag = tag;
        }
        return expense;
      }),
    };
  default:
    return state;
  }
}

export default wallet;
