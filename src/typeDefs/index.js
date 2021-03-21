import mutations from './mutations';
import queries from './queries';

import Default from './spesificTypes/default';
import Signin from './spesificTypes/signin';

export default `
    ${Signin}
    ${Default}
    ${mutations}
    ${queries}
`;