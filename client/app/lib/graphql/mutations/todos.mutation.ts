import {gql} from "@apollo/client/index.js";

export const todoUpdateMutation = gql`
    mutation UpdateTodo($input: TodoInput!) {
        updateTodo(input: $input) {
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