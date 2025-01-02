import { FC, useRef, useState } from 'react';
import './styles.scss';
import { useAppDispatch, useAppSelector } from 'shared/lib';
import { useParams } from 'react-router-dom';
import { addComment } from 'entities/comment';
export const CommentInput: FC = () => {
  const [comment, setComment] = useState('');
  const { idFilm } = useParams();
  const dispatch = useAppDispatch();
  const { isAuth, user } = useAppSelector((state) => state.auth);
  const clickHandler = () => {
    if (comment.trim() !== '' && idFilm && !isNaN(Number(idFilm))) {
      addComment(dispatch, Number(idFilm), comment, user.id!);
      setComment('');
    }
  };
  if (!isAuth) {
    return <h3>Пройдите авторизацию для добавления комментариев!</h3>;
  }
  return (
    <section className="commentinput">
      <input
        className="commentinput__input"
        placeholder="Введите комментарий"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button role="button" className="commentinput__btn" onClick={clickHandler}>
        Отправить
      </button>
    </section>
  );
};
