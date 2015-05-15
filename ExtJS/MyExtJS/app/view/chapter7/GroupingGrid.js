Ext.define('ext5.view.chapter7.GroupingGrid',{
  extend: 'Ext.grid.Panel',
  alias: 'widget.chapter7-groupinggrid',
  requires: [
    'Ext.grid.column.RowNumberer',
    'Ext.grid.column.Template',
    'Ext.grid.column.Boolean',
    'Ext.grid.column.Action',
    'ext5.model.smpl.Order',
    'Ext.util.TaskManager',
    'ext5.view.chapter7.GroupChangeCombo'
  ],
  height: 400,
  columnLines: true,
  initComponent: function() {
    var me = this;
    Ext.apply(this, {
      features: [
        {
          //ftype: 'grouping'                 // 그룹화 피처를 추가함(단순그룹핑)
          //ftype: 'groupingsummary'          // 그룹화 피처를 추가함(합게정보표시 그룹핑)
          //ftype: 'summary'                  // 그룹화 피처를 추가함(합계정보만표시)
                                              // (본 피처는 groupField:'areaNm"을 주석처리해야 함)
          ftype: 'rowbody',                   // 각행마다 한줄씩 rowbody영역을 추가함
          getAdditionalData:function(data, rowIndex, record, orig){
            var headerCt = this.view.headerCt,
                colspan = headerCt.getColumnCount();
            return {
              rowBody: '주문자 : '+ record.get('customName')+'<br>주문내역 : ' + record.get('orderDesc'),
              rowBodyCls: (rowIndex%2)?"my-body-class" : this.rowBodyCls,
              rowBodyColspan: colspan
            }
          }
        }
      ],
      tbar: [
        {
          xtype: 'chapter7-grpchgcbx',
          labelAlign: 'right',
          labelWidth: 70,
          fieldLabel: '그룹변경',
          listeners: {
            change:function(radio, newValue, oldValue) {
              me.getStore().group(newValue);
              me.getView().refresh();
            }
          }
        }
      ],
      store: {
        model: 'ext5.model.smpl.Order',
        autoLoad: true,
        groupField: 'areaNm'                // 그룹화로 묶을 필드
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
        }
      },
      {
        text: '주문금액',
        //xtype: 'numbercolumn',
        //format: '0,000',
        summaryType: 'sum',           // groupingsummary 종류
                                      // count    : 표시된 행수를 의미한다.
                                      // sum      : 열 데이터를 모두 합한 수를 반환한다.
                                      // min      : 열 데이터 중 가장 작은 숫자를 반환한다.
                                      // max      : 열 데이터 중 가장 큰 숫자를 반환한다.
                                      // average  : 열 데이터의 평균을 반환한다
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
        dataIndex: 'orderCnt',
        summaryType: 'sum',
        summaryRenderer: function(value){     // groupingsummary 표시랜더럴
          return '총 '+value+'개';
        }
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
        summaryType: 'count',
        summaryRenderer: function(value){     // groupingsummary 표시랜더럴
          return '총 '+value+'건';
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
        summaryType: 'average',
        summaryRenderer: function(value){
          return '평균 '+Ext.util.Format.number(value, ',0')+'원'; //천단위표시하기
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
  }
});