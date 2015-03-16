Ext.define('ext5.view.chapter7.ColumnsGrid',{
  extend: 'Ext.grid.Panel',
  alias: 'widget.chapter7-columnsgrid',
  requires: [
    'ext5.model.smpl.Order',
    'Ext.grid.column.RowNumberer',
    'Ext.grid.column.Date',
    'Ext.grid.column.Number',
    'Ext.grid.column.Template',
    'Ext.grid.column.Boolean',
    'Ext.grid.column.Action'
  ],
  height: 200,
  columnLines: true,
  initComponent: function() {
    var me = this;
    Ext.apply(this,{
      store: {
        model: 'ext5.model.smpl.Order',
        autoLoad: true
      },
      columns: this.getColumnConfig()
    });
    this.callParent(arguments);
  },

  getColumnConfig: function() {
    var me = this;
    return [
      {
        xtype: 'rownumberer'
      },
      {
        text: '주문자',
        align: 'center',
        width: 70,
        dataIndex: 'customName'
      },
      {
        text: '주문일자',
        align: 'center',
        xtype: 'datecolumn',
        format: 'Y.m.d',
        width: 80,
        dataIndex: 'orderDate'
      },
      {
        text: '주문금액',
        xtype: 'numbercolumn',
        format: '0,000',
        style: 'text-align:center',
        align: 'right',
        width: 100,
        dataIndex: 'orderAmount'
      },
      {
        text: '주문내역',
        style: 'text-align:center',
        width: 200,
        flex: 1,
        //dataIndex: 'orderDesc'
        xtype: 'templatecolumn',
        tpl: [
          '{orderDesc} >><br><tpl for="orderDetail">',
          '상품번호:{detailNo} 상품명:{detailDesc}<br>',
          '</tpl>'
        ]
      },
      {
        text: '누적금액',
        style: 'text-align:center',
        align: 'right',
        width: 100,
        dataIndex: 'accrueAmount'
      },
      {
        text: '회원여부',
        align: 'center',
        width: 70,
        dataIndex: 'isMember',
        //xtype: 'checkcolumn'
        xtype: 'booleancolumn',
        trueText: '회원구매',
        falseText: '비회원구매'
      },
      {
        text: '주문변경',
        xtype: 'actioncolumn',
        align: 'center',
        width: 100,
        tdCls: 'my-action-col-cell',
        items: [
          {
            icon: '/resources/images/Save.png',
            handler: function() {
              alert('update');
            }
          },
          {
            icon: '/resources/images/Schedule.png',
            handler: function() {
              alert('delete');
            }
          }
        ]
      }
    ];
  }
});