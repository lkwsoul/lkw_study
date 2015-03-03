Ext.define('ext5.view.chapter3.CardChild3',{
  //extend: 'Ext.panel.Panel',
  extend: 'Ext.grid.Panel',
  xtype: 'chapter3-cardchild3',
  bodyStyle: 'padding: 20px',
  id: 'card3',                          // 클래스 검색에 사용할 id를 설정한다( 일반적으로 내부에 id를 설정하는 방법은 비권장)
  title: '세번째 그리드 패널(id:card3)',
  store: '',
  columns: [
    {
      text: '게시글번호',
      width: 80,
      dataIndex: 'brd_seq',
      field: {
        allowBlank: false
      }
    },
    {
      text: '제목',
      flex: 1,
      dataIndex: 'brd_title',
      field: {
        allowBlank: false
      }
    },
    {
      text: '입력자',
      width: 70,
      dataIndex: 'brd_input_user_nm',
      field: {
        allowBlank: false
      }
    }
  ],

  listeners: {
    render: function() {
      console.log('card3이 렌더링 되었습니다.');
    }
  }
});