
import { Amplify } from 'aws-amplify';

// Initialize Amplify with default configuration
// Replace this with your actual Amplify configuration after running 'npx ampx sandbox' or 'npx ampx deploy'
const awsConfig = {
  // This is a placeholder. You'll need to replace with your actual AWS Amplify configuration
  Auth: {
    region: 'us-east-1', // Replace with your region
    userPoolId: 'REPLACE_WITH_YOUR_USER_POOL_ID',
    userPoolWebClientId: 'REPLACE_WITH_YOUR_WEB_CLIENT_ID',
  },
  API: {
    GraphQL: {
      endpoint: 'REPLACE_WITH_YOUR_APPSYNC_ENDPOINT',
      region: 'us-east-1', // Replace with your region
      defaultAuthMode: 'userPool',
    }
  }
};

// Configure Amplify
export const configureAmplify = () => {
  Amplify.configure(awsConfig);
};

export default awsConfig;
