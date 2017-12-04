import x from 'x-lib';

import dom from './dom';

// 默认设置
var defaults = {
  columnId: 0, // Id            td列 {从0开始}
  columnParentId: 1, // ParentId      td列 {从0开始}
  columnHandle: 2, // 动作栏        td列 {从0开始}
  columnOrderId: -1, // OrderId       td列 {从0开始}
  iconOpen: require('../assets/images/treetable/minus.gif'),
  iconClose: require('../assets/images/treetable/plus.gif'),
  display: 'expand' // collapsed (折叠) | expand (展开)
};

var TreeTableTranslator = {
  /*#region 函数:trim(text)*/
  /**
   * 注 jQuery的trim处理不了&nbsp;产生的"空格"
   */
  trim: function(text) {
    return text.replace(/(^[\s\xA0]*)|([\s\xA0]*jQuery)/g, '');
  },
  /*#endregion*/

  translate: function(options) {
    options = x.extend({}, defaults, options || {});

    var thead = options.target.querySelector('thead');
    var tbody = options.target.querySelector('tbody');

    // 空对象处理
    if (!tbody) return;

    // 只应用于 thead 和 tbody 标签
    if (thead.tagName.toUpperCase() != 'THEAD' || tbody.tagName.toUpperCase() != 'TBODY') return;

    if (options.columnId == null || options.columnParentId == null || options.columnHandle == null) return;

    var originalRows = [];
    var sortedRows = [];

    //构建行对象数组
    var list = tbody.querySelectorAll('tr');

    x.each(list, function(index, node) {
      var id = x.string.trim(node.querySelectorAll('td')[options.columnId].innerHTML);
      var parent = x.string.trim(node.querySelectorAll('td')[options.columnParentId].innerHTML);

      originalRows.push({ id: id, parent: parent, level: 0, node: 'leaf', expanded: true, obj: node });
    });

    var length = originalRows.length;

    var level = 0;
    var maxLevel = 100;

    //
    // 检查originalRows中的每一行的父行是否再sortedRows中，
    // 如果有则插入到sortedRows的父行后，从originalRows中删除
    // 直到originalRows都为null,生成排好序的sortedRows
    // 注:避免陷入死循环，设置最大的层次为100层。
    //
    while (length > 0 && level < maxLevel) {
      for (let i = 0; i < originalRows.length; i++) {
        let node = originalRows[i];

        if (node == null) continue;

        if (node.parent == '') {
          // 根行直接压入sortedRows
          sortedRows.push(node);
          originalRows[i] = null;
          length--;
        } else {
          for (let j = 0; j < sortedRows.length; j++) {
            if (sortedRows[j].id == node.parent) {
              // 从父行累计生成层次level
              node.level = sortedRows[j].level + 1;
              sortedRows[j].node = 'node';
              // 数组插入
              sortedRows.splice(j + 1, 0, node);
              originalRows[i] = null;
              length--;
              break;
            }
          }
        }
      }

      level++;
    } //while

    //展开事件动作函数
    var handleClick = function() {
      var id = x.string.trim(this.parentNode.parentNode.querySelectorAll('td')[options.columnId].innerHTML);

      var v = -1;

      for (var j = 0; j < sortedRows.length; j++) {
        var node = sortedRows[j];
        if (node.id == id) {
          // 在sortedRows找到行对象
          if (node.node == 'leaf') return;

          v = node.level;
          var img = node.obj.querySelectorAll('td')[options.columnHandle].querySelector('img');

          if (!node.expanded) {
            // 通过图标判断是展开还是收起
            img.src = options.iconOpen;
            node.expanded = true;
          } else {
            img.src = options.iconClose;
            node.expanded = false;
          }

          var show = node.expanded;

          var f = false; // 父行收起标志
          var tmp = 0; // 父行的层次

          for (var i = j + 1; i < sortedRows.length; i++) {
            //根据level更新后续的子行
            node = sortedRows[i];

            let img = node.obj.querySelectorAll('td')[options.columnHandle].querySelector('img');

            //判断是否是收起状态
            var t = !node.expanded;

            if (node.level > v && show) {
              //展开操作
              if (!f && !t) {
                //父行未收起，且当前行是展开状态
                // node.obj.show();
                node.obj.style.display = '';
              } else if (!f && t) {
                //父行未收起，且当前行是收起状态
                tmp = node.level;
                f = true;
                // node.obj.show();
                node.obj.style.display = '';
              } else if (f && node.level <= tmp) {
                //同级的前一行是收起状态
                if (!t) {
                  f = false;
                } else {
                  tmp = node.level;
                }
                // node.obj.show();
                node.obj.style.display = '';
              } else {
              }
            } else if (node.level > v && !show) {
              //收起操作则隐藏所以子行
              node.obj.style.display = 'none';
            } else if (node.level <= v) {
              //到达非子行，处理完毕
              break;
            }
          }

          break;
        }
      }
    };

    // 重新绘制表格，添加展开动作图标
    for (let j = sortedRows.length - 1; j > -1; j--) {
      // prepend 插入 tbody 内需使用反序
      var node = sortedRows[j];

      var img = new Image();
      img.src = options.iconOpen;

      // 绑定点击事件
      x.on(img, 'click', handleClick);

      var tr = node.obj.querySelectorAll('td')[options.columnHandle];

      var space = '&nbsp;';

      tr.insertBefore(dom.indent(), tr.firstChild);
      tr.insertBefore(img, tr.firstChild);

      // 生成缩进空格
      tr.insertBefore(dom.indent(node.level * 4), tr.firstChild);

      tbody.insertBefore(node.obj, tbody.firstChild);
    } //for

    // 重新获取排序后的行信息
    list = tbody.querySelectorAll('tr');

    // 折叠
    if (options.display == 'collapsed') {
      x.each(list, function(index, node) {
        let target = node.querySelectorAll('td')[options.columnHandle].querySelector('img');
        target.click();
      });
    }

    // 隐藏相关的列
    x.each(list, function(index, node) {
      var element = node.querySelectorAll('td')[options.columnId];
      element.style.display = 'none';

      element = node.querySelectorAll('td')[options.columnParentId];
      element.style.display = 'none';

      // 设置鼠标样式
      element = node.querySelectorAll('td')[options.columnHandle].querySelector('img');
      element.style.cursor = 'pointer';
    });

    // 隐藏头部信息
    list = thead.querySelectorAll('tr');

    x.each(list, function(index, node) {
      let element = node.querySelectorAll('th')[options.columnId];
      if (element) {
        element.style.display = 'none';
      }
      element = node.querySelectorAll('th')[options.columnParentId];
      if (element) {
        element.style.display = 'none';
      }
    });
  }
};

export default TreeTableTranslator;
