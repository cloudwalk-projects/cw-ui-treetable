import x from 'x-lib';

import dom from './dom';

// 默认设置
var defaults = {
  columnId: 0,             // Id            td列 {从0开始}
  columnParentId: 1,       // ParentId      td列 {从0开始}
  columnHandle: 2,         // 动作栏        td列 {从0开始}
  columnOrderId: -1,       // OrderId       td列 {从0开始}
  iconOpen: require('../assets/images/treetable/minus.gif'),
  iconClose: require('../assets/images/treetable/plus.gif'),
  display: 'expand'       // collapsed (折叠) | expand (展开)
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

    // var me = $('#' + options.targetName);
    var thead = options.target.querySelector('thead');
    var tbody = options.target.querySelector('tbody');

    // 只处理一个表格
    if (!tbody) return;

    if (tbody.tagName.toUpperCase() != 'TBODY') return; // 只应用于tbody

    // var options = jQuery.extend({}, jQuery.treeTable.defaults, settings);

    if (options.columnId == null || options.columnParentId == null || options.columnHandle == null) return;

    // var jQueryme = jQuery(me);

    var originalRows = [];
    var sortedRows = [];
    //构建行对象数组
    /*
    jQueryme.find('tr').each(function() {
      var id = jQuery.trim(
        jQuery(this)
          .find('td:eq(' + options.columnId + ')')
          .text()
      );
      var parent = jQuery.trim(
        jQuery(this)
          .find('td:eq(' + options.columnParentId + ')')
          .text()
      );

      originalRows.push({ id: id, parent: parent, level: 0, node: 'leaf', expanded: true, obj: jQuery(this) });
    });
    */
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
              node.level = sortedRows[j].level + 1; // 从父行累计生成层次level
              sortedRows[j].node = 'node';
              sortedRows.splice(j + 1, 0, node); // 数组插入
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
      /*var id = x.ui.pkg.treeTable.trim(
        jQuery(this)
          .parent()
          .parent()
          .find('td:eq(' + options.columnId + ')')
          .text()
      ); //获取当前行Id
      */
      // .querySelectorAll('td')[options.columnId]
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

            var t = !node.expanded; //判断是否是收起状态

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
              // node.obj.hide();
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
      //prepend插入tbody内需使用反序
      var node = sortedRows[j];

      // var img = jQuery('<img src="' + options.iconOpen + '">');
      // img.click(handleClick);
      var img = new Image();
      img.src = options.iconOpen;

      // 绑定点击事件
      x.on(img, 'click', handleClick);

      // var tr = node.obj.find('td:eq(' + options.columnHandle + ')');
      var tr = node.obj.querySelectorAll('td')[options.columnHandle];

      var space = '&nbsp;';
      // var space = ' ';

      // tr.prepend();
      // tr.prepend(space);
      tr.prepend(dom.indent());
      tr.prepend(img);

      // 生成缩进空格
      // var indent = new Array(node.level * 5).join(space);
      // tr.prepend(indent);

      tr.prepend(dom.indent(node.level * 4));

      tbody.prepend(node.obj);
    } //for

    if (options.display == 'collapsed') {
      /*
      jQuery(me)
        .find('tr')
        .find('td:eq(' + options.columnHandle + ')')
        .find('img')
        .click();
      */
      x.each(tbody.querySelectorAll('tr'), function(index, node) {
        let target = node.querySelectorAll('td')[options.columnHandle].querySelector('img');
        target.click();
      });
    }

    // 隐藏相关的列

    // 隐藏头部信息
    list = thead.querySelectorAll('tr');
    /*
    jQuery(me).parent().find('tr:eq(0)').find('th:eq(' + options.columnId + ')').hide();
    jQuery(me).parent().find('tr:eq(0)')
      .find('th:eq(' + options.columnParentId + ')')
      .hide();
    */

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

    // 重新获取排序后的行信息
    list = tbody.querySelectorAll('tr');

    /*
    jQuery(me)
      .find('tr')
      .find('td:eq(' + options.columnId + ')')
      .hide();
    jQuery(me)
      .find('tr')
      .find('td:eq(' + options.columnParentId + ')')
      .hide();
    */

    /*
    // 添加图标鼠标样式
    jQuery(me)
      .find('tr')
      .find('td:eq(' + options.columnHandle + ')')
      .find('img')
      .css('cursor', 'pointer');
    */
    x.each(list, function(index, node) {
      var element = node.querySelectorAll('td')[options.columnId];
      element.style.display = 'none';

      element = node.querySelectorAll('td')[options.columnParentId];
      element.style.display = 'none';

      element = node.querySelectorAll('td')[options.columnHandle].querySelector('img');
      element.style.cursor = 'pointer';
    });
  }
};

export default TreeTableTranslator;
