<template lang="html">
<div class="example-page">
  <h2>代码示例</h2>
  <div style="padding:10px;">
    <cw-treetable caption="默认的树形表格" :columns="table1.columns" :rows="table1.rows"></cw-treetable>
  </div>

  <div style="padding:0 10px 10px 10px;">
    <cw-treetable caption="带操作按钮的表格" :columns="table2.columns" :rows="table2.rows" ></cw-treetable>
  </div>

  <div style="padding:0 10px 10px 10px;">
    <cw-treetable caption="带复选框的表格" :columns="table3.columns" :rows="table3.rows" selection></cw-treetable>
  </div>

  <div style="padding:0 10px 10px 10px;">
    <cw-treetable caption="无边框的表格" :columns="table3.columns" :rows="table3.rows" selection borderless></cw-treetable>
  </div>

  <div style="padding:0 10px 10px 10px;">
    <button @click="handleClick">异步加载表格</button>
    <cw-treetable caption="动态加载的表格" :columns="table4.columns" :rows="table4.rows" selection @change="handleChange"></cw-treetable>
  </div>
  <h2>API</h2>
    <h5>Treetable props</h5>
    <table class="api-define-table" style="width:100%">
      <thead>
        <tr>
          <td>属性</td>
          <td>说明</td>
          <td>类型</td>
          <td>默认值</td>
        </tr>
      </thead>
      <tbody>
      <tr>
        <td>columns</td>
        <td>表格列数据信息</td>
        <td>object[]</td>
        <td>-</td>
      </tr>
      <tr>
        <td>rows</td>
        <td>表格行数据信息</td>
        <td>object[]</td>
        <td>-</td>
      </tr>
      <tr>
        <td>display</td>
        <td>显示方式<br/>可选的值 collapsed(折叠) | expand(展开)</td>
        <td>string</td>
        <td>expand</td>
      </tr>
      <tr>
        <td>borderless</td>
        <td>无边框形式</td>
        <td>boolean</td>
        <td>false</td>
      </tr>
      <tr>
        <td>caption</td>
        <td>表格名称</td>
        <td>boolean</td>
        <td>-</td>
      </tr>
      <tr>
        <td>selection</td>
        <td>显示复选框</td>
        <td>boolean</td>
        <td>false</td>
      </tr>
      <tr>
        <td>columnId</td>
        <td>唯一标识数据列</td>
        <td>number</td>
        <td>0</td>
      </tr>
      <tr>
        <td>columnParentId</td>
        <td>父级对象唯一标识数据列</td>
        <td>number</td>
        <td>1</td>
      </tr>
      <tr>
        <td>columnHandle</td>
        <td>树操作数据列</td>
        <td>number</td>
        <td>2</td>
      </tr>
      </tbody>
    </table>
    <h5>Treetable events</h5>
    <table class="api-define-table" style="width:100%">
      <thead>
        <tr>
          <td>事件名</td>
          <td>说明</td>
          <td>返回值</td>
        </tr>
      </thead>
      <tbody>
      <tr>
        <td>click</td>
        <td>表格行单击时触发, 在次单击同一行选中失效</td>
        <td>返回选中的行信息</td>
      </tr>
      <tr>
        <td>change</td>
        <td>表格复选框选择时触发</td>
        <td>复选框选中的行信息数组</td>
      </tr>
      </tbody>
    </table>
</div>
</template>

<script>
import TreeTableTranslator from '../src/core/TreeTableTranslator';

const dataRows = [
  {
    id: '100',
    parentId: '',
    code: '100',
    name: '行 100',
    status: 1,
    remark: '行 100'
  },
  {
    id: '101',
    parentId: '100',
    code: '100',
    name: '行 101',
    status: 0,
    remark: '行 101'
  },
  {
    id: '102',
    parentId: '100',
    code: '100',
    name: '行 102',
    status: 1,
    remark: '行 102'
  },
  {
    id: '103',
    parentId: '100',
    code: '100',
    name: '行 103',
    status: 1,
    remark: '行 103'
  },
  {
    id: '104',
    parentId: '101',
    code: '10000004',
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
    code: '10000004',
    name: '行 1-1',
    status: 1,
    remark: '行 1-1'
  },
  {
    id: '2',
    parentId: '',
    code: '10000002',
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
];

// #region table1 数据
const table1 = {
  columns: [
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
      label: '名称'
    },
    {
      key: 'code',
      label: '代码',
      width: '100px'
    },
    {
      key: 'status',
      label: '状态',
      width: '100px'
    },
    {
      key: 'remark',
      label: '备注',
      width: '100px'
    }
  ],
  rows: dataRows
};
// #endregion

