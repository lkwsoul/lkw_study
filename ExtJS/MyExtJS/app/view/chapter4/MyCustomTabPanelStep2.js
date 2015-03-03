/**
* 본 방식은 톰트리의 크기를 늘리는 단점이 있으므로, 주의해서 사용해아 함
* 일반적으로, 동적으로 제어해야 하는 부분을 제외하고는 돔 요소를 직접 코드로 추가하는 방법이 좋음
*/
Ext.define('ext5.view.chapter4.MyCustomTabPanelStep2',{
  extend: 'Ext.container.Container',
  cls: 'custom-tab',
  xtype: 'capter4-customstep2',
  initComponent: function() {
    var me = this;
    Ext.apply(this,{
      cls: 'main_dashboard',
      autoEl: 'div',
      items: [
        {
          xtype: 'container',
          //autoEl: 'div',      //미지정시 기본값은 div임.
          cls: 'tab_bg',
          items: [
            {
              xtype: 'container',
              autoEl: 'ul',
              cls: 'dashboard_tab_menu',
              items: [
                {
                  xtype: 'container',
                  autoEl: 'li',
                  html: '<a href="#" class="tab1">탭1번</a>'
                },
                {
                  xtype: 'container',
                  autoEl: 'li',
                  html: '<a href="#" class="tab2 on">탭2번</a>'
                },
                {
                  xtype: 'container',
                  autoEl: 'li',
                  html: '<a href="#" class="tab3">탭3번</a>'
                },
                {
                  xtype: 'container',
                  autoEl: 'li',
                  html: '<a href="#" class="tab4">탭4번</a>'
                }
              ]
            }
          ]
        }
      ]
    });

    me.callParent(arguments);
  },
});