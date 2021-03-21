import printMe from './print';

function component() {
  const element = document.createElement('div');
  const button = document.createElement('button');

  element.innerText = 'Hello webpack';

  button.innerText = 'Click me and check the console';
  button.onclick = printMe;

  element.appendChild(button);

  return element;
}

document.body.appendChild(component());
