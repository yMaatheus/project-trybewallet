import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor() {
    super();
    this.getExpenseTotal = this.getExpenseTotal.bind(this);
  }

  getExpenseTotal() {
    const { expenses } = this.props;
    return expenses.reduce((acc, { value, currency,
      exchangeRates }) => acc + (value * exchangeRates[currency].ask), 0).toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <div>
          <span data-testid="email-field">{`Email: ${email}`}</span>
        </div>
        <span data-testid="total-field">{this.getExpenseTotal()}</span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.array,
}.isRequired;

const mapStateToProps = (generalState) => ({
  email: generalState.user.email,
  expenses: generalState.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
