import React from 'react';
import {render} from 'react-dom';
import Provider from './provider';
import Root from './root';
import './style/roboto.scss';

render( <Provider root={Root}/>, document.getElementById('app'));
