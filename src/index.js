import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import RootRouter from './routing/RootRouter';
import GameField from './scenes/CreatureConstructor/GameField'
import registerServiceWorker from './serviceWorker/registerServiceWorker';

ReactDOM.render(<GameField/>, document.getElementById('root'));
registerServiceWorker();
