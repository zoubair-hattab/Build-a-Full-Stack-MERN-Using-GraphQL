import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      username
      name
      gender
      profilePicture
    }
  }
`;
export const REGISTER = gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      username
      name
      gender
      profilePicture
    }
  }
`;

export const LOGOUT = gql`
  mutation logout {
    logout {
      message
    }
  }
`;
