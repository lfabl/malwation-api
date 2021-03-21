import {
    JWT_KEY
} from '../../../constants';
import {
    r
} from '../../../database';
import jwt from 'jsonwebtoken';

const tokenControl = async (payload, args, context) => {
    let tokenVerify;
    try {
        tokenVerify = jwt.verify(args.token, JWT_KEY);
    } catch(e) {
        console.log(e);
    }
    if(tokenVerify && tokenVerify.userName) {
        const userData = await r
            .db("malwation")
            .table("users")
            .filter({
                userName: tokenVerify.userName,
                token: args.token
            })
            .run();
        if(!(userData && userData.length)) return {
            message: "Token hatalı.",
            code: 400
        };
        const user = userData[0];
        return {
            message: "Token kontrolü başarılı.",
            code: 200,
            userName: user.userName
        };
    } else {
        return {
            message: "Oturum süresi dolmuş.",
            code: 400
        };
    }
};
export default tokenControl;