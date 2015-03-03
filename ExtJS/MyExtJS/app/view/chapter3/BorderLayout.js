Ext.define('ext5.view.chapter3.BorderLayout',{
  alias: 'widget.chapter3-borderlayout',
  extend: 'Ext.container.Container',
  width: 400,
  height: 400,
  layout: 'border',
  items: [
    {
      xtype: 'panel',
      region: 'north',
      title: 'North',
      margins: 5,
      height: 100,
    },
    {
      region: 'west',
      title: 'West',
      margins: '0 5 0 5',
      width: 100,
      collapsible: true,      // 해당영역을 접을 수 있는 버튼이 타이틀 영역 오른쪽에 배치됨.
      split: true,            // 크기조절이 가능하도록 함(삼각형 아이콘도 표시됨)
      titleCollapse: true     // 해당객체의 너비가 좁아 타티이틀이 잘릴때, "..."으로 표시함
    },
    {
      region: 'center',
      title: 'Center'
    },
    {
      region: 'east',
      title:'East',
      margins: '0 5 0 5',
      flex: .5,
      collapsible: true,    // 해당영역을 접을 수 있는 버튼이 타이틀 영역 오른쪽에 배치됨.
      collapsed: true       // collapsible true일때 지정가능하며, true로 하면 접힌상태로 보인다
    },
    {
      region: 'south',
      title: 'South',
      margins: '0 5 5 5',
      flex: .3,
      split: true
    }
  ]
});