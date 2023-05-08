import { createRoot } from 'react-dom/client';
import "./app/styles/reset.scss";
import "./app/styles/index.scss";
import App from './app/App';
import { StoreProvider } from "./app/context/Store";

const container = document.getElementById('root') as HTMLDivElement;

// create a root
const root = createRoot(container);

// render app to root
root.render(
    <StoreProvider>
        <App />
    </StoreProvider>
);
