import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getToken } from '../services/api';
import { saveEmail, saveName } from '../redux/actions';

class Login extends Component {
  state = {
    email: '',
    username: '',
    disabled: true,
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, username } = this.state;
    const { dispatch } = this.props;
    dispatch(saveEmail(email));
    dispatch(saveName(username));
    const { token } = await getToken();
    localStorage.setItem('token', token);
    const { history } = this.props;
    history.push('/game');
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => this.validateForm());
  };

  validateForm = () => {
    const { email, username } = this.state;
    const min = 3;
    const higher = 7;
    const validadeInputs = username.length >= min
    && email.length >= higher
    && email.includes('@');
    this.setState({ disabled: !validadeInputs });
  };

  render() {
    const { email, username, disabled } = this.state;
    return (
      <>
        <h1>Login</h1>
        <form
          onSubmit={ this.handleSubmit }
        >
          <input
            name="username"
            value={ username }
            onChange={ this.handleChange }
            type="text"
            placeholder="Username"
            data-testid="input-player-name"
          />
          <input
            name="email"
            value={ email }
            onChange={ this.handleChange }
            type="email"
            placeholder="Email"
            data-testid="input-gravatar-email"
          />
          <input
            type="submit"
            disabled={ disabled }
            value="Play"
            data-testid="btn-play"
          />
        </form>
        <button data-testeid="btn-settings">
          Configurações
        </button>
      </>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
