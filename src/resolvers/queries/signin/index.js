import {
    USER_NAME_REGEX,
    JWT_KEY
} from '../../../constants';
import {
    r
} from '../../../database';
import validator from 'validator';
import jwt from 'jsonwebtoken';

const _validation = (args) => {
    if(args.password.trim() === "") {
        return {
            message: "Parola boş olamaz.",
            code: 400
        };
    }

    if(args.userName.trim() === "") {
        return {
            message: "Kullanıcı adı boş olamaz.",
            code: 400
        };
    }

    if(args.password.trim().length > 80 || args.password.trim().length < 8) {
        return {
            message: "Parola uzunluğu 8 ile 80 arasında olmalıdır.",
            code: 400
        };
    }

    if(args.userName.trim().length > 50 || args.userName.trim().length < 8) {
        return {
            message: "Kullanıcı adı uzunluğu 8 ile 50 arasında olmalıdır.",
            code: 400
        };
    }

    if(!USER_NAME_REGEX.test(args.userName.trim())) {
        return {
            message: "Kullanıcı adı bir kullanıcı adı olma şartlarını taşımıyor.",
            code: 400
        };
    }

    if(!validator.isMD5(args.password)) {
        return {
            message: "Parola güvenli olmayan bir yol ile gönderildi. Lütfen yazılım geliştirici ile irtibata geçiniz.",
            code: 400
        };
    }
    return true;
};

const signin = async (payload, args, context) => {
    const isValid = _validation(args);
    if(isValid !== true) return isValid;

    const userData = await r
        .db("malwation")
        .table("users")
        .filter({
            userName: args.userName
        })
        .run();
    if(!(userData && userData.length)) return {
        message: "Kullanıcı bulunamadı.",
        code: 500
    };

    const user = userData[0];
    if(user.password !== args.password) {
        return {
            message: "Parola hatalı.",
            code: 503
        };
    } else {
        let jwtOptions = {
        };

        if(args.rememberMe) jwtOptions.expiresIn = "1h";

        const newToken = jwt.sign({
            "userName": user.userName
        }, JWT_KEY, jwtOptions);
        const tokenSave = await r
            .db("malwation")
            .table("users")
            .get(user.id)
            .update({
                token: newToken
            })
            .run();

        if(tokenSave.replaced) {
            return {
                message: "Giriş başarılı.",
                code: 200,
                token: newToken
            };
        } else {
            return {
                message: "Giriş yapılamadı.",
                code: 500
            };
        }
    }
};
export default signin;