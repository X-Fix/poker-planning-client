import React from 'react';
import ReactDOM from 'react-dom';
import printMe from './print';

const Body: React.FC = () => {
  return (
    <div>
      Hello webpack
      <button onClick={printMe}>Click me and check the console</button>
    </div>
  );
};

ReactDOM.render(<Body />, document.getElementById('root'));
