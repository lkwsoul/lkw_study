Ext.define('ext5.view.chapter3.HBoxLayout',{
  alias: 'widget.chapter3-hboxlayout',
  extend: 'Ext.panel.Panel',
  title: 'Hbox Layout',
  height: 300,
  layout: {
    type: 'hbox',
    //align: 'stretchmax',   // 자식 컴포넌트중 가장 큰크기로 맞춰짐
    //align: 'stretch',        // 부모 컨테이너 높이와 같아짐
    padding: 10
  },
  items: [
    {
      xtype: 'panel',
      title: '첫번째 패널',
      html: '너비 100px<br/>높이 200px',
      width: 100,
      height: 200
    },
    {
      xtype: 'panel',
      title: '두번째 패널',
      html: '너비 가번적이다<br/>높이 100px',
      flex: 1,
      height: 100
    },
    {
      xtype: 'panel',
      title: '세번째 패널',
      html: '너비 100px<br/>높이150px',
      width: 100,
      height: 150
    }
  ]
});