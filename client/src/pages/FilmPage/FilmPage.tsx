import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'shared/lib';
import { MainSectionFilm } from './mainSection';
import { CommentSection } from './commentSection';
import { fetchFilmById } from 'entities/film';
import { IFilm } from 'shared/api';
import { fetchCommentsById } from 'entities/comment';
import { withNotification } from 'app/providers/with-notification';
import { unwrapResult } from '@reduxjs/toolkit';
const FilmPage = () => {
  const { idFilm } = useParams();
  const [film, setFilm] = useState<IFilm | null>(null);
  const { comments } = useAppSelector((state) => state.comment);
  const dispatch = useAppDispatch();

  const fetchFilm = async () => {
    dispatch(fetchFilmById(Number(idFilm)))
      .then(unwrapResult)
      .then((film) => {
        if (film) setFilm(film);
      });
  };
  useEffect(() => {
    if (idFilm) {
      fetchFilm();
      fetchCommentsById(dispatch, Number(idFilm));
    }
  }, [idFilm]);
  if (idFilm) {
    return film ? (
      <main>
        <MainSectionFilm film={film} />
        <CommentSection comments={comments} />
      </main>
    ) : (
      <h1>Такого фильма не существует</h1>
    );
  }
  return <h1>Такой страницы не существует</h1>;
};

export default withNotification(FilmPage);
