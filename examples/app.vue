<template lang="html">
<div class="example-page">
  <div style="padding:10px;">
    <cw-treetable caption="带选择框的表格" :columns="tableColumns" :rows="tableRows" selection></cw-treetable>
  </div>

  <div style="padding:0 10px 10px 10px;">
    <cw-treetable caption="默认的树形表格" :columns="tableColumns2" :rows="tableRows" selection></cw-treetable>
  </div>

  <div style="padding:0 10px 10px 10px;">
    <cw-treetable :columns="table3.columns" :rows="table3.rows" :columnId="0" :columnParentId="1" :columnHandle="2"></cw-treetable>
  </div>
</div>
</template>

<script>
import TreeTableTranslator from '../src/core/TreeTableTranslator';

const table3 = {
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
      renderType: 'render',
      render: function(h, params) {
        return h('div', [
          h(
            'a',
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
            'a',
            {
              attrs: {
                href: 'http://www.baidu.com',
                target: '_blank'
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
  rows: [
    {
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

export default {
  data() {
    return {
      table3,
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
