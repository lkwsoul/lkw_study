Ext.define('ext5.view.chapter3.AccordionChild',{
  extend: 'Ext.panel.Panel',
  xtype: 'chapter3-accordionchild',
  initComponent: function() {                       // 컴포넌트 재정의
    this.callParent(arguments);                     // 상위클래스 실행
    this.on('expand', function(expendPanel){        // expand이벤트 핸들러 처리
      console.log('열린 패널은 :',this.title);
    });
  }
});