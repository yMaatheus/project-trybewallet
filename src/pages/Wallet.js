import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveCurrencies, saveExpense } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onClickAddExpenses = this.onClickAddExpenses.bind(this);
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

  render() {
    const { email, currencies, expensesTotal } = this.props;
    console.log(expensesTotal);
    const { value, description, currency, method, tag } = this.state;
    const total = Number(!expensesTotal ? 0 : expensesTotal).toFixed(2);
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
            Método de pagamento
            <select
              name="method"
              value={ method }
              onChange={ this.onHandleChange }
              id="method-input"
              data-testid="method-input"
            >
              <option hidden>Método de pagamento</option>
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
