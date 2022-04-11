import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './Wallet.module.css';
import Header from '../components/Header';
import { saveCurrencies, saveExpense, removeExpense, editExpense } from '../actions';
import { currencyToString, formatExpenseValue, formatExpenseAsk,
  expenseValueInBRL, stringToCurrency } from '../services';

class Wallet extends React.Component {
  constructor() {
    super();
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onClickAddExpenses = this.onClickAddExpenses.bind(this);
    this.onClickSubmitExpenseEdit = this.onClickSubmitExpenseEdit.bind(this);
    this.onClickExpenseEditButton = this.onClickExpenseEditButton.bind(this);
    this.resetState = this.resetState.bind(this);
    this.state = {
      isEdit: false,
      expenseEditId: 0,
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
    };
  }

  componentDidMount() {
    const { loadCurrencies } = this.props;
    loadCurrencies();
  }

  onHandleChange({ target: { type, name, value, checked } }) {
    this.setState({
      [name]: (type === 'checkbox' ? checked : value),
    });
  }

  onClickAddExpenses() {
    const { expenses, addExpense } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const expense = { id: (expenses.length), value, description, currency, method, tag };
    addExpense(expense);
    this.resetState();
  }

  onClickSubmitExpenseEdit() {
    const { expenseEditId: id, value, description,
      currency: currencyString, method, tag } = this.state;
    const { updateExpense } = this.props;
    const currency = stringToCurrency(currencyString);
    updateExpense({ id, value, description, currency, method, tag });
    this.resetState();
  }

  onClickExpenseEditButton(expense) {
    this.setState({
      isEdit: true,
      expenseEditId: expense.id,
      value: formatExpenseValue(expense),
      description: expense.description,
      currency: currencyToString(expense),
      method: expense.method,
      tag: expense.tag,
    });
  }

  resetState() {
    this.setState({
      isEdit: false,
      expenseEditId: 0,
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
    });
  }

  render() {
    const { currencies, expenses, deleteExpense } = this.props;
    const { value, description, currency, method, tag, isEdit } = this.state;
    const paymentMethod = 'Método de pagamento';
    return (
      <>
        <Header />
        <form>
          <label htmlFor="value-input">
            <input
              type="number"
              name="value"
              value={ value }
              onChange={ this.onHandleChange }
              id="value-input"
              data-testid="value-input"
            />
          </label>
          <label htmlFor="description-input">
            <input
              type="text"
              name="description"
              value={ description }
              onChange={ this.onHandleChange }
              id="description-input"
              data-testid="description-input"
            />
          </label>
          <label htmlFor="currency-input">
            Moeda
            <select
              name="currency"
              value={ currency }
              onChange={ this.onHandleChange }
              id="currency-input"
              data-testid="currency-input"
            >
              <option hidden>Moeda</option>
              {currencies.map((current, index) => (
                <option key={ index }>{current}</option>
              ))}
            </select>
          </label>
          <label htmlFor="method-input">
            {paymentMethod}
            <select
              name="method"
              value={ method }
              onChange={ this.onHandleChange }
              id="method-input"
              data-testid="method-input"
            >
              <option hidden>{paymentMethod}</option>
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            Categoria
            <select
              name="tag"
              value={ tag }
              onChange={ this.onHandleChange }
              id="tag-input"
              data-testid="tag-input"
            >
              <option hidden>Categoria</option>
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ isEdit ? this.onClickSubmitExpenseEdit : this.onClickAddExpenses }
          >
            {isEdit ? 'Editar despesa' : 'Adicionar despesa'}
          </button>
        </form>
        <table className={ styles.border }>
          <thead>
            <tr>
              <th className={ styles.border }>Descrição</th>
              <th className={ styles.border }>Tag</th>
              <th className={ styles.border }>{paymentMethod}</th>
              <th className={ styles.border }>Valor</th>
              <th className={ styles.border }>Moeda</th>
              <th className={ styles.border }>Câmbio utilizado</th>
              <th className={ styles.border }>Valor convertido</th>
              <th className={ styles.border }>Moeda de conversão</th>
              <th className={ styles.border }>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{formatExpenseValue(expense)}</td>
                <td>{currencyToString(expense)}</td>
                <td>{formatExpenseAsk(expense)}</td>
                <td>{expenseValueInBRL(expense)}</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => this.onClickExpenseEditButton(expense) }
                  >
                    Editar
                  </button>
                  <span>/</span>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => deleteExpense(expense) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

Wallet.propTypes = {
  currencies: PropTypes.array,
  expenses: PropTypes.array,
  loadCurrencies: PropTypes.func,
  deleteExpense: PropTypes.func,
  updateExpense: PropTypes.func,
}.isRequired;

const mapStateToProps = (generalState) => ({
  currencies: generalState.wallet.currencies,
  expenses: generalState.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  loadCurrencies: () => dispatch(saveCurrencies()),
  addExpense: (expense) => dispatch(saveExpense(expense)),
  deleteExpense: ({ id }) => dispatch(removeExpense(id)),
  updateExpense: (expense) => dispatch(editExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
