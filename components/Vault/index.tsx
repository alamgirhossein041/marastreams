import React, { useEffect, useState } from 'react'
import UpDashboard from './UpDashboard'
import UpOnboarding from './UpOnboarding'
import { useStateContext } from '../../contexts/ContextProvider';
import { UniversalProfile } from '../../typings'


interface Props {
  universal_profiles: [UniversalProfile];
  list_of_user_wallets: list_of_user_wallets
  up_account: string;
}

interface list_of_user_wallets {
  list_of_user_wallets: string[];
  some: any;
}

const Dashboard = () => {
  const { universalProfile, setUniversalProfile, upList, userAddress } = useStateContext();

  const [loading, setLoading] = useState<boolean>(true);
  // const [universalProfile, setUniversalProfile] = useState<string>(''); {/** = () =>{return '0x78d659d3fA8F09a209B36082a5B60708eD7DB7B3'; } // '0x78d659d3fA8F09a209B36082a5B60708eD7DB7B3';  */}

  
  const fetchUniversalProfile = async (upList: [Props], userAddress: any) => {   
    const filterUps = (filters:string | any) => upList.filter(up => up.list_of_user_wallets.some(g => filters.includes(g)))
    let eoa_address = [userAddress]
    if(filterUps(eoa_address)[0] != undefined){
        const up = filterUps(eoa_address)[0].up_account
        // console.log('UP: ',up)
        setUniversalProfile(up)

    }else {console.log('err')}   
  }

  useEffect(() => {
    setLoading(true);
    // console.log('EOA: ',userAddress);
    fetchUniversalProfile(upList, userAddress);
    setLoading(false);
  },[userAddress]);

  const universalProfile1 = '';



  return (
    <>
      { loading ? (
        <div className='text-white'>Loading...</div>
        ) : (
         universalProfile == ''  ? (
          <UpOnboarding />
        ) : (
          <UpDashboard />
        )
      )}
    </>
  )
}

export default Dashboard
