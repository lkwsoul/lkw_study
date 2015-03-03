Ext.define('ext5.view.chapter3.ColumnLayout',{
  alias: 'widget.chapter3-columnlayout',
  extend: 'Ext.panel.Panel',
  title: 'Column Layout',
  width: 350,
  height: 250,
  layout: 'column',
  items: [
    {
      title: 'Column1',
      width: 120
    },
    {
      title: 'Column2',
      columnWidth: 0.7    //설정한 너버를 제외한 나머지 70%
    },
    {
      title: 'Column3',
      columnWidth: 0.3    //설정한 너버를 제외한 나머지 30%
    }
  ]
});