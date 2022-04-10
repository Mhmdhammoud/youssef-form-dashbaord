import {gql} from "@apollo/client";

const meQuery = gql`query me {
    me {
        errors {
            field
            message
        }
        admin {
            _id
            fullName
            fname
            lname
            email
            role
            adminId
            isActive
            createdAt
            updatedAt
        }
    }
}`
export default meQuery
