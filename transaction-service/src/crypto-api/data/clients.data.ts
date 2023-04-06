import { Client } from "../types";

//demo clients with their id and wallets for different currencies
const registeredClients: Client[] = [
    {
        clientId: 'c1',
        wallets: [
            {
                currency: 'BTC',
                address: 'myueAFjQTdnmxkoM4QbuAym28BhTGQ3usq'
            },
            {
                currency: 'BNB',
                address: 'n4o5ciu8ceQ6i9hgFgTSeeXzP5ZdifttNN'
            }
        ]
    },
    {
        clientId: 'c2',
        wallets: [
            {
                currency: 'BTC',
                address: 'mnNiUykkHH7nwQrGgQiSdVt6fpXNpf2L1K'
            }
        ]
    }
]

export default registeredClients;