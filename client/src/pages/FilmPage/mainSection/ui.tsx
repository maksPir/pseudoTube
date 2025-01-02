import { FC } from 'react';
import { IMainSectionProps } from './types';
import './style.scss';
import { Rate } from 'antd';
export const MainSectionFilm: FC<IMainSectionProps> = ({ film }) => {
  return (
    <section className="filmsection">
      <div className="filmsection__container">
        <img className="filmsection__image" src={film.image} />
      </div>
      <div className="filmsection__infofilm">
        <div className="infofilm__title">
          <h1>{film.name}</h1>
        </div>
        <h2 className="infofilm__rate">РЕЙТИНГ {film.rate}</h2>
        <Rate disabled value={film.rate} />
        <p className="infofilm__desc">{film.description}</p>
      </div>
    </section>
  );
};
