Ext.define('ext5.view.chapter3.AnchorLayout',{
  alias: 'widget.chapter3-anchorlayout',
  extend: 'Ext.panel.Panel',
  width: 300,
  height: 300,
  title: 'Anchor Layout을 가진 부모패널',
  layout: 'anchor',
  items: [
    {
      xtype: 'panel',
      
      //title: '%로 부모 크기 사용',
      //html: '너비는 부모패널 너비(300px)의 75%를<br/>높이는 부모패널 높이(300px)의 50%를<br/>사용한다.',
      //anchor: '75% 50%'
      
      title: 'offests으로 부모크기를 사용',
      html: '너비는 부모패널 너비(300px) - 50px<br/>높이는 부모패널 높이(300px) - 100px',
      anchor: '-50 -100'
    }
  ]
});