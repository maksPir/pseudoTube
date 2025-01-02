import { FC } from 'react';
import './style.scss';
import { ICommentProps } from './types';
export const Comment: FC<ICommentProps> = ({ comment }) => {
  return (
    <article className="comment">
      <div className="comment__name">{comment.email}</div>
      <div className="comment__message">{comment.message}</div>
      <div className="comment__date">{comment.date_comment.toString()}</div>
    </article>
  );
};
