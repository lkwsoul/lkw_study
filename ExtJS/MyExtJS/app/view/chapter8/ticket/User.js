/**
 * Created by lkwsoul on 15. 6. 16..
 */
Ext.define('ext5.view.chapter8.ticket.User', {
  extend: 'Ext.panel.Panel',
  xtype: 'chapter8-ticketuser',
  margin: '5 0 5 5',
  title: 'User Info',
  width: 150,
  defaults: {
    labelWidth: 80
  },
  /*
   Uncomment to give this component an xtype
   xtype: 'user',
   */
  items: [
    /* include child components here */
    {
      xtype: 'displayfield',
      fieldLabel: 'Orgname',
      bind: '{currentOrg.name}'
    },
    {
      xtype: 'displayfield',
      fieldLabel: 'Username',

    }
  ]
});
