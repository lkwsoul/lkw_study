Ext.define('ext5.view.chapter7.SortGrid',{
  extend: 'Ext.grid.Panel',
  alias: 'widget.chapter7-sortgrid',
  requires: [
    'Ext.grid.column.RowNumberer',
    'Ext.grid.column.Template',
    'Ext.grid.column.Boolean',
    'Ext.grid.column.Action',
    'ext5.model.smpl.Order',
    'Ext.util.TaskManager'
  ],
  height: 200,
  columnLines: true,
  initComponent: function() {
    var me = this;
    Ext.apply(this, {
      multiColumnSort: true,                                // 다중정렬이 되도록 함
      store: {
        model: 'ext5.model.smpl.Order',
        //remoteSort: true,
        autoLoad: true,
        sorters:[
          'custoName',                                      // 주문자명(custoName)으로 정렬을 추가함, 필드명만 추가시 기본적으로 ASC로 정렬됨
          {property:'orderAmount', direction:'DESC'}        // 주문액으로 내림차순 정렬함
        ]
      },
      columns: this.getColumnConfig(),
      tbar:[
        {
          xtype: 'button',
          itemId: 'amountBtn',
          text: '주문액정령[DESC]',
          scope: me,
          handler: this.changeSort
        }
      ]
    }
    );

    me.callParent(arguments);
  },

  getColumnConfig: function() {
    var me = this;
    return [
      {
        xtype: 'rownumberer'
      },
      {
        text: '주문지역',
        align: 'center',
        width: 100,
        dataIndex: 'areaNm'
      },
      {
        text: '주문자',
        align: 'center',
        width: 70,
        dataIndex: 'customName',
        renderer: function (value) {
          return value + '남';
        }
      },
      {
        text: '주문일자',
        align: 'center',
        //xtype: 'datecolumn',
        //format: 'Y.m.d',
        width: 100,
        dataIndex: 'orderDate',
        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
          if( (rowIndex%2)==0 ) {
            metaData.align = 'left';
            metaData.style = 'color:red';
          }else{
            metaData.align = 'right';
            metaData.style = 'color:blue';
          }
          return Ext.util.Format.date(value, 'Y-m-d');
        }
      },
      {
        text: '주문금액',
        //xtype: 'numbercolumn',
        //format: '0,000',
        style: 'text-align:center',
        align: 'right',
        width: 100,
        dataIndex: 'orderAmount',
        renderer: function(value) {
          return this.setMoney(value, 'Korea');
        }
      },
      {
        text: '주문수량',
        style: 'text-align:center',
        align: 'right',
        width: 60,
        dataIndex: 'orderCnt'
      },
      {
        text: '주문내역',
        style: 'text-align:center',
        width: 200,
        flex: 1,
        dataIndex: 'orderDesc',
        xtype: 'templatecolumn',
        tpl: [
          '{orderDesc} >><br><tpl for="orderDetail">',
          '상품번호: {detailNo} 상품명:{detailDesc}<br>',
          '</tpl>'
        ]
      },
      {
        text: '고객평가',
        align: 'center',
        width: 70,
        dataIndex: 'estimate',
        renderer: function(value, metaData) {
          metaData.tdCls = 'thumb-' + value;
          return '';
        }
      },
      {
        text: '누적금액',
        style: 'text-align:center',
        align: 'right',
        flex: 1,
        name: 'accrueAmount',
        dataIndex: 'accrueAmount',
        renderer: function(value) {
          return this.setMoney(value, 'Korea');
        }
      },
      {
        text: '회원여부',
        align: 'center',
        width: 100,
        dataIndex: 'isMember',
        xtype: 'booleancolumn',
        trueText: '회원구매',
        falseText: '비회원구매'
      },
      {
        xtype: 'actioncolumn',
        text: '주문변경',
        align: 'center',
        width: 100,
        tdCls : 'my-action-col-cell',
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
    ]
  },

  setMoney: function(value, nation) {
    if(nation=='Korea')
      nation = '₩';
    else if(nation=='US')
      nation = '$';
    else if(nation=='EU')
      nation = '€';
    else if(nation=='UK')
      nation = '£';
    else if(nation=='JP')
      nation = '¥';

    return Ext.util.Format.currency(value, nation, 0);
  },

  changeSort: function() {
    var me = this;
    me.getStore().getSorters().each(function(sort){
      sort = sort.config;
      if(sort.property=='orderAmount'){
        var direction = (sort.direction=='ASC')?'DESC':'ASC';
        me.down('button[itemId=amountBtn]').setText('주문액정렬['+direction+']');
        me.getStore().sort([
          {property:'orderAmount',direction:direction}
          ]);
      }
    });
  }
});