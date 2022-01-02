import { Link, Switch, Route } from 'react-router-dom';
import logo from '../images/logo.svg';

export default function Header(props) {
  return (
    <header className="header body__element">
      <img src={logo} alt="логотип mesto Russia" className="header__logo" />
      <Switch>
        <Route exact path="/">
          <div className="header__container">
            <p className="header__text">{props.email && props.email}</p>
            <Link to="sign-in" onClick={props.onLogout}
              className="page__link page__link_size_adaptive page__link_color_gray transparent transparent_amount_more">Выйти</Link>
          </div>
        </Route>
        <Route path="/sign-up">
          <Link to="/sign-in" className="page__link page__link_size_adaptive page__link_color_white transparent transparent_amount_more">Войти</Link>
        </Route>
        <Route path="/sign-in">
          <Link to="/sign-up" className="page__link page__link_size_adaptive page__link_color_white transparent transparent_amount_more">Регистрация</Link>
        </Route>
      </Switch>
    </header>
  );
}
