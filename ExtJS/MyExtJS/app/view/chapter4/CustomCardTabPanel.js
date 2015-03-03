Ext.define('ext5.view.chapter4.CustomCardTabPanel',{
  extend: 'Ext.container.Container',
  cls : 'custom-tab',
  requires: [
    'Ext.layout.container.Border',
    'Ext.layout.container.Card',
    'Ext.button.Button',
    'Ext.grid.Panel',
    'ext5.view.chapter4.CustomTab'
  ],
  layout: 'border',
  height: 400,
  xtype: 'chapter4-customcardtabpanel',
  items: [
    {
      region: 'north',
      xtype: 'chapter4-customtab',
      listeners: {
        tabselect: function(idx){
          console.log('몇번째 탭을 선택했나요?',idx);
          var card = this.up('container').down('container[region=center]').getLayout();   //card레이아웃을 가진 컨테이너를 찾아 getLayout함수를 이용해 레이아웃 정보를 가져옴.
          card.setActiveItem(parseInt(idx)-1);  //activeItem변경함
        }
      }
    },
    {
      region: 'center',
      xtype: 'container',
      layout:{
        type:"card",
        deferredRender: true
      },
      items:[
        {
          xtype: 'button',
          text: '1번 패널'
        },
        {
          xtype: 'grid',
          columns: [
            {
              text: 'name',
              dataIndex: 'name',
            }
          ],
          title: '2번 패널'
        },
        {
          xtype: 'panel',
          title: '3번 패널'
        },
        {
          xtype: 'panel',
          title: '4번 패널'
        }
      ],
      stype: {
        borderColor: '#000000',
        borderStyle: 'solid',
        borderWidth: '1px'
      }
    }
  ]
});