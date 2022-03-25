import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query users($username:String){
    users(username:$username){
      username
      email
      _id
    }
  }
`;

export const find_user = gql`
  mutation($email: String!){
    findUser(email: $email) {
      username
      _id
    }
  }
`;