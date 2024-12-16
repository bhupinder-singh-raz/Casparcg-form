import { gql } from '@apollo/client';

export const CREATE_CAPTION_MUTATION = gql`
  mutation createCaption(
    $playerOut: String!,
    $playerOutNumber: Int!,
    $playerIn: String!,
    $playerInNumber: Int!,
    $substitutionTime: String!
  ) {
    createCaption(
      playerOut: $playerOut,
      playerOutNumber: $playerOutNumber,
      playerIn: $playerIn,
      playerInNumber: $playerInNumber,
      substitutionTime: $substitutionTime
    ) {
      playerOut
      playerOutNumber
      playerIn
      playerInNumber
      substitutionTime
    }
  }
`;
