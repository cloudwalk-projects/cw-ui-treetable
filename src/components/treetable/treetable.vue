<template>
   <table ref="treetable" :class="classes" >
    <caption v-if="caption">{{caption}}</caption>
    <thead class="cw-treetable__thead">
      <tr>
        <th v-if="selection" class="cw-treetable__selection">
          <input type="checkbox" class="selection" value="" @change="(evt)=>{ handleChange(evt, '') }" />
        </th>
        <template v-for="column in columns">
        <th v-if="column.width" :key="column.key" :style="{width:column.width}" >{{column.label}}</th>
        <th v-else :key="column.key" >{{column.label}}</th>
        </template>
      </tr>
    </thead>
    <tbody class="cw-treetable__tbody">
    <template>
    </template>
    <template v-for="(row, index) in rows">
      <tr :key="row[columnKey]" class="cw-treetable__row " @click="(evt)=>{ handleClick(evt, row[columnKey]); }">
        <td v-if="selection" :key="row[columnKey] + '-selection'" class="cw-treetable__selection" >
            <input type="checkbox" class="selection" :value="row[columnKey]" @change="(evt)=>{ handleChange(evt, row[columnKey]) }" />
        </td>
        <template v-for="column in columns">
          <td v-if="column.renderType == 'render'" :key="row[columnKey] + column.key" >
            <treetable-column :index="index" :row="row" :render="column.render" ></treetable-column>
          </td>
          <td v-else :key="row[columnKey] + column.key" :data-key="column.key"  :data-raw="row[column.key]" >{{row[column.key]}}</td>
        </template>
        </tr>
    </template>
    </tbody>
  </table>
</template>
<script>
import x from 'x-lib';
import TreeTableTranslator from '../../core/TreeTableTranslator';
import TreeTableColumn from './treetable-column';

const prefixCls = 'cw-treetable';

const props = {
  columns: {
    type: Array,
    default: []
  },
  rows: {
    type: Array,
    default: undefined
  },
  // 显示方式 collapsed(折叠) | expand(展开)
  display: {
    type: String,
    default: 'expand'
  },
  // 无边框形式
  borderless: {
    type: Boolean,
    default: false
  },
  // 表格名称
  caption: {
    type: String,
    default: undefined
  },
  // 显示复选框选中
  selection: {
    type: Boolean,
    default: false
  },
  // 唯一标识数据列
  columnId: {
    type: Number,
    default: 0
  },
  // 父级对象唯一标识数据列
  columnParentId: {
    type: Number,
    default: 1
  },
  // 树操作数据列
  columnHandle: {
    type: Number,
    default: 2
  }
};

export default {
  name: 'Treetable',
  components: { TreetableColumn: TreeTableColumn },
  props: props,
  data() {
    return {
      selectedRow: null
    };
  },
  mounted() {
    console.log('treetable mounted.');
    TreeTableTranslator.translate({
      target: this.$refs.treetable,
      display: this.display,
      columnId: this.selection ? this.columnId + 1 : this.columnId,
      columnParentId: this.selection ? this.columnParentId + 1 : this.columnParentId,
      columnHandle: this.selection ? this.columnHandle + 1 : this.columnHandle
    });
  },
  updated() {
    console.log('treetable updated.');
    console.log(this.columns);
    TreeTableTranslator.translate({
      target: this.$refs.treetable,
      display: this.display,
      columnId: this.selection ? this.columnId + 1 : this.columnId,
      columnParentId: this.selection ? this.columnParentId + 1 : this.columnParentId,
      columnHandle: this.selection ? this.columnHandle + 1 : this.columnHandle
    });
  },
  computed: {
    columnKey() {
      return this.columns[this.columnId].key;
    },
    columnParentKey() {
      return this.columns[this.columnParentId].key;
    },
    classes() {
      return [
        `${prefixCls}`,
        {
          [`borderless`]: this.borderless
        }
      ];
    }
  },
  methods: {
    handleClick(evt, id) {
      var list = this.$el.querySelectorAll('tbody>tr');
      // 处理界面
      for (let i = 0; i < list.length; i++) {
        let tr = list[i];
        if (list[i].value == id) {
          console.log(tr);
        }
      }

      // 处理数据
      for (let i = 0; i < this.rows.length; i++) {
        if (this.rows[i][this.columnKey] == id) {
          if (this.selectedRow && this.selectedRow[this.columnKey] == id) {
            this.selectedRow = null;
          } else {
            this.selectedRow = this.rows[i];
          }
          break;
        }
      }

      this.$emit('click', this.selectedRow);
    },

    handleChange(evt, id) {
      var list = this.$el.querySelectorAll('.selection');
      var row = null;

      for (let i = 0; i < list.length; i++) {
        list[i].dataset.id = list[i].value;
        list[i].dataset.parentId = list[i].value == '' ? '' : list[i].parentNode.parentNode.querySelectorAll('td')[2].innerHTML;
        if (list[i].value.length > 0) {
          // console.log(list[i].parentNode.parentNode.querySelectorAll('td')[2].innerHTML);
        }
        if (list[i].value == id) {
          row = list[i];
        }
      }

      // console.log('id:' + id + ', checked:' + evt.target.checked);
      this.setChildNodes(list, row, evt.target.checked);

      var results = [];

      for (let i = 0; i < list.length; i++) {
        if (list[i].checked) {
          for (let j = 0; j < this.rows.length; j++) {
            if (list[i].value == this.rows[j][this.columnKey]) {
              results.push(this.rows[j]);
            }
          }
        }
      }

      this.$emit('change', results);
    },
    // 设置子节点的复选框状态
    setChildNodes(list, row, checked) {
      for (var i = 0; i < list.length; i++) {
        if (list[i].dataset.parentId == row.dataset.id && list[i].dataset.id != row.dataset.id) {
          list[i].checked = checked;
          this.setChildNodes(list, list[i], checked);
        }
      }
    }
  }
};
</script>
