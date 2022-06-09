import {
  AuthenticationDetails, CognitoUser, CognitoUserPool, CognitoUserSession,
} from 'amazon-cognito-identity-js';

const userPool = new CognitoUserPool({
  UserPoolId: `${process.env.REACT_APP_USERPOOL_ID}`,
  ClientId: `${process.env.REACT_APP_CLIENT_ID}`,
});

class AuthProvider {
  signIn = async (username: string, password: string): Promise<CognitoUserSession> => {
    const authenticationData = { Username: username, Password: password };
    const cognitoUser = new CognitoUser({ Username: username, Pool: userPool });
    return new Promise((resolve, reject) => {
      const authenticationDetails = new AuthenticationDetails(authenticationData);
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess(session) {
          resolve(session);
        },
        onFailure(error: any) {
          reject(new Error(error));
        },
        newPasswordRequired(userAttributes: any) {
          // User was signed up by an admin and must provide new
          // password and required attributes, if any, to complete
          // authentication.

          // the api doesn't accept this field back
          const {
            email_verified: emailVerified,
            phone_number_verified: phoneNumberVerified,
            email,
            phone_number: phoneNumber,
            ...newUserAttributes
          } = userAttributes;
          // Get these details and call
          cognitoUser.completeNewPasswordChallenge(password, newUserAttributes, this);
        },
      });
    });
  }

  getSession = async () : Promise<CognitoUserSession> => {
    const currentUser = userPool.getCurrentUser();
    if (!currentUser) {
      return Promise.reject(new Error('User has not logged in!'));
    }
    return new Promise((resolve, reject) => {
      currentUser.getSession((error: Error | null, session: null | CognitoUserSession) => {
        if (error) {
          reject(error);
        } else if (session) {
          resolve(session);
        }
      });
    });
  }

  signOut = () : void => {
    const currentUser = userPool.getCurrentUser();
    if (!currentUser) {
      return;
    }
    currentUser.signOut();
  }

  forgotPassword = (username: string) => {
    const cognitoUser = new CognitoUser({ Username: username, Pool: userPool });
    cognitoUser.forgotPassword({
      onSuccess: (result) => console.log('call result', result),
      onFailure: (err) => alert(err),
    });
  }

  resetPassword = (username: string, verificationCode: string, newPassword: string) => {
    const cognitoUser = new CognitoUser({ Username: username, Pool: userPool });
    cognitoUser.confirmPassword(verificationCode, newPassword, {
      onSuccess() {
        console.log('Password confirmed!');
      },
      onFailure(err) {
        console.log('Password not confirmed!', err);
      },
    });
  }
}

const authProvider = new AuthProvider();
export default authProvider;
