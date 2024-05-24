import {gql} from "@apollo/client/index.js";

export const todosQuery = gql`
    query Todos {
        todos {
            _id
            title
            description
            completed
            isDeleted
            user {
                _id
                firstName
                lastName
                email
                identification
                identification_type
                type
                mobile
                address {
                    address
                    city
                    department
                    country
                    zipCode
                }
            }
        }
    }
`;