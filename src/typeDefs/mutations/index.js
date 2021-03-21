export default `
    type Mutation {
        signup(
            fullName: String!,
            userName: String!,
            password: String!
        ): Default
    }
`;