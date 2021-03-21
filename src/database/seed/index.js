export const TABLE_LIST = [
    "coins",
    "transactions",
    "users",
    "wallets"
];

export const USER_LIST = [
    {
        "id": "cab32b36-d55c-4397-b1a0-1d3d2bd6fd45",
        "createdAt": new Date().toISOString(),
        "fullName": "Furkan Atakan BOZKURT",
        "userName": "furkanatakanbozkurt",
        "password": "82f28842ec1c0f0e7c1f8bbf8961b750"
    }
];

export const TRANSACTIONS = [
    {
        "buy": "btc",
        "count": 96456,
        "walletID": "33e09d57-149b-41a2-9671-9f401a69d4b2"
    }
];

export const WALLETS = [
    {
        "userID": "cab32b36-d55c-4397-b1a0-1d3d2bd6fd45",
        "id": "33e09d57-149b-41a2-9671-9f401a69d4b2"
    }
];

export const COINS = [
    {
        "name": "Bitcoin",
        "shortName": "btc",
        "total": 100000000
    },
    {
        "name": "Etherium",
        "shortName": "eth",
        "total": 500000
    },
    {
        "name": "Furkan Coin",
        "shortName": "fuc",
        "total": 500000000
    }
];