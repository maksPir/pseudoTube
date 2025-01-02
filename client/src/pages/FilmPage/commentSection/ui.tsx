import { Comment } from 'entities/comment';
import './style.scss';
import { FC, useEffect, useState } from 'react';
import { ICommentSectionProps } from './types';
import { CommentInput } from 'features/addComment';
import { Button } from 'shared/ui/button';

export const CommentSection: FC<ICommentSectionProps> = ({ comments }) => {
  const [isShowAll, setIsShowAll] = useState(false);
  return (
    <section className="commentsection">
      <h3>Комментарии пользователей</h3>
      <CommentInput />
      {comments.length > 0 ? (
        comments.length <= 5 ? (
          comments.map((el) => <Comment key={el.id} comment={el} />)
        ) : (
          <>
            {comments.map((el, index) => {
              if (isShowAll) {
                return <Comment key={el.id} comment={el} />;
              } else if (!isShowAll && index < 5) {
                return <Comment key={el.id} comment={el} />;
              }
            })}
            {!isShowAll && <Button nameOfClass="" onClick={() => setIsShowAll(true)} text="Показать все" />}
          </>
        )
      ) : (
        <h4>Пока комментариев нет. Напишите первым!</h4>
      )}
    </section>
  );
};
