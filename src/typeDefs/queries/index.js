export default `
    type Query {
        signin(
            userName: String!,
            password: String!,
            rememberMe: Boolean
        ): Signin
    }
`;