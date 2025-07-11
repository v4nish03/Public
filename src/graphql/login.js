// Mutacion de login
import { gql } from '@apollo/client/core'

export const LOGIN_USUARIO = gql`
  mutation Login($email: String!, $password: String!) {
    loginUsuario(email: $email, password: $password) {
      token
      userId
      email
      username
    }
  }
`
