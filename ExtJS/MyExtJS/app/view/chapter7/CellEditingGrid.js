Ext.define('ext5.view.chapter7.CellEditingGrid',{
  extend: 'Ext.grid.Panel',
  alias: 'widget.chapter7-celleditinggrid',
  requires: [
    'Ext.grid.column.RowNumberer',
    'Ext.grid.column.Template',
    'Ext.grid.column.Boolean',
    'Ext.grid.column.Action',
    'ext5.model.smpl.Order',
    'ext5.view.chapter7.CodeComboBox'
  ],
  height: 200,
  columnLines: true,
  initComponent: function() {
    var me = this;
    Ext.apply(this, {
      // add cellediting plugin
      plugins: [
        {
          ptype: 'cellediting',
          clicksToEdit: 1
        }
      ],
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
        },
        // 날짜형식의 editor plugin 추가
        editor: {
          xtype: 'datefield',
          format: 'Y-m-d',
          allowBlank: false
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
        },
        // 콤보형태의 editor추가
        editor: {
          xtype: 'chapter7-codecombobox',
          preload: true,
          filterCd: 'G002',
          allowBlank: false
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
        },
        // 숫자형태의 editing plugin 추가
        editor: {
          xtype: 'numberfield',
          step: 1000
        }
      },
      {
        text: '회원여부',
        align: 'center',
        width: 100,
        dataIndex: 'isMember',
        xtype: 'booleancolumn',
        trueText: '회원구매',
        falseText: '비회원구매',
        // 콤보형태의 editor추가
        editor: {
          xtype: 'chapter7-codecombobox',
          preload: true,
          filterCd: 'G001',
          allowBlank: false
        }
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
  }
});