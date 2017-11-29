<template>
   <table ref="treetable" class="table cw-treetable" >
    <caption v-if="caption">{{caption}}</caption>
    <thead>
      <tr>
        <th v-if="selection">
          <input type="checkbox" class="selection" value="" @change="(evt)=>{ handleSelect(evt, '') }" />
        </th>
        <template v-for="column in columns">
        <th v-if="column.renderType == 'selection'" :key="column.key" >
          <input type="checkbox" class="selection" value="" @change="(evt)=>{ handleSelect(evt, '') }" />
        </th>
        <th v-else-if="column.width" :key="column.key" :style="{width:column.width}">{{column.label}}</th>
        <th v-else :key="column.key" >{{column.label}}</th>
        </template>
      </tr>
    </thead>
    <tbody>
    <template>
    </template>
    <template v-for="(row, index) in rows">
      <tr :key="row.id">
        <td v-if="selection" :key="row.id + '-selection'" >
            <input type="checkbox" class="selection" :value="row.id" @change="(evt)=>{ handleSelect(evt, row.id) }" />
        </td>
        <template v-for="column in columns">
          <td v-if="column.renderType == 'selection'" :key="row.id + column.key" >
            <input type="checkbox" class="selection" :value="row.id" @change="(evt)=>{ handleSelect(evt, row.id) }" />
          </td>
          <td v-else-if="column.renderType == 'render'" :key="row.id + column.key" >
            <treetable-column :index="index" :row="row" :render="column.render"></treetable-column>
          </td>
          <td v-else :key="row.id + column.key" >{{row[column.key]}}</td>
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
  // 表格名称
  caption: {
    type: String,
    default: undefined
  },
  selection: {
    type: Boolean,
    default: false
  },
  columnId: {
    type: Number,
    default: 0
  },
  columnParentId: {
    type: Number,
    default: 1
  },
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
    return {};
  },
  mounted() {
    TreeTableTranslator.translate({
      target: this.$refs.treetable,
      display: this.display,
      columnId: this.selection ? this.columnId + 1 : this.columnId,
      columnParentId: this.selection ? this.columnParentId + 1 : this.columnParentId,
      columnHandle: this.selection ? this.columnHandle + 1 : this.columnHandle
    });
  },
  methods: {
    handleSelect(evt, id) {
      var list = this.$el.querySelectorAll('.selection');
      var row = null;

      for (var i = 0; i < list.length; i++) {
        list[i].dataset.id = list[i].value;
        list[i].dataset.parentId = list[i].value == '' ? '' : list[i].parentNode.parentNode.querySelectorAll('td')[2].innerHTML;
        if (list[i].value.length > 0) {
          console.log(list[i].parentNode.parentNode.querySelectorAll('td')[2].innerHTML);
        }
        if (list[i].value == id) {
          row = list[i];
        }
      }

      // console.log('id:' + id + ', checked:' + evt.target.checked);

      this.setChildNodes(list, row, evt.target.checked);
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

<style >
.cw-treetable {
  width: 100%;
  border: 1px solid #ccc;
}
.cw-treetable tr th {
  text-align: left;
}
.cw-treetable tr th,
.cw-treetable tr td
{
  text-align: left;
  line-height: 120%;
}
</style>
