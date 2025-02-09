import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'shared/lib';
import { routesEnum } from 'pages/types';
import { logoutAction } from 'entities/user';
import { Button } from 'shared/ui/button';
import './index.scss';
import { FC, useState } from 'react';

const Navbar: FC = () => {
  const { isAuth, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(logoutAction());
  };

  return (
    <header className="navbar">
      <nav role="navigation" className="navbar__logo">
        <a href="#main">
          <p>PseudoTube</p>
        </a>
      </nav>
      <div className={`navbar__links ${isMenuOpen ? 'active' : ''}`}>
        <nav role="navigation" className="navbar__item">
          <Button
            onClick={() => {
              setIsMenuOpen((prev) => !prev);
              navigate(routesEnum.MAIN);
            }}
            text="Главная"
            nameOfClass="button__exit"
          ></Button>
        </nav>
        <nav role="navigation" className="navbar__item">
          <Button
            onClick={() => {
              setIsMenuOpen((prev) => !prev);
              navigate(routesEnum.TEST);
            }}
            text="Главная без оптимизации"
            nameOfClass="button__exit"
          ></Button>
        </nav>
        {isAuth && user.id === 3 && (
          <nav role="navigation" className="navbar__item">
            <Button
              onClick={() => {
                setIsMenuOpen((prev) => !prev);
                navigate(routesEnum.FILM_ADD);
              }}
              text="Добавить фильм"
              nameOfClass="button__add"
            />
          </nav>
        )}
        <nav role="navigation" className="navbar__item">
          {isAuth ? (
            <Button
              onClick={() => {
                logoutHandler();
                if (isMenuOpen) setIsMenuOpen((prev) => !prev);
              }}
              text="Выйти"
              nameOfClass="button__exit"
            />
          ) : (
            <Button
              onClick={() => {
                if (isMenuOpen) setIsMenuOpen((prev) => !prev);
                navigate(routesEnum.LOGIN);
              }}
              text="Войти"
              nameOfClass="button__login"
            ></Button>
          )}
        </nav>
      </div>
      <div className={`navbar__hamburger ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen((prev) => !prev)}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </header>
  );
};

export { Navbar };
