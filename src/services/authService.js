import apolloClient from '@/apollo/apolloClient'
import { LOGIN_ADMIN } from '@/graphql/login'

export async function loginAdmin(email, password) {
  try {
    const { data } = await apolloClient.mutate({
      mutation: LOGIN_ADMIN,
      variables: { email, password },
    })

    const token = data.login.token
    localStorage.setItem('adminToken', token)

    return { success: true, user: data.login }
  } catch (error) {
    console.error(error)
    return { success: false, message: error.message }
  }
}

export function logoutAdmin() {
  localStorage.removeItem('adminToken')
}
