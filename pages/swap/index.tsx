import type { NextPage } from 'next'
import Head from 'next/head'
import {Layout, Login, Swap} from '../../components'
import {useDisconnect, useAccount} from 'wagmi';


const swap: NextPage = () => {
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
            <Swap />
          </div>
        )}
      </Layout>;
    </div>
  );
}

export default swap
