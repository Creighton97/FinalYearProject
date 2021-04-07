/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNameDev = /* GraphQL */ `
  query GetNameDev($name: String!, $date: AWSDate!) {
    getNameDev(name: $name, date: $date) {
      name
      date
      address
    }
  }
`;
export const listNameDevs = /* GraphQL */ `
  query ListNameDevs(
    $filter: TableNameDevFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNameDevs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        name
        date
        address
      }
      nextToken
    }
  }
`;
