import printMe from './print';

function component() {
  const element = document.createElement('div');
  const button = document.createElement('button');

  const { hello } = Object.assign({}, { hello: 'Hello webpack' });

  element.innerText = hello;

  button.innerText = 'Click me and check the console';
  button.onclick = printMe;

  element.appendChild(button);

  return element;
}

document.body.appendChild(component());
