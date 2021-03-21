import mutations from './mutations';
import queries from './queries';

import Default from './spesificTypes/default';
import Signin from './spesificTypes/signin';
import TokenControl from './spesificTypes/tokenControl';
import Home from './spesificTypes/home';
import Coin from './spesificTypes/coin';
import Transaction from './spesificTypes/transaction';
import User from './spesificTypes/user';

export default `
    ${User}
    ${Transaction}
    ${Coin}
    ${Home}
    ${TokenControl}
    ${Signin}
    ${Default}
    ${mutations}
    ${queries}
`;