import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
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
}.isRequired;

const mapStateToProps = (generalState) => ({
  email: generalState.user.email,
});

export default connect(mapStateToProps)(Wallet);
