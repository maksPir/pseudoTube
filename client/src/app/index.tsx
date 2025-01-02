import 'shared/styles/globals.scss';
import AppRouter from 'pages';
import { withProviders } from 'app/providers';
import { Navbar } from 'widgets/navbar';
import { Footer } from 'widgets/footer';

const App = () => {
  return (
    <>
      <div id="main"></div>
      <Navbar />
      <AppRouter />
      <Footer />
    </>
  );
};

export default withProviders(App);
