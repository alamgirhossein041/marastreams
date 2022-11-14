export interface UniversalProfile {
    list_of_user_wallets: Array<string>
    up_account: string
    network_details: NetworkDetails
}

export interface NetworkDetails {
    network_name: string
    network_chain_id: string
    rpc_url: string
    base_contracts_addresses: Array<string>
    logo: Image
}


interface Image {
    asset: {
        url: string
    }
}