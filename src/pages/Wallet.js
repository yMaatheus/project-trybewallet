import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveCurrencies } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { loadCurrencies } = this.props;
    loadCurrencies();
  }

  render() {
    const { email, currencies } = this.props;
    return (
      <>
        <header>
          <div>
            <span data-testid="email-field">{`Email: ${email}`}</span>
          </div>
          <span data-testid="total-field">0</span>
          <span data-testid="header-currency-field">BRL</span>
        </header>
        <form>
          <label htmlFor="value-input">
            <input type="number" id="value-input" data-testid="value-input" />
          </label>
          <label htmlFor="description-input">
            <input type="text" id="description-input" data-testid="description-input" />
          </label>
          <label htmlFor="currency-input">
            Moeda
            <select id="currency-input" data-testid="currency-input">
              { currencies.map((currency, index) => (
                <option key={ index } value={ currency }>{currency}</option>
              )) }
            </select>
          </label>
          <label htmlFor="method-input">
            Método de pagamento
            <select id="method-input" data-testid="method-input">
              <option value="dinheiro">Dinheiro</option>
              <option value="cartão-de-crédito">Cartão de crédito</option>
              <option value="cartão-de-débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            Categoria
            <select id="tag-input" data-testid="tag-input">
              <option value="alimentação">Alimentação</option>
              <option value="lazer">Lazer</option>
              <option value="trabalho">Trabalho</option>
              <option value="transporte">Transporte</option>
              <option value="saúde">Saúde</option>
            </select>
          </label>
        </form>
      </>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string,
  currencies: PropTypes.array,
  loadCurrencies: PropTypes.func,
}.isRequired;

const mapStateToProps = (generalState) => ({
  email: generalState.user.email,
  currencies: generalState.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  loadCurrencies: () => dispatch(saveCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
