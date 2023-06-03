import React from 'react';
import ReactDOM from 'react-dom/client';
import UsersList from './components';

import 'semantic-ui-css/semantic.min.css'
import './main.css';

const container = document.getElementById('root')!;
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <UsersList />
  </React.StrictMode>
);
