import type { NextPage } from 'next'
import Head from 'next/head'
import {Layout, Login, Lottery} from '../../components';
import {useDisconnect, useAccount} from 'wagmi';


const lottery: NextPage = () => {
  const {address} = useAccount();
  return (
    <div className="bg-primary h-screen w-full overflow-hidden">
      <Head>
        <title>mara-vault</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        {!address ? (
          <Login />
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
