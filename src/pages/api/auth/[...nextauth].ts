import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import Auth0Provider from 'next-auth/providers/auth0'

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID ?? '',
      clientSecret: process.env.AUTH0_CLIENT_SECRET ?? '',
      issuer: process.env.AUTH0_ISSUER,
    }),
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    // CredentialsProvider({
    //   name: 'Sign in',
    //   // generate a suitable form on the sign in page.
    //   credentials: {
    //     username: {
    //       label: 'Email',
    //       type: 'email',
    //       placeholder: 'hello@example.com',
    //     },
    //     password: { label: 'Password', type: 'password' },
    //   },
    //   async authorize(credentials, req) {
    //     // const res = await fetch('/your/endpoint', {
    //     //   method: 'POST',
    //     //   body: JSON.stringify(credentials),
    //     //   headers: { 'Content-Type': 'application/json' }
    //     // });

    //     // const user = await res.json();

    //     // If no error and we have user data, return it
    //     // if (res.ok && user) {
    //     //   return user;
    //     // }

    //     // return test user
    //     return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }

    //     // Return null if user data could not be retrieved
    //     // return null;
    //   },
    // }),
    // ...add more providers here
  ],
}
export default NextAuth(authOptions)
