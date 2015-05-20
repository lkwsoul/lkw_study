/**
 * Created by lkwsoul on 15. 5. 20..
 * rowediting plugin
 * - event
 *   beforeedit : 편집모드에 들어갔지만 아직 편집하지 않은 상태
 *   canceledit : 편집모드에서 편집을 취소할 때 발생함
 *   validateedit : 편집결과를 확인하고 문제가 있다면 편집을 취소할 수 있음.
 *                  validate 함수를 이용하거나 특정 조직을 이용해 편집 결과를 결정함
 *   edit : 편집이 완료되면 발생함, 변경된 셀은 붉은색으로 표시됨
 * - arguments
 *   editor : 편비이 발생한 에디터 객체
 *   context : 편집과 관련된 속성 집합
 *     grid : 그리드 객체
 *     record : 편집하기 전 변경되지 않은 데이터 모델 레코드
 *     field : 편집된 필드
 *     value : 편집 결과 변경된 값
 *     row : 편집 대상 그리드 행 HtmlElement
 *     column : 편집 대상 그리드 열
 *     rowIdx : 편집 대상 그디드 열 인덱스
 *     colIndx : 편집 대상 그리드 행 인덱스
 */
Ext.define('ext5.view.chapter7.RowEditingGrid',{
  extend: 'Ext.grid.Panel',
  alias: 'widget.chapter7-roweditinggrid',
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
  initComponent: function () {
    var me = this;
    Ext.apply(this, {
      // add cellediting plugin
      plugins: [
        {
          ptype: 'rowediting',
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

    me.on('beforeedit',function(editor, context){
      me.infoEdit('beforeedit', editor, context);
    });

    me.on('canceledit',function(editor,context){
      me.infoEdit('canceledit', editor, context);
    });

    me.on('edit',function(editor,context){
      me.infoEdit('edit', editor, context);
    });

    me.on('validateedit',function(editor,context){
      var newModel = context.record.copy();
      if(editor.ptype=='rowediting'){
        newModel.set(context.newValues);
      }else{
        newModel.set(context.field, context.value);
      }

      var errors = newModel.getValidation();
      if(!newModel.isValid()){
        console.log('검증 필드 : ', context.field);
        console.log('검증 메시지 : ', errors.get(context.field));
        return false;
      }
      return true;
    });
  },

  //RowEdit처리
  infoEdit: function(event, editor, context, e) {
    var grid = context.grid,
      record = context.record,
      field = context.field,
      value = context.value,
      row = context.row,
      column = context.column,
      rowIdx = context.rowIdx,
      colIdx = context.colIdx;

    console.log(event, ':', record, field, value, rowIdx, colIdx);
  },

  // 컬럼초기화
  getColumnConfig: function () {
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
        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
          if ((rowIndex % 2) == 0) {
            metaData.align = 'left';
            metaData.style = 'color:red';
          } else {
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
        renderer: function (value) {
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
        renderer: function (value, metaData) {
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
        renderer: function (value) {
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
          //xtype: 'chapter7-codecombobox',
          xtype: 'textfield',
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
        tdCls: 'my-action-col-cell',
        items: [
          {
            icon: '/resources/images/Save.png',
            handler: function () {
              alert('update');
            }
          },
          {
            icon: '/resources/images/Schedule.png',
            handler: function () {
              alert('delete');
            }
          }
        ]
      }
    ]
  },

  setMoney: function (value, nation) {
    if (nation == 'Korea')
      nation = '₩';
    else if (nation == 'US')
      nation = '$';
    else if (nation == 'EU')
      nation = '€';
    else if (nation == 'UK')
      nation = '£';
    else if (nation == 'JP')
      nation = '¥';

    return Ext.util.Format.currency(value, nation, 0);
  }
});