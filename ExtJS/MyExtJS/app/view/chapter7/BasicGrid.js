Ext.define('ext5.view.chapter7.BasicGrid',{
  extend: 'Ext.grid.Panel',
  alias: 'widget.chapter7-basicgrid',
  requires: [
    'ext5.model.smpl.Order'
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
    me.callParent(arguments);
  },

  getColumnConfig: function() {
    var me = this;
    return [
      {
        text: '주문자',
        align: 'center',
        width: 70,
        dataIndex: 'customName'
      },
      {
        text: '주문일자',
        align: 'center',
        width: 80,
        dataIndex: 'orderDate'
      },
      {
        text: '주문금액',
        style: 'text-align:center',       //  text-align는 해더 택스트 정렬을 지정함
        align: 'right',
        width: 60,
        dataIndex: 'orderCnt'
      },
      {
        text: '주문내역',
        style: 'text-align:center',
        width: 200,
        flex: 1,
        dataIndex: 'orderDesc'
      },
      {
        text: '누적금액',
        style: 'text-align:center',
        align: 'right',
        width: 150,
        dataIndex: 'accrueAmount'
      },
      {
        text: '회원여부',
        align: 'center',
        width: 70,
        dataIndex: 'isMember'
      }
    ];
  }
});