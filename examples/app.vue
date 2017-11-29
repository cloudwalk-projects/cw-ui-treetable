<template lang="html">
<div class="example-page">
  <div style="padding:10px;">
    <cw-treetable :columns="tableColumns" :rows="tableRows" selection></cw-treetable>
  </div>
  <!--
  <div style="padding:0 10px 10px 10px;">
    <cw-treetable :columns="tableColumns2" :rows="tableRows" :columnId="0" :columnParentId="1" :columnHandle="2"></cw-treetable>
  </div>

  <table ref="treetable" id="treeTableWrapper" class="table-style table-full-border-style x-ui-tree-table" style="width:100%;">
    <caption>Table 1: 树形列表示例</caption>
    <thead>
      <tr class="table-row-title">
        <th>区域编号</th>
        <th>上级区域</th>
        <th>区域名称</th>
        <th style="width:100px">区域级别</th>
        <th style="width:100px">是否启用</th>
        <th style="width:100px">备注</th>
      </tr>
    </thead>
    <tbody ref="treetableBody" id="test-table-body-1" class="x-ui-tree-table-tbody">
      <tr class="table-row-normal"><td>1</td><td>2</td><td>行1</td><td>1111</td><td>212312</td><td>1234</td></tr>
      <tr class="table-row-normal"><td>10</td><td>9</td><td>行2</td><td>1111</td><td>2234</td><td>1234</td></tr>
      <tr class="table-row-normal"><td>2</td><td></td><td>行3</td><td>12131</td><td>2234</td><td>1234</td></tr>
      <tr class="table-row-normal"><td>3</td><td>1</td><td>行4</td><td>1123</td><td>2234</td><td>1234</td></tr>
      <tr class="table-row-normal"><td>7</td><td></td><td>行5</td><td>1123</td><td>2234</td><td>1234</td></tr>
      <tr class="table-row-normal"><td>8</td><td>4</td><td>行6</td><td>1123</td><td>2234</td><td>1243</td></tr>
      <tr class="table-row-normal"><td>9</td><td>5</td><td>行7</td><td>1123</td><td>2234</td><td>1243</td></tr>
      <tr class="table-row-normal"><td>4</td><td>3</td><td>行8</td><td>1123</td><td>2234</td><td>1234</td></tr>
      <tr class="table-row-normal"><td>12</td><td>4</td><td>行9</td><td>1123</td><td>2234</td><td>1234</td></tr>
      <tr class="table-row-normal"><td>5</td><td>6</td><td>行10</td><td>1123</td><td>2234</td><td>1234</td></tr>
      <tr class="table-row-normal"><td>6</td><td>3</td><td>行11</td><td>1123</td><td>2234</td><td>1234</td></tr>
      <tr class="table-row-normal"><td>11</td><td>7</td><td>行12</td><td>1123</td><td>2234</td><td>1234</td></tr>
    </tbody>
  </table> -->
</div>
</template>

<script>
import TreeTableTranslator from '../src/core/TreeTableTranslator';

export default {
  data() {
    return {
      tableColumns: [
        //{
        //  key: 'selection',
        //  renderType:'selection'
        //},
        {
          key: 'id',
          label: '区域编号'
        },
        {
          key: 'parentId',
          label: '上级区域'
        },
        {
          key: 'name',
          label: '区域名称'
        },
        {
          key: 'level',
          label: '区域级别',
          width: '100px'
        },
        {
          key: 'status',
          label: '是否启用',
          width: '100px'
        },
        {
          key: 'remark',
          label: '备注',
          width: '100px'
        },
        {
          key: 'action',
          label: '操作',
          width: '100px',
          renderType:'render',
          render: function(h, params) {
            return h('div', [h(
              'button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    console.log('view');
                    // this.show(params.index);
                    console.log(params);
                  }
                }
              },
              '查看'
            ),
            h(
                'button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      console.log('delete');
                      // this.remove(params.index);
                      console.log(params);
                    }
                  }
                },
                '删除')]);
          }
        }
      ],
      tableColumns2: [
        {
          key: 'id',
          label: '区域编号'
        },
        {
          key: 'parentId',
          label: '上级区域'
        },
        {
          key: 'name',
          label: '区域名称'
        },
        {
          key: 'level',
          label: '区域级别',
          width: '100px'
        },
        {
          key: 'status',
          label: '是否启用',
          width: '100px'
        },
        {
          key: 'remark',
          label: '备注',
          width: '100px'
        },
        {
          key: 'action',
          label: '操作',
          width: '100px',
          renderType:'render',
          render: function(h, params) {
            return h('div', [h(
              'button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    console.log('view');
                    // this.show(params.index);
                    console.log(params);
                  }
                }
              },
              '查看'
            ),
            h(
                'button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      console.log('delete');
                      // this.remove(params.index);
                      console.log(params);
                    }
                  }
                },
                '删除')]);
          }
        }
      ],
      tableRows: [
        {
          // <tr class="table-row-normal"><td>1</td><td>2</td><td>行1</td><td>1111</td><td>212312</td><td>1234</td></tr>
          id: '100',
          parentId: '',
          name: '行 100',
          status: 1,
          remark: '行 100'
        },
        {
          id: '101',
          parentId: '100',
          name: '行 101',
          status: 0,
          remark: '行 101'
        },
        {
          id: '102',
          parentId: '100',
          name: '行 102',
          status: 1,
          remark: '行 102'
        },
        {
          id: '103',
          parentId: '100',
          name: '行 103',
          status: 1,
          remark: '行 103'
        },
        {
          id: '104',
          parentId: '101',
          name: '行 104',
          status: 1,
          remark: '行 104'
        },
        {
          id: '1',
          parentId: '',
          name: '行 1',
          status: 1,
          remark: '行 1'
        },
        {
          id: '1-1',
          parentId: '1',
          name: '行 1-1',
          status: 1,
          remark: '行 1-1'
        },
        {
          id: '2',
          parentId: '',
          name: '行 2',
          status: 1,
          remark: '行 2'
        },
        {
          id: '2-1',
          parentId: '2',
          name: '行 2-1',
          status: 1,
          remark: '行 2-1'
        }
      ]
    };
  },
  mounted() {
    TreeTableTranslator.translate({ target: this.$refs.treetable, display: 'collapsed' });
  },
  methods: {}
};
</script>
