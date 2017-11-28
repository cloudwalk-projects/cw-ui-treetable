const dom = {
  // 创建空白缩进
  indent: function(number = 1) {
    var span = document.createElement('span');
    span.style.paddingRight = number * 5 + 'px';

    return span;
  },
  // 创建对象
  create: function(html) {
    var list = [];

    var tmp = document.createElement('div');

    tmp.innerHTML = html;

    for (var i = 0; i < tmp.childNodes.length; i++) {
      list[list.length] = tmp.childNodes[i].cloneNode(true);
    }

    return list;
  },
  // 追加 html 标记
  prepend: function(element, html) {
    var nodes = dom.nodes(html);

    for (var i = 0; i < nodes.length; i++) {
      element.appendChild(nodes[i]);
    }

    return element;
  }
};

export default dom;
