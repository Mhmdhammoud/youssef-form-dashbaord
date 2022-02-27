import type { NextPage } from 'next';
import { Header, Footer, Wrapper } from '../components';

const Home: NextPage = () => {
  return (
    <div>
      <Header />
      <Wrapper classes="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl pb-20 lg:max-w-7xl">
        <h1 className="text-3xl  text-red-600 "> Hello world! </h1>
      </Wrapper>
      <Footer />
    </div>
  );
};

export default Home;
