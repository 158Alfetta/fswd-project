import { gql } from '@apollo/client';

// reset is for test
export const RESET_CART = gql`
mutation UpdateCart($userId: String!){
    updateCart(filter:{
      createdById: $userId
    }, record:{
      product :[
      {
        productId: "6076b912f4d1450a8f8b2bd1"
        quantity : 10
          _id: "6076edafc6f8b61586287e4e"
      },
      {
        productId: "6076b902f4d1450a8f8b2bd0"
        quantity : 100
        _id: "6076edafc6f8b61586287e4f"
      }
    ]
      createdById: $userId
    }) {
      __typename
    }
  }
`;

export const CREATE_CART = gql`
mutation createNewCart($userId: String!){
  createCart(record: {
    product: []
    createdById: $userId
  })
  {
    __typename
  }
}
`

export const UPDATE_CART = gql`
mutation updateItem($userId: String!, $product: [UpdateOneCartProductInput]!){
  updateCart(
    filter: { createdById: $userId }
    record: {
      product: $product
    }
  ) {
    __typename
  }
}
`;

export const CLEAR_CART = gql`
mutation ClearCart($userId: String!){
    updateCart(filter:{
      createdById: $userId
    }, record:{
      product :[]
    }) {
      __typename
    }
  }
`;