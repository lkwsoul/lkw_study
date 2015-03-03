Ext.define('ext5.view.chapter3.VBoxLayout',{
  alias: 'widget.chapter3-vboxlayout',
  extend: 'Ext.panel.Panel',
  title: 'VBox Layout',
  width: 300,
  height: 300,
  layout: {
    type: 'vbox',
    //align: 'stretchmax',
    padding: 10
  },
  items: [
    {
      xtype: 'panel',
      title: '첫번째 패널',
      html: '너비 150px<br/>높이 70px',
      height: 70,
      width: 150
    },
    {
      xtype: 'panel',
      title: '두번째 패널',
      html: '너비 100px<br/>높이 가변적이다',
      flex: 1,
      width: 100
    },
    {
      xtype: 'panel',
      title: '세번째 패널',
      html: '너비 200px<br/>높이 150px',
      flex: 1,
      height: 100,
      width: 200
    }
  ]
});