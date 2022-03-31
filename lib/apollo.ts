import {ApolloClient, from, InMemoryCache} from '@apollo/client'
import {setContext} from '@apollo/client/link/context'
import {createUploadLink} from 'apollo-upload-client'
import {store} from './store'

const uploadLink = createUploadLink({
    uri: process.env.NEXT_PUBLIC_API_ENDPOINT,
})
const client = () => {
    const myStore = store.getState()
    //@ts-ignore
    const token = myStore.auth.user.token
    const authLink = setContext(async (_, {headers}) => {
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : '',
            },
        }
    })

    return new ApolloClient({
        link: from([authLink.concat(uploadLink)]),
        cache: new InMemoryCache({
            addTypename: false,
        }),
    })
}

export default client
