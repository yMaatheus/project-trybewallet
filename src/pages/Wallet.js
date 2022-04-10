import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveCurrencies, saveExpense } from '../actions';
import styles from './Wallet.module.css';

class Wallet extends React.Component {
  constructor() {
    super();
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onClickAddExpenses = this.onClickAddExpenses.bind(this);
    this.convertCurrency = this.convertCurrency.bind(this);
    this.state = {
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
    const expense = {
      id: (expenses.length),
      ...this.state,
    };
    addExpense(expense);
    this.setState({
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
    });
  }

  getExpenseValue(expense) {
    return Number(expense.value).toFixed(2);
  }

  getExpenseAskValue(expense) {
    return Number(expense.exchangeRates[expense.currency].ask).toFixed(2);
  }

  getExpenseValueConverted(expense) {
    return (expense.exchangeRates[expense.currency].ask * expense.value).toFixed(2);
  }

  convertCurrency(currency) {
    if (currency === 'USD') {
      return 'Dólar Comercial';
    }
    if (currency === 'EUR') {
      return 'Euro';
    }
    return currency;
  }

  render() {
    const { email, currencies, expensesTotal, expenses } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const total = Number(!expensesTotal ? 0 : expensesTotal).toFixed(2);
    const paymentMethod = 'Método de pagamento';
    return (
      <>
        <header>
          <div>
            <span data-testid="email-field">{`Email: ${email}`}</span>
          </div>
          <span data-testid="total-field">{total}</span>
          <span data-testid="header-currency-field">BRL</span>
        </header>
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
            onClick={ this.onClickAddExpenses }
          >
            Adicionar despesa

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
                <td>{this.getExpenseValue(expense)}</td>
                <td>{this.convertCurrency(expense.currency)}</td>
                <td>{this.getExpenseAskValue(expense)}</td>
                <td>{this.getExpenseValueConverted(expense)}</td>
                <td>Real</td>
                <td>Editar/Excluir</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string,
  currencies: PropTypes.array,
  expensesTotal: PropTypes.number,
  expenses: PropTypes.array,
  loadCurrencies: PropTypes.func,
}.isRequired;

const mapStateToProps = (generalState) => ({
  email: generalState.user.email,
  currencies: generalState.wallet.currencies,
  expensesTotal: generalState.wallet.expensesTotal,
  expenses: generalState.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  loadCurrencies: () => dispatch(saveCurrencies()),
  addExpense: (expense) => dispatch(saveExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
