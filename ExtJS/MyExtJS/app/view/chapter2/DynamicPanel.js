Ext.define('ext5.view.chapter2.DynamicPanel',{
  extend: 'Ext.panel.Panel',
  requires: ['ext5.view.chapter2.RequireClass'],
  xtype: 'chapter2-dynamicloading',
  title: 'DynamicPanel',
  otherContent:[{
    type: '동적 로딩클라스',
    path: 'app/view/chapter2/RequireClass.js'
  }],
  items:[{
    xtype: 'chapter2-requireclass'
  }]
});