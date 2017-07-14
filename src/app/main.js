// var greeter = require('./Greeter.js');
// document.getElementById('root').appendChild(greeter());
// document.getElementById('root').innerText = "hell webpack!";
import Library from './library';

if (module.hot) {
  module.hot.accept('./library', function() {
    console.log('Accepting the updated library module!');
    Library.log();
  })
}