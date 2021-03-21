import {
    RETHINKDB_ADDRESS,
    RETHINKDB_PORT
} from '../constants';
import {
    asyncForEach
} from '../helpers';
import {
    TRANSACTIONS,
    TABLE_LIST,
    USER_LIST,
    WALLETS,
    COINS
} from './seed';

export var r = require('rethinkdbdash')({
    servers: [{
        host: RETHINKDB_ADDRESS,
        port: RETHINKDB_PORT
    }]
});

const createInitialDatabase = async () => {
    const dbList = await r.dbList();
    if(dbList.indexOf("malwation") === -1) {
        await r.dbCreate("malwation").run();
    }
    const tableList = await r.db("malwation").tableList();
    await asyncForEach(TABLE_LIST, async item => {
        if(tableList.indexOf(item) === -1) await r
            .db("malwation")
            .tableCreate(item)
            .run();
    });
    await r
        .db("malwation")
        .table("users")
        .insert(USER_LIST)
        .run();
    await r
        .db("malwation")
        .table("transactions")
        .insert(TRANSACTIONS)
        .run();
    await r
        .db("malwation")
        .table("wallets")
        .insert(WALLETS)
        .run();
    await r
        .db("malwation")
        .table("coins")
        .insert(COINS)
        .run();
};
createInitialDatabase();