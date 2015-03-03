Ext.define('ext5.view.chapter3.AccordionLayout',{
  alias: 'widget.chapter3-accordionlayout',
  extend: 'Ext.panel.Panel',
  requires: [
    'Ext.layout.container.Accordion',
    'ext5.view.chapter3.AccordionChild'          // 커스텀 Panel 추가
  ],
  height: 300,
  width: 300,
  padding: '5 5 5 5',
  layout: 'accordion',
  boder: true,
  items: [
    {
      xtype: 'chapter3-accordionchild',
      title: '애국가1절',
      html: '동해물과 백두산이 마르고 <br/> 닳도록 하느님이 보우하사<br/>우리나라만세<br/>무궁화 삼천리 화려강산<br/>대한사람대한으로 갈이 보전하세'
    },
    {
      xtype: 'chapter3-accordionchild',
      title: '애국가2절',
      html: '애국가2절 내용....'
    },
    {
      xtype: 'chapter3-accordionchild',
      title: '애국가3절',
      html: '애국가3절 내용....'
    },
    {
      xtype: 'chapter3-accordionchild',
      title: '애국가4절',
      html: '애국가4절 내용....'
    }
  ]
});