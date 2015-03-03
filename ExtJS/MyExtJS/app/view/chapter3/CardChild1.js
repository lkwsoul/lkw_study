Ext.define('ext5.view.chapter3.CardChild1',{
  extend: 'Ext.panel.Panel',
  xtype: 'chapter3-cardchild1',
  id: 'card1',                          // 클래스 검색에 사용할 id를 설정한다( 일반적으로 내부에 id를 설정하는 방법은 비권장)
  bodyPadding: 5,
  width: 300,
  title: '첫번째 패널(id:card1)',
  items: [
    {
      xtype: 'datefield',
      fieldLabel: 'Start date',
    },
    {
      xtype: 'datefield',
      fieldLabel: 'End date'
    }
  ],
  listeners: {
    render: function() {
      console.log('card1이 렌더링 되었습니다.');
    }
  }
});