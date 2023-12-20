import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth , { AuthOptions }  from "next-auth";

export const Options: AuthOptions= {
    providers:[
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string ,
          }),

          CredentialsProvider({
            name:'credentials',
            credentials:{
            username: {
                label:'nome/email',
                type:'text',
                placeholder:'digite seu nome'
            },
            password: {
                label:'senha',
                type:'password',
                placeholder:'digite sua senha'
            }
            },
            async authorize (credentials) {
                const user = {id:"10001", name:"noor", password:'noor' }
                if(credentials?.username === user.name && 
                    credentials?.password === user.password) {
                        return user;
                }else {
                    return null;
                }
            }
          }),
    ],
}