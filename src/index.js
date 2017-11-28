import Treetable from './components/treetable';

const componentPrefix = 'Cw';

const components = {
  // 树型表格
  Treetable
};

const install = function(Vue, options = {}) {
  var prefix = options.componentPrefix || componentPrefix;
  Object.keys(components).forEach(key => {
    Vue.component(prefix + key, components[key]);
  });
};

let componentArray = {};

Object.keys(components).forEach(key => {
  componentArray[componentPrefix + key] = components[key];
});

export default {
  install,
  ...componentArray
};
