const Home = `
    type Home {
        message: String!,
        code: Int!
        data: HomeData
    },
    type HomeData {
        transactions: [Transaction],
        coins: [Coin],
        userData: User
    }
`;
export default Home;