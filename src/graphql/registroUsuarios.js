import { gql } from '@apollo/client/core';

export const REGISTRO_USUARIO = gql`
  mutation RegistroUsuario(
    $username: String!
    $email: String!
    $password: String!
    $nombre: String!
    $apellidos: String!
    $celular: String!
  ) {
    registroUsuario(
      username: $username
      email: $email
      password: $password
      nombre: $nombre
      apellidos: $apellidos
      celular: $celular
    ) {
      ok
      message
      userId
    }
  }
`;
