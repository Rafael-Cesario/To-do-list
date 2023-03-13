export const TagsTypeDef = `#graphql
    input InputCreateTag {
        email: String!
        listName: String!
        id: String!
        tag: String!
    }

    type Mutation {
        createTag (createTag: InputCreateTag): TypeMessage!
    }
`;
