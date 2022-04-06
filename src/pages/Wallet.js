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
    const { email } = this.props;
    return (
      <header>
        <div>
          <span data-testid="email-field">{`Email: ${email}`}</span>
        </div>
        <span data-testid="total-field">0</span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string,
  loadCurrencies: PropTypes.func,
}.isRequired;

const mapStateToProps = (generalState) => ({
  email: generalState.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  loadCurrencies: () => dispatch(saveCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
