import { withNotification } from 'app/providers/with-notification';
import { useAppSelector } from 'shared/lib';
import { Catalog } from 'widgets/catalog';

const MainPage = () => {
  return (
    <main>
      <Catalog />
    </main>
  );
};

export default withNotification(MainPage);
