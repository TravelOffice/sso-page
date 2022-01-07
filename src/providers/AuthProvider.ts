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
}

const authProvider = new AuthProvider();
export default authProvider;
