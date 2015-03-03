Ext.define('ext5.view.chapter6.WindowPicker',{
  extend: 'Ext.window.Window',
  xtype: 'chapter6-windowpicker',
  requires: [
    'ext5.view.chapter6.GridPicker'
  ],
  closeAction: 'hide',
  height: 200,
  width: 300,
  layout: 'fit',
  initComponent: function(){
    var me = this;
    Ext.apply(this, {
      items: {
        xtype: 'chapter6-gridpicker',
        floating: false,                                          // floating를 false로 설정해야 정상적으로 동작함
        border: false,
        listeners: {
          select: function (grid, record){                        
            me.fireEvent('select',grid, record);                  // 이벤트를 전달함
          }
        }
      }
    });

    me.callParent(arguments);
  }
});