import React from 'react';
import { Button } from 'react-bootstrap';
import Head from 'next/head';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <>
      <Head>
        <title>Dranks For You!</title>
      </Head>
      <div
        className="text-center d-flex flex-column justify-content-center align-items-center"
        style={{
          height: '90vh',
          padding: '30px',
          margin: '0 auto',
          zIndex: 1,
          minHeight: '25rem',
          width: '100%',
          minWidth: '30rem',
          paddingBlock: '0 5rem',
        }}
      >
        <h1>Welcome to Dranks for You!</h1>
        <p>A friendly ordering app in development</p>
        <Button type="button" size="lg" className="copy-btn" onClick={signIn}>
          Sign In
        </Button>
      </div>
    </>
  );
}

export default Signin;
