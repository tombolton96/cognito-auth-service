import {
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
  ConfirmSignUpCommandInput,
  SignUpCommand,
  SignUpCommandInput
} from "@aws-sdk/client-cognito-identity-provider"

const client = new CognitoIdentityProviderClient({
    region: process.env.AWS_REGION
})

type SignUpParams = {
  username: string
  password: string
  email: string
}

export const signUp = async ({ username, password, email }: SignUpParams) => {
    const params: SignUpCommandInput = {
        ClientId: process.env.USER_POOL_CLIENT_ID,
        Username: username,
        Password: password,
        UserAttributes: [
          {
            Name: "email",
            Value: email
          },
        ],
    }

    const command = new SignUpCommand(params)

    try {
        return await client.send(command)
      } catch (error) {
        throw error
      }
}

type ConfirmParams = {
  username: string
  confirmationCode: string
}

export const confirmSignUp = async ({ username, confirmationCode }: ConfirmParams) => {
  const params: ConfirmSignUpCommandInput = {
    ClientId: process.env.USER_POOL_CLIENT_ID,
    Username: username,
    ConfirmationCode: confirmationCode,
  }

  const command = new ConfirmSignUpCommand(params)

  try {
    return await client.send(command)
  } catch (error) {
    throw error
  }
}