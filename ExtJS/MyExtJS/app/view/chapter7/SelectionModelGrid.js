Ext.define('ext5.view.chapter7.SelectionModelGrid',{
  extend: 'Ext.grid.Panel',
  alias: 'widget.chapter7-selectionmodelgrid',
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
      // Cell탐색을 위해 selType을  cellmodel로 지정함
      selType: 'cellmodel',
      tbar: [
        {
          xtype: 'button',
          text: '선택된 로우 정보',
          scope: me,
          handler: this.selectRowInfo
        },
        '-',                                   // 구분자
        {
          xtype: 'button',
          text: 'Cell탐색',
          scope: me,
          handler: this.selectCellTour
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

  // 선택된 로우 정보버튼 클릭처리 Function(행정보를 console log로 출력함)
  selectRowInfo: function() {
    var selectionModel = this.getSelectionModel(), record;
    if(selectionModel.getSelection().length==0){            // 선택된 행이 없다면 첫번째 행을 선택하도록 함
      selectionModel.select(0);
    }

    record = selectionModel.getSelection()[0];
    console.log(record.data);
  },
  
  //Cell탐색 버튼 클릭처리 Function(전체셀을 순차적으로 선택 되도록 함)
  selectCellTour: function() {
    // 사용할 변수 선언부
    var me = this,
        selectionModel = me.getSelectionModel(),    // 셀렉션 모델 구하기
        columnCount = me.columns.length,            // 컬럼의 갯수 구하기
        rowCount = me.getStore().getCount(),        // 행갯수 구하기
        colinfo = []                                // 셀정보를 담기 위한 행렬변수
        ;

    for(var i=0;i<rowCount;i++){
      for(var z=0;z<columnCount;z++){
        colinfo.push({
          row : i,
          col : z
        })
      }
    }

    var i = 0;

    var task = {
      run : function(){
        if(colinfo.length<=(i+1)) {
          Ext.TaskManager.stop(task);
        }
        selectionModel.setCurrentPosition({
          row : colinfo[i].row,
          column : colinfo[i].col
        });
        i++;
      },
      interval:200                                 // 1/1000 초 단위로 설정하므로 0.2로 interval설정하여 셀이 선택되도록 함
    };

    Ext.TaskManager.start(task);
  }

});