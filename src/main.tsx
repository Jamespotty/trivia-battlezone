
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { configureAmplify } from './aws-config'

// Initialize AWS Amplify
configureAmplify();

createRoot(document.getElementById("root")!).render(<App />);
