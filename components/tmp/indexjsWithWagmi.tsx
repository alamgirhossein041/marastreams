import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
// import { useAddress, useDisconnect, ConnectWallet } from "@thirdweb-dev/react";
import { useState, useEffect } from "react";
import {Layout, Login, Vault} from '../components'
import {sanityClient, urlFor} from '../sanity'
import { UniversalProfile } from '../typings'
import { useStateContext } from '../contexts/ContextProvider';
import { useAccount } from "wagmi";

interface Props {
  universal_profiles: [UniversalProfile];
}

const Home: NextPage = ({universal_profiles}: Props) => {
  const { address, isConnecting, isDisconnected } = useAccount();

  const { setUpList } = useStateContext();
  // const connectWithMagic = useMagic(); // Hook to connect with Magic Link.
  // const disconnectWallet = useDisconnect(); // Hook to disconnect from the connected wallet.

  // const [email, setEmail] = useState<string>(""); // State to hold the email address the user entered.
  // console.log(universal_profiles)

  useEffect(() => {
    setUpList(universal_profiles);
    // console.log(universal_profiles[0].network_details);
  },[]);

  return (
    <div className="bg-primary h-screen w-full overflow-hidden">
      <Head>
        <title>vault</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        {!address ? (<Login />
        ):(
          <>
            <Vault />
          </>
        )}
      </Layout>;
    </div>
  );
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
