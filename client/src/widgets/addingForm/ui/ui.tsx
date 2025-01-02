import { InputWithRules } from 'features/inputWithRules';
import { useEffect, useRef, useState } from 'react';
import { IFilm } from 'shared/api';
import { Button } from 'shared/ui/button';
import './style.scss';
import { useAppDispatch } from 'shared/lib';
import { addFilm } from 'entities/film';

export const AddingForm = () => {
  const [filmState, setFilmState] = useState<IFilm>({ id: 0 } as IFilm);
  const changeState = (value: string | number, field?: string) => {
    setFilmState((prev) => {
      return { ...prev, [field || 'name']: value };
    });
  };
  const dispatch = useAppDispatch();
  const myRef = useRef<HTMLInputElement>(null);
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
  const saveHandler = () => {
    clearHandler();
    dispatch(addFilm(filmState));
  };
  const clearHandler = () => {
    setFilmState({ id: 0, name: '', description: '', image: '', rate: 0 } as IFilm);
  };
  return (
    <section className="formContainer">
      <form className="form">
        <div className="form__main">
          <div>
            <label>Название:</label>
            <InputWithRules
              value={filmState.name}
              onChange={changeState}
              name="name"
              inputRef={myRef}
              rules={/.{1,}/}
              text="Поле не должно быть пустым"
              type="text"
              placeholder="Введите название"
            />
          </div>
          <div>
            <span>Описание:</span>
            <InputWithRules
              value={filmState.description}
              onChange={changeState}
              name="description"
              rules={/.{1,}/}
              text="Поле не должно быть пустым"
              type="text"
              placeholder="Введите описание"
            />
          </div>
          <div>
            <span>Ссылка на заставку:</span>
            <InputWithRules
              value={filmState.image}
              onChange={changeState}
              name="image"
              rules={/.{1,}/}
              text="Поле не должно быть пустым"
              type="text"
              placeholder="Укажите заставку"
            />
          </div>
          <div>
            <span>Рейтинг:</span>
            <InputWithRules
              value={filmState.rate}
              onChange={changeState}
              name="rate"
              type="number"
              min={0}
              max={5}
              placeholder="Рейтинг"
            />
          </div>
        </div>

        <div className="form__footer">
          <Button onClick={saveHandler} text="Добавить" nameOfClass="input__button" />
          <Button onClick={clearHandler} text="Очистить" nameOfClass="input__button" />
        </div>
      </form>
    </section>
  );
};
