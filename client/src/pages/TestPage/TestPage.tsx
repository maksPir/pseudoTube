import { withNotification } from 'app/providers/with-notification';
import { Catalog } from 'widgets/catalog';

const TestPage = () => {
  return (
    <main>
      <div>
        <h1>PseudoTube without optimization</h1>
      </div>
      <Catalog isNotOptimizedVer={true} />
    </main>
  );
};

export default withNotification(TestPage);
