import { FC, useEffect, useRef, useState } from 'react';
import { login, registration } from 'entities/user';
import { Button } from 'shared/ui/button';
import './style.scss';
import { InputWithRules } from 'features/inputWithRules';
import { IAuthPayload } from 'entities/user/model/types';
import { useAppDispatch } from 'shared/lib';

export const LoginForm: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authData, setAuthData] = useState<IAuthPayload>({ id: -1 } as IAuthPayload);
  const dispatch = useAppDispatch();
  const myRef = useRef<HTMLInputElement>(null);
  const changeState = (value: string | number, field?: string) => {
    setAuthData((prev) => {
      return { ...prev, [field || 'email']: value };
    });
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      if (myRef.current) {
        myRef.current.focus();
      }
    }, 1);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  const loginHandler = () => {
    dispatch(login(authData));
  };
  const registrationHandler = () => {
    dispatch(registration(authData));
  };
  return (
    <section className="loginformContainer">
      <form className="loginform">
        <div className="loginform__main">
          <div>
            <span>Email:</span>
            <InputWithRules
              value={authData.email}
              onChange={changeState}
              name="email"
              inputRef={myRef}
              rules={
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              }
              text="Неверный формат почты"
              type="text"
              placeholder="Введите email"
            />
          </div>
          <div>
            <span>Пароль:</span>
            <InputWithRules
              value={authData.password}
              onChange={changeState}
              name="password"
              rules={/.{6,}/}
              text="Количество символов должно быть больше 5"
              type="password"
              placeholder="Введите пароль"
            />
          </div>
        </div>

        <div className="loginform__footer">
          <Button onClick={loginHandler} text="Войти" nameOfClass="input__button login" />
          <Button onClick={registrationHandler} text="Регистрация" nameOfClass="input__button registration" />
        </div>
      </form>
    </section>
  );
};
