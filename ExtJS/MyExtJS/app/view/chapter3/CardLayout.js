Ext.define('ext5.view.chapter3.CardLayout',{
  alias: 'widget.chapter3-cardlayout',
  extend: 'Ext.panel.Panel',
  requires: [
    'ext5.view.chapter3.CardChild1',
    'ext5.view.chapter3.CardChild2',
    'ext5.view.chapter3.CardChild3'
  ],
  title: 'Card Layout',
  width: 350,
  height: 150,
  //layout: 'card',
  layout: {
    type: 'card',
    deferredRender: true                                        // 렌더링 지연처리
  },
  initComponent: function() {
    var me = this;
    Ext.apply(me, 
      {
        bbar: ['->',                                            // 하단 툴바 추가
          {                                                     // 이전버튼 추가
            xtype: 'button',
            text:'이전',
            handler: function(btn) {                            // 클릭시 이벤트 핸들러
              var layout = btn.up('panel').getLayout();         // 버튼의 상위 객체중 'panel'을 찾는 코드 + 해당 판넬의 레이아웃을 가져옴
              if(layout.getPrev()){ 
                layout.prev();
                me.cardInfo();
              }
            }
          },
          {                                                     // 다음버튼 추가 
            xtype: 'button',
            text: '다음',
            handler: function(btn) {                            // 클릭시 이벤트 핸들러
              var layout = btn.up('panel').getLayout();         // 버튼의 상위 객체중 'panel'을 찾는 코드 + 해당 판넬의 레이아웃을 가져옴
              if(layout.getNext()){
                layout.next();
                me.cardInfo(); 
              }
            }
          }
        ],

        items: [
          {
            xtype: 'chapter3-cardchild1'
          },
          {
            xtype: 'chapter3-cardchild2'
          },
          {
            xtype: 'chapter3-cardchild3'
          },
        ],

        listeners: {
          render: {
            fn: this.cardInfo,
            scope: this
          }
        }
      });

    me.callParent(arguments);
  },

  /**
  * Child Object들에 대한 체크를 위한 함수.
  * @domID : 체크할 id
  */
  cardCheck: function(domId){
    var checkValue= Ext.Object.isEmpty( document.getElementById(domId));

    return domId + '는 ' + (checkValue ? '존재하지 않습니다.' : '존재합니다.') + '전체 Dom 크기는 : ' + document.getElementsByTagName("*").length + '입니다.';
  },

  cardInfo: function() {
    var me = this,
      task = new Ext.util.DelayedTask(
          function() {
            console.log(me.cardCheck('card1'));
            console.log(me.cardCheck('card2'));
            console.log(me.cardCheck('card3'));
          }
        );
    task.delay(500); 
  }

});