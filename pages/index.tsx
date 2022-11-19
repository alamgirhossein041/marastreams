import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import { useEffect } from "react";
import {Layout, Vault, Login} from '../components'
import {sanityClient, urlFor} from '../sanity'
import { UniversalProfile } from '../typings'
import { useStateContext } from '../contexts/ContextProvider';


interface Props {
  universal_profiles: [UniversalProfile];
}


const Home =  ({universal_profiles}: Props) => {
  const { setUpList, userAddress } = useStateContext(); 
  

  useEffect(() => {
    setUpList(universal_profiles);
    // console.log(universal_profiles[0].network_details);
  },[]);
  // const userAddress = "0x0d3E9d5c99b0B9F0A3637e36D09CC01878eC0a5C";
  return (
    <div className="bg-primary h-screen w-full overflow-hidden">
      <Head>
        <title>vault</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        {!userAddress ? (
          <div className='bg-primary h-screen justify-center w-full overflow-hidden'>
            <Login />
          </div>
        ):(
          <div className=''>
            <Vault />
          </div>
        )}
      </Layout>;
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const query = `*[_type == "up_accounts"]{
    list_of_user_wallets,
    up_account,
    network_details->{
      network_name,
      network_chain_id,
      rpc_url,
      base_contracts_addresses
    },
  }`

  const universal_profiles = await sanityClient.fetch(query);

  return {
    props: { universal_profiles },
  }
}