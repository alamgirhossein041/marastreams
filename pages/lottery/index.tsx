import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from "react";
import {Layout, Login, Lottery} from '../../components'
import { useStateContext } from '../../contexts/ContextProvider';


const lottery: NextPage = () => {
  const userAddress = useStateContext();
  return (
    <div className="bg-primary h-screen w-full overflow-hidden">
      <Head>
        <title>mara-vault</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        {!userAddress ? (<Login />
        ):(
          <div className='bg-primary h-screen w-full overflow-hidden'>
            <Lottery />
          </div>
        )}
      </Layout>;
    </div>
  );
}

export default lottery
