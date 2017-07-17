import Layer from './components/layer/layer.js';
import mainstyle from './assets/css/main.css';

const App = function () {
  var root = document.getElementById('root');
  var main = document.createElement('div');
  main.setAttribute('name', 'ho');
  main.className = "main";

  var layer = new Layer();
  main.innerHTML = layer.tpl({
    name: "house",
    phone:['apple','mimi','ipad']
  });
  root.appendChild(main);

  console.log(layer);
}

new App();