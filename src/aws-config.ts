
import { Amplify } from 'aws-amplify';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import { type ResourcesConfig } from 'aws-amplify/core';

// Initialize Amplify with default configuration
// Replace this with your actual Amplify configuration after running 'npx ampx sandbox' or 'npx ampx deploy'
const awsConfig: ResourcesConfig = {
  // This is a placeholder. You'll need to replace with your actual AWS Amplify configuration
  Auth: {
    Cognito: {
      userPoolId: 'REPLACE_WITH_YOUR_USER_POOL_ID',
      userPoolClientId: 'REPLACE_WITH_YOUR_WEB_CLIENT_ID',
      loginWith: {
        email: true,
        username: true,
      },
    }
  },
  API: {
    GraphQL: {
      endpoint: 'REPLACE_WITH_YOUR_APPSYNC_ENDPOINT',
      region: 'us-east-1', // Replace with your region
      defaultAuthMode: 'userPool' as const,
    }
  }
};

// Configure Amplify
export const configureAmplify = () => {
  Amplify.configure(awsConfig);
  
  // Set the auth provider to Cognito User Pools
  cognitoUserPoolsTokenProvider.setKeyValueStorage({
    setItem: (key, value) => {
      try {
        localStorage.setItem(key, value);
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    getItem: (key) => {
      try {
        const value = localStorage.getItem(key);
        return Promise.resolve(value);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    removeItem: (key) => {
      try {
        localStorage.removeItem(key);
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    clear: () => {
      try {
        localStorage.clear();
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    }
  });
};

export default awsConfig;
