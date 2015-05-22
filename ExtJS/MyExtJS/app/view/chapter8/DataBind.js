/**
 * Created by lkwsoul on 15. 5. 22..
 */
Ext.define('ext5.view.chapter8.DataBind', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.chapter8-databind',
  requires: [
    'ext5.view.chapter8.DataBindModel',
    'ext5.view.chapter8.DataBindController'
  ],
  width: 500,
  bodyPadding: 10,
  viewModel: 'chapter8-databind',
  controller: 'chapter8-databind',
  bind: {
    title: '{title}',
    html: '{html}'
  },
  tbar: [{
    bind: '{buttonText}',
    handler: 'onClickButton'
  }],
  items: [{
    padding: '5 5 5 5',
    xtype: 'panel',
    height: 50,
    reference: 'datapanel',
    bind: {
      html: '{name}'
    }
  }]
});