const table2 = {
  columns: [
    {
      key: 'id',
      label: '唯一标识'
    },
    {
      key: 'parentId',
      label: '父级对象标识'
    },
    {
      key: 'name',
      label: '名称'
    },
    {
      key: 'code',
      label: '代码',
      width: '100px'
    },
    {
      key: 'status',
      label: '状态',
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
      width: '103px',
      renderType: 'render',
      render: function(h, params) {
        return h('div', [
          h(
            'button',
            {
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
            '删除'
          )
        ]);
      }
    }
  ],
  rows: dataRows
};

const table3 = {
  columns: [
    {
      key: 'code',
      label: '编号'
    },
    {
      key: 'parentCode',
      label: '上级编号'
    },
    {
      key: 'name',
      label: '名称'
    },
    {
      key: 'status',
      label: '状态',
      width: '100px'
    },
    {
      key: 'action',
      label: '操作',
      width: '65px',
      renderType: 'render',
      render: function(h, params) {
        return h('div', [
          h(
            'a',
            {
              attrs: {
                href: 'javascript:void(0);'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  console.log('view');
                  console.log(params);
                }
              }
            },
            '查看'
          ),
          h(
            'a',
            {
              attrs: { href: 'javascript:void(0);' },
              on: {
                click: () => {
                  console.log('delete');
                  console.log(params);
                }
              }
            },
            '删除'
          )
        ]);
      }
    }
  ],
  rows: [
    {
      code: '100',
      parentCode: '',
      name: '行 100',
      status: 1,
      remark: '行 100'
    },
    {
      code: '101',
      parentCode: '100',
      name: '行 101',
      status: 0,
      remark: '行 101'
    },
    {
      code: '102',
      parentCode: '100',
      name: '行 102',
      status: 1,
      remark: '行 102'
    },
    {
      code: '103',
      parentCode: '100',
      name: '行 103',
      status: 1,
      remark: '行 103'
    },
    {
      code: '104',
      parentCode: '101',
      name: '行 104',
      status: 1,
      remark: '行 104'
    },
    {
      code: '1',
      parentCode: '',
      name: '行 1',
      status: 1,
      remark: '行 1'
    },
    {
      code: '1-1',
      parentCode: '1',
      name: '行 1-1',
      status: 1,
      remark: '行 1-1'
    },
    {
      code: '2',
      parentCode: '',
      name: '行 2',
      status: 1,
      remark: '行 2'
    },
    {
      code: '2-1',
      parentCode: '2',
      name: '行 2-1',
      status: 1,
      remark: '行 2-1'
    }
  ]
};

const table4 = {
  columns: [
    {
      key: 'id',
      label: '编号'
    },
    {
      key: 'parentId',
      label: '上级编号'
    },
    {
      key: 'name',
      label: '名称'
    },
    {
      key: 'code',
      label: '代码',
      width: '100px'
    },
    {
      key: 'status',
      label: '状态',
      width: '100px'
    },
    {
      key: 'action',
      label: '操作',
      width: '65px',
      renderType: 'render',
      render: function(h, params) {
        return h('div', [
          h(
            'a',
            {
              attrs: {
                href: 'javascript:void(0);'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  console.log('view');
                  console.log(params);
                }
              }
            },
            '查看'
          ),
          h(
            'a',
            {
              attrs: { href: 'javascript:void(0);' },
              on: {
                click: () => {
                  console.log('delete');
                  console.log(params);
                }
              }
            },
            '删除'
          )
        ]);
      }
    }
  ],
  rows: []
};

export default {
  data() {
    return {
      handleClickCount: 0,
      table1,
      table2,
      table3,
      table4
    };
  },
  mounted() {},
  methods: {
    handleClick() {
      switch (this.handleClickCount % 3) {
        case 0:
          this.table4.columns = this.table1.columns;
          this.table4.rows = this.table1.rows;
          console.log('load table1');
          break;
        case 1:
          this.table4.columns = this.table2.columns;
          this.table4.rows = this.table2.rows;
          console.log('load table2');
          break;
        default:
          this.table4.columns = this.table3.columns;
          this.table4.rows = this.table3.rows;
          console.log('load table3');
          break;
      }
      console.log(this.table4);
      this.handleClickCount++;
    },
    handleChange(list) {
      console.log(list);
    }
  }
};
</script>
