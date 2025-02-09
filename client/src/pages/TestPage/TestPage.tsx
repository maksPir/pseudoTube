import { withNotification } from 'app/providers/with-notification';
import { Catalog } from 'widgets/catalog';

const TestPage = () => {
  return (
    <main>
      <div>
        <p>PseudoTube without optimization</p>
      </div>
      <Catalog isNotOptimizedVer={true} />
    </main>
  );
};

export default withNotification(TestPage);
