import EnterPageForm from './EnterPageForm';
import { useState } from 'react';

export default function Register(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onLogin(email, password);
    resetForm();
  }

  return (
    <EnterPageForm name="login-form" formTitle="Вход" submitButtonText="Войти" onSubmit={handleSubmit}>
      <input id="enter__login-email-input" type="email" name="loginEmail"
        className="page__form-text page__form-text_theme_black-box" placeholder="Email" minLength="3" maxLength="254" required="required" value={email}
        onChange={handleEmailChange}/>
      <span className="enter__login-email-input-error page__form-text-error">Вы пропустили это поле.</span>
      <input id="enter__login-password-input" type="password" name="loginPassword"
        className="page__form-text page__form-text_theme_black-box" placeholder="Пароль" minLength="8" maxLength="64" required="required" value={password}
        onChange={handlePasswordChange} />
      <span className="enter__login-password-input-error page__form-text-error">Вы пропустили это поле.</span>
    </EnterPageForm>
  );
}
