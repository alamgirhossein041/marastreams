import React, { useEffect } from 'react'
import { useStateContext } from '../../contexts/ContextProvider';

// import Web3 from 'web3';
import { LSPFactory } from '@lukso/lsp-factory.js';
import { useProvider, useContract, useSigner } from 'wagmi';
import { ethers } from 'ethers';


const UpOnboarding = () => {
  const { upList, userAddress, universalProfile } = useStateContext('');
  const evmNetworkDetails = upList[0].network_details;

  const CHAIN_ID = evmNetworkDetails.network_chain_id;
  const network_details = upList[0].network_details;
  const up_account = upList[0].up_account;
  const list_of_user_wallets = upList[0].list_of_user_wallets;
  // const provider = useProvider({ chainId: CHAIN_ID})  
  // const {data: signer, isError, isLoading} = useSigner();

  // const provider = (signer?.provider).provider;
  

  useEffect(() => {
    console.log('UpOnboarding called');
    console.log({network_details});
    console.log({up_account});
    console.log({list_of_user_wallets});
    console.log('Universal Profile Deploy with address: ' + userAddress); 

    if(universalProfile == ''){
      
      

      // declare the data fetching function
      const createUniversalProfile = async(evmNetworkDetails, chainId ) => { 
        // const NETWORK_RPC_URL = evmNetworkDetails.rpc_url;
        // const provider = useProvider({ chainId: CHAIN_ID})  
        // const {data: signer, isError, isLoading} = useSigner();      
        // await ethereum.send('eth_requestAccounts');
        // const provider1 = new ethers.providers.Web3Provider(window.ethereum);  

        // Using Wagmi
        // const {data: signer} = useSigner();
        // // const provider = new ethers.providers.Web3Provider((signer?.provider).provider);
        // const provider = useProvider({ chainId: CHAIN_ID}) 

        // Using Metamask Directly👍🏽
        ethereum.request({ method: 'eth_requestAccounts' })
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();  
        const user2Address = await signer.getAddress();
        //---------------------------------------------------------------- 


      
        const lspFactory = new LSPFactory(provider, {
          chainId: 0x61,
          ipfsGateway: process.env.NEXT_PUBLIC_INFURA_API_URL,
        });

        
        console.log("Onboard address: "+ user2Address);
        console.log('Creating new UP for Address: ' + user2Address); 

        const deployedContracts = await lspFactory.UniversalProfile.deploy(
          {
            controllerAddresses: [user2Address], // [myEOA.address]
          }, 
          {
            ERC725Account: {
                version: '0xF2c4116e9cEDf8bacBBC0751EAd6Fb4316d6ed05',
                deployProxy: true
            },
            LSP6Keymanager: {
              version: '0x0630E0bcD3f838e0d4e28DD1156265Da8Bdc4f67',
              deployProxy: true
            },
            LSP1UniversalReceiverDelegate: {
                version: '0.7.0', // Custom base contract address  ...if address '0x87cd003F9Ac7d6eBcd811f7b427c7dBF6f6ba132'
                deployProxy: true
            },
          }, 
          {
            onDeployEvents: {
              next: (deploymentEvent) => {
                console.log(deploymentEvent);
              },
              error: (error) => {
                console.error(error);
              },
              complete: (contracts) => {
                console.log('Universal Profile deployment completed');
                console.log(contracts);
              },
            }
          }
        );

        
        const myUPAddress = deployedContracts.LSP0ERC725Account.address;
        console.log("my Universal Profile address: ", myUPAddress);
      }

      // call the function
      createUniversalProfile(evmNetworkDetails, CHAIN_ID )
        // make sure to catch any error
        .catch(console.error);
    }else{
      console.log('UP Already Exists:')
    } 

  },[userAddress]);

  // useEffect(() => {
  //   console.log('Universal Profile Deploy with address: ' + userAddress); 

  //   // createUP(evmNetworkDetails, useProvider, userAddress );
  // },[]);

  return (
    <>
      <div className='text-emerald-500'>UpOnboarding</div>
      <div className='text-emerald-500'> {'Network: '+ network_details.network_name } </div>
      <div className='text-emerald-500'> {'Chain ID: '+ network_details.network_chain_id } </div>
      <div className='text-emerald-500'> {'RPC: '+ network_details.rpc_url } </div>
      <div className='text-emerald-500'> {'LSP Contract Name: '+ network_details.base_contracts_addresses[0].contract_name } </div>
      <div className='text-emerald-500'> {'LSP UP Contract Address: '+ network_details.base_contracts_addresses[0].contract_address } </div>
      <div className='text-emerald-500'> {'User Address: '+ userAddress } </div>
    </>
  )
}

export default UpOnboarding