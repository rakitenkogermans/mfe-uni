import { createRoot } from 'react-dom/client';
import "./app/styles/reset.scss";
import "./app/styles/index.scss";
import App from './app/App';

const container = document.getElementById('root');

// create a root
const root = createRoot(container);

// render app to root
root.render(
    <App />
);
