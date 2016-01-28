/**
 * Created by lkwsoul on 15. 6. 15..
 */
Ext.define('ext5.view.chapter8.ticket.Body', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.chapter8-ticketbody',

  width: 500,
  height: 300,

  requires: [
    'ext5.model.ticket.User',
    'ext5.model.ticket.Project',
    'ext5.view.chapter8.ticket.BodyModel',
    'ext5.view.chapter8.ticket.BodyController',
    'ext5.view.chapter8.ticket.User'
  ],

  viewModel: {
    type: 'chapter8-ticketbody'
  },

  controller: {
    type: 'chapter8-ticketbody'
  },

  layout: {
    type: 'hbox',
    align: 'stretch'
  },


  /*
   Uncomment to give this component an xtype
   xtype: 'body',
   */

  items: [
    /* include child components here */
    {
      //xtype: ''
    }
  ]
});
