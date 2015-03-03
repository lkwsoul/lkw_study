Ext.define('ext5.view.chapter4.CustomTab',{
  extend: 'Ext.Component',
  alias: 'widget.chapter4-customtab',
  onRender: function(){
    this.callParent(arguments);
    Ext.core.DomHelper.append(this.getEl(),
      '<div class="main_dashboard">'+
      '<div class="tab_bg">'+
      '  <ul class="dashboard_tab_menu" id="ulroot">'+
      // Ajax를 이용한 동적 로딩을 위한 주서처리
      //'    <li><a href="http://www.daum.net" class="tab1">탭1번</a></li>'+
      //'    <li><a href="#" class="tab2 on">탭2번</a></li>'+
      //'    <li><a href="#" class="tab3">탭3번</a></li>'+
      //'    <li><a href="#" class="tab4">탭4번</a></li>'+
      '  </ul>'+
      '</div>'+
      '</div>'
    );

    this.setTabMenu();
  },

  initComponent: function() {
    var me = this;
    me.callParent(arguments);
    me.on('afterrender',function(){
      this.el.on('click', function(eventObject, htmlElement){
        eventObject.preventDefault();
        Ext.select('.dashboard_tab_menu li a').removeCls('on');
        Ext.get(htmlElement).addCls('on');

        //탭추가삭제의 의한 tabidx처리
        var idx = Ext.get(htmlElement).getAttribute('tabidx');
        me.fireEvent('tabselect',idx);
      }, this, {
        delegate: 'a'
      });

      /* 컨텍스트 추가 */
      this.el.on('contextmenu',function(eventObject, htmlElement){
        var menu = Ext.create('Ext.menu.Menu', {
          items: [
            {
              xtype: 'menuitem',
              text: '삭제',
              scope: me,
              handler: function(){
                this.destroyTabMenu(htmlElement);
              }
            },
            {
              xtype: 'menuitem',
              text: '이전에 추가',
              scope: me,
              handler: function(){
                this.insertBeforeTabMenu(htmlElement);
              }
            },
            {
              xtype: 'menuitem',
              text: '이후에 추가',
              scope: me,
              handler: function(){
                this.insertAfterTabMenu(htmlElement);
              }
            }
          ]
        });
        eventObject.stopEvent();      //원 Context Menu 처리 이벤트는 중지처리함
        menu.showBy(htmlElement);     //Context Menu 보이게 처리함 
      }, this, {
        delegate: 'a',
        preventDefault : true
      });
    });
    
  },

  setTabMenu: function() {
    var root = this.el.select('.dashboard_tab_menu').first();
    var html = '<li><a href="#" tabidx="{tabIdx}" class="{tabCls}">{tabName}</a></li>';

    var tpl = Ext.DomHelper.createTemplate(html);

    Ext.Ajax.request({
      url: '/resources/data/tablist.json',
      method: 'GET',
      success: function (result, request) {
        var obj = Ext.JSON.decode(result.responseText);
        Ext.each(obj.entitys, function(tabData){
          tpl.append(root,tabData);
        });
      },
      failure: function (result, request) {
        Ext.Msg.alert('Failed',result.responseText);
      }
    });
  },

  destroyTabMenu: function(htmlElement) {
    console.log('destroyTabMenu', htmlElement);
    Ext.get(htmlElement).destroy();               // 삭제처리함
  },

  insertBeforeTabMenu: function(htmlElement) {
    console.log('insertBeforeTabMenu', htmlElement);
    var root = this.el.select('.dashboard_tab_menu').first();
    var insertBefore = Ext.get(htmlElement).up('li');    //htmlElement의 상위 돔요소중 'li' 요소 찾기
    root.createChild('<li><a href="#" tabidx="0" class="">이전추가</a></li>', insertBefore, true);
    //Ext.DomHelper.insertBefore(insertBefore, '<li><a href="#" tabidx="0" class="">이전추가</a></li>');
  },

  insertAfterTabMenu: function(htmlElement) {
    console.log('insertAfterTabMenu', htmlElement);
    var insertAfter = Ext.get(htmlElement).up('li');    //htmlElement의 상위 돔요소중 'li' 요소 찾기
    Ext.DomHelper.insertAfter(insertAfter, '<li><a href="#" tabidx="0" class="">이후추가</a></li>');
  }
});