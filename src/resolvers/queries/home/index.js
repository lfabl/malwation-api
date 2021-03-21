import {
    r
} from '../../../database';

const home = async (payload, args, context) => {
    const userID = context.userID;

    const userData = await r
        .db("malwation")
        .table("users")
        .get(userID)
        .pluck(["id", "userName", "fullName"])
        .run();
    const userWalletExists = await r
        .db("malwation")
        .table("wallets")
        .filter({
            "userID": userID
        })
        .run();
    if(!(userWalletExists && userWalletExists.length)) return {
        message: "Cüzdan bulunamadı.",
        code: 504
    };
    const userWallet = userWalletExists[0];
    const userTransactions = await r
        .db("malwation")
        .table("transactions")
        .filter({
            "walletID": userWallet.id
        })
        .run();

    const allCoins = await r
        .db("malwation")
        .table("coins")
        .map((response) => {
            return {
                "id": response("id"),
                "name": response("name"),
                "shortName": response("shortName"),
                "total": response("total"),
                "saled": r
                    .db("malwation")
                    .table("transactions")
                    .filter({
                        "buy": response("shortName")
                    })
                    ("count")
                    .sum()
            };
        })
        .run();
    return {
        message: "Veriler başarıyla getirildi.",
        code: 200,
        data: {
            transactions: userTransactions,
            coins: allCoins,
            userData: userData
        }
    };
};
export default home;