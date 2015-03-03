Ext.define('ext5.view.chapter6.CustomPickerField',{
  extend: 'Ext.form.field.Picker',                                        // Picker 클라스 상속
  alias: 'widget.chapter6-custompicker',                                  // 윗젯명 설정
  requires:[                                                                  // 선택적 UI를 구현하기 위한 import
    'ext5.view.chapter6.GridPicker',
    'ext5.view.chapter6.WindowPicker'
  ],
  triggerCls: 'x-form-search-trigger',                                    // 피커 클래스는 트리거(Ext.form.field.Trigger) 클래스를 상속받으므로
                                                                          // 트리커 버튼에 들어가는 CSS클래스를 지정할 수 있다.
                                                                          // 여기서는 돋보기 모양의 아이콘 클래스를 지정함.
                                                                          // 또한 다음과 같이 몇 가지 모양의 아이콘 클래스가 준비돼 있다.
                                                                          // x-form-clear-trigger : x자모양의 아이콘
                                                                          // x-form-trigger : 콤보 박스에서 사용하는 선택용 아이콘
                                                                          // x-form-date-trigger : 날짜 선택용 아이콘
  createPicker: function(C) {                                              // 피커 클래스는 반드시 createPicker 메서더를 구현 해야 함.
    var me = this;                                                        // 전역변수 설정
    if(!me.picker) {                                                      // 피커변수 존재여부 확인 함
      /*
      // Window 이용하는 방법
      me.picker = Ext.create('Ext.window.Window',{                        // Ext.window.Window 클래스를 생성함과 동시에 피커변수에 전달함.
        title: 'Hello',
        closeAction: 'hide',
        height: 200,
        width: 150,
        layout: 'fit',
        items: {
          xtype: 'grid',                                                  // 그리드 추가
          border: false,
          columns: [{header: 'World', dataIndex:'field1', flex:1}],
          store: Ext.create('Ext.data.ArrayStore',{
            fields: ['field1'],
            data: [['안녕하세요']]
          }),
          listeners: {
            select: function(grid, record){                               // 피커클래스는 select 이벤트를 기본 제공함. 
                                                                          // 피커클래스는 팝업을 띄우고 내부 데이터를 선택하게 고안되었으며,
                                                                          // select 이벤트를 통해 선택된 값은 setValue 메서드를
                                                                          // 이용해 텍스트 필드에 해당 값을 설정하게 함
              me.setValue(record.get('field1'));
              me.collapse();                                              // 피커를 접어 보이지 않게 함.
            }
          }
        }
      });
      */
      /*
      // Grid Panel이용하는 방법
      me.picker = Ext.create('Ext.grid.Panel',{                           // Grid Panel이용하여 생성함 
        floating: true,                                                   // Ext.window.Window 아니면, floating 속성을 true로 설정해야 함
        title: 'Hello:',
        height: 200,
        width: 150,
        border: false,
        columns: [
          {header:'World', dataIndex:'field1', flex:1}
        ],
        store: Ext.create('Ext.data.Store',{
          fields: ['field1'],
          data: [
            {field1:'안녕하세요'}
          ]
        }),
        listeners: {
            select: function(grid, record){                               // 피커클래스는 select 이벤트를 기본 제공함. 
                                                                          // 피커클래스는 팝업을 띄우고 내부 데이터를 선택하게 고안되었으며,
                                                                          // select 이벤트를 통해 선택된 값은 setValue 메서드를
                                                                          // 이용해 텍스트 필드에 해당 값을 설정하게 함
              me.setValue(record.get('field1'));
              me.collapse();                                              // 피커를 접어 보이지 않게 함.
            }
        }
      });
      */

      // 선택적 UI사용
      me.picker = Ext.widget(me.pickerAlias);                             // 위젯명을 이용해서 인스턱스를 생성함
                                                                          // 즉, 고정되지 않고 외부에서 제공해주는 pickerAlias를 이용해 생성함
      me.picker.on('select',function(p, record){
        me.setValue(record.get('company')||record.get('text'))
        me.collapse();
      });
    }
    return me.picker;                                                     // 피커변수를 반환함.
  }
});