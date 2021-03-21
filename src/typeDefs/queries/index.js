export default `
    type Query {
        signin(
            userName: String!,
            password: String!
        ): Signin
    }
`;