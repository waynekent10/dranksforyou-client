import Head from 'next/head';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  const userName = user?.fbUser?.displayName || 'Guest'; // Fallback to 'Guest' if displayName is not available

  return (
    <>
      <Head>
        <title>Dranks for You</title>
      </Head>
      <div
        className="text-center d-flex flex-column justify-content-center align-items-center"
        style={{
          height: '90vh',
          padding: '30px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        <h1>Hello {userName}!</h1>
      </div>
    </>
  );
}

export default Home;
