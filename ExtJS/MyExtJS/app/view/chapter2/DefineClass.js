Ext.define('ext5.view.chapter2.DefineClass',{                  // 클라스명정의 (자바와 다르게 언더바 사용 권장하지 않음)
  extend: 'Ext.panel.Panel',                                   // 확장 클라스 정의(부모클라스)
  alias: 'widget.chapter2-defineclass',                        // 함축적인 클래스명 (widget은 Prefix로 사용되며, xtype:chapter2-defineclass 로 사용)
  initComponent: function(){                                   // 부모클라스 구성요소를 초기화하여 재정의 할때 사용함.
    var me = this;
    Ext.apply(me,{                                             // 추가처리. - 첫번째 인자는 대상 오프젝트,
      title: '안녕하세요 환영합니다.',                          //           - 두번째 인자는 추가 처리하는 아이템 
      items: [                                                 // items는 Container클래스에 자식을 추가하는 구성요소로 api중 Ext.container.Container
        {                                                      // 크래스를 확장한 클래스만 존재함.
          xtype: 'button',
          text: 'Click Me!'
        }
      ]
    });

    me.callParent(arguments);                                  // 재정의시 반드시 정의해야함(부모기능을 호출하여 사용함)

    me.on('render',function(component){                        // on구문은 이벤트 리스너를 정의하는 함축적인 사용법
      console.log('클라스가 블라우저에 렌더링 될때 실행되요');
    });
  }
});