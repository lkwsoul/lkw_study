Ext.define('ext5.view.chapter4.MyCustomTabPanelStep1',{
  extend: 'Ext.Component',
  cls: 'custom-tab',                              // 별도 스타일을 사용하도록 함
  xtype: 'chapter4-customstep1',
  initComponent: function() {
    var me = this;
    Ext.apply(this,{
      html: this.setTabTpl()
    });

    me.callParent(arguments);
  },

  setTabTpl: function() {
    return new Ext.XTemplate(
      '<div class="main_dashboard">',
      '<div class="tab_bg">',
      '  <ul class="dashboard_tab_menu">',
      '    <li><a href="#" class="tab1">탭1번</a></li>',
      '    <li><a href="#" class="tab2 on">탭2번</a></li>',
      '    <li><a href="#" class="tab3">탭3번</a></li>',
      '    <li><a href="#" class="tab4">탭4번</a></li>',
      '  </ul>',
      '</div>',
      '</div>'
      );
  }
});