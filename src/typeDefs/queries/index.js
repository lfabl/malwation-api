export default `
    type Query {
        signin(
            userName: String!,
            password: String!,
            rememberMe: Boolean
        ): Signin,
        tokenControl(
            token: String!
        ): TokenControl
    }
`;