import React from 'react';
import ReactDOM from 'react-dom';
import Fab from './fab';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Fab />, div);
  ReactDOM.unmountComponentAtNode(div);
});