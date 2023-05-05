import { createRoot } from 'react-dom/client';
import "./app/styles/reset.scss";
import "./app/styles/index.scss";
import './app/types/header-decl.d';
import {Navbar} from "header/Navbar";
// import App from 'header/App';

const container = document.getElementById('root') as HTMLDivElement;

// create a root
const root = createRoot(container);

// render app to root
root.render(
    <Navbar />
);
