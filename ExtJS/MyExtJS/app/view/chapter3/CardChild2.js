Ext.define('ext5.view.chapter3.CardChild2',{
  extend: 'Ext.container.Container',
  xtype: 'chapter3-cardchild2',
  id: 'card2',                          // 클래스 검색에 사용할 id를 설정한다( 일반적으로 내부에 id를 설정하는 방법은 비권장)
  border: 1,
  html: '두번째 컨테이너(id:card2)',
  listeners: {
    render: function() {
      console.log('card2이 렌더링 되었습니다.');
    }
  }
});