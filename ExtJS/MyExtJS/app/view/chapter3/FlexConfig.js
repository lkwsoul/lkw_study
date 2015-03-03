Ext.define('ext5.view.chapter3.FlexConfig',{
  alias: 'widget.chapter3-flexconfig',
  extend: 'Ext.container.Container',
  width: 400,
  layout: {
    type: 'hbox',
    align: 'strechmax',
  },
  items:[
    {
      xtype: 'panel',
      title: 'Panel One',
      height: 100,
      flex: 0.5                 // 실제너비 = 전체부모의 너비(400) / flex전체함(2.2) = 182 * 자기flex값(0.5) = 91
    },
    {
      xtype: 'panel',
      title: 'Panel Two',
      height: 100,
      flex: 1                   // 실제너비 = 전체부모의 너비(400) / flex전체함(2.2) = 182 * 자기flex값(1) = 182
    },
    {
      xtype: 'panel',
      title: 'Panel Three',
      height: 100,
      flex: 0.7                 // 실제너비 = 전체부모의 너비(400) / flex전체함(2.2) = 182 * 자기flex값(0.7) = 127
    }
  ]
});