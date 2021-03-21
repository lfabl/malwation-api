import mutations from './mutations';
import queries from './queries';

import Default from './spesificTypes/default';
import Signin from './spesificTypes/signin';
import TokenControl from './spesificTypes/tokenControl';

export default `
    ${TokenControl}
    ${Signin}
    ${Default}
    ${mutations}
    ${queries}
`;