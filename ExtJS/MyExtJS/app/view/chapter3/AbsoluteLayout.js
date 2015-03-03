Ext.define('ext5.view.chapter3.AbsoluteLayout',{
  alias: 'widget.chapter3-absolutelayout',
  extend: 'Ext.panel.Panel',
  height: 300,
  width: 300,
  padding: '5 5 5 5',
  layout: 'absolute',
  autoscroll: true,
  border: true,
  items: [
    {
      title: '패널1',
      x: 20,
      y: 30,
      height: 150,
      width: 150,
      html: 'x:20, y:30',
      frame: true
    },
    {
      title: '패널2',
      x: 100,
      y: 100,
      anchor: '80% 80%',         // anchor : 부모의 크기에 비례하게 자식의 크기를 설정할때 사용함
      html: 'x:100, y:100',
      frame: true
    }
  ]
});