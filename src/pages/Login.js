import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onClickJoinButton = this.onClickJoinButton.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.state = {
      email: '',
      password: '',
      isButtonDisabled: true,
    };
  }

  onChangeInput({ target: { type, name, value, checked } }) {
    this.setState({
      [name]: (type === 'checkbox' ? checked : value),
    }, this.validateForm);
  }

  onClickJoinButton() {
    const { history, login } = this.props;
    const { email } = this.state;
    login(email);
    history.push('/carteira');
  }

  validateForm() {
    const { email, password } = this.state;
    const chars = 6;
    const emailValid = email.includes('@')
    && email.split('@')[1]
    && email.includes('.') && email.split('.')[1];
    const passwordValid = password.length >= chars;

    this.setState({ isButtonDisabled: !(emailValid && passwordValid) });
  }

  render() {
    const { email, password, isButtonDisabled } = this.state;
    return (
      <form>
        <div>
          <input
            type="email"
            data-testid="email-input"
            name="email"
            value={ email }
            onChange={ this.onChangeInput }
          />
        </div>
        <div>
          <input
            type="password"
            data-testid="password-input"
            name="password"
            value={ password }
            onChange={ this.onChangeInput }
          />
        </div>
        <button
          type="button"
          disabled={ isButtonDisabled }
          onClick={ this.onClickJoinButton }
        >
          Entrar

        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object,
  login: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  login: (email) => dispatch(saveEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
