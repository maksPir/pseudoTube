import { useAppSelector } from 'shared/lib';
import { NotificationForm } from 'widgets/notification-form';
import { TypesNotices } from 'widgets/notification-form/types';
import { LoadingForm } from 'widgets/loadingForm';
import { useEffect } from 'react';

export const withNotification = (component: () => React.ReactNode) => () => {
  const { answer, isError, isSuccess, isFetching } = useAppSelector((state) => state.response);
  return (
    <>
      <NotificationForm text={answer} type={isSuccess ? TypesNotices.Success : TypesNotices.Error} />
      {isFetching && <LoadingForm />}
      {component()}
    </>
  );
};
