import {
    USER_NAME_REGEX
} from '../../../constants';
import {
    r
} from '../../../database';
import validator from 'validator';

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

    if(args.fullName.trim() === "") {
        return {
            message: "Tam ad boş olamaz.",
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

    if(args.fullName.trim().length > 100 || args.fullName.trim().length < 4) {
        return {
            message: "Tam ad uzunluğu 4 ile 100 arasındda olmalıdır.",
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

const signup = async (payload, args, context) => {
    const isValid = _validation(args);
    if(isValid !== true) return isValid;
    
    const isExistsUser = await r
        .db("malwation")
        .table("users")
        .filter({
            "userName": args.userName
        })
        .run();
    if(isExistsUser && isExistsUser.length) return {
        message: "Bu kullanıcı zaten oluşturulmuş.",
        code: 503
    };
    
    let newUser = {
        userName: args.userName,
        fullName: args.fullName,
        password: args.password,
        createdAt: new Date().toISOString()
    };
    const register = await r
        .db("malwation")
        .table("users")
        .insert(newUser, {
            returnChanges: true 
        })
        .run();
    if(register.inserted) {
        const data = register.changes[0].new_val;
        return await r
            .db("malwation")
            .table("wallets")
            .insert({
                "userID": data.id
            })
            .then(() => {
                return {
                    message: "Kayıt başarılı.",
                    code: 200
                };
            })
            .catch(e => {
                return {
                    message: e.message,
                    code: 504
                };
            });
    } else {
        return {
            message: "Kayıt oluşturulamadı.",
            code: 500
        };
    }
};
export default signup;