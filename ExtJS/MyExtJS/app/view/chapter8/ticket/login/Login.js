/**
 * Created by lkwsoul on 15. 6. 15..
 */
Ext.define('ext5.view.chapter8.ticket.login.Login', {
  extend: 'Ext.window.Window',

  requires: [
    'Ext.form.Panel',
    'Ext.form.field.ComboBox',
    'ext5.view.chapter8.ticket.login.LoginModel',
    'ext5.view.chapter8.ticket.login.LoginController'
  ],

  viewModel: {
    type: 'chapter8-ticketlogin'
  },

  controller: 'chapter8-ticketlogin',

  bodyPadding: 10,
  title: 'Login - Ticket App',
  closable: false,

  cls: 'login',

  items: {
    xtype: 'form',
    reference: 'form',
    items: [
      {
        xtype: 'textfield',
        name: 'username',
        bind:'{username}',
        fieldLabel: 'Username',
        allowBlank: false,
        enableKeyEvents: true
      },
      {
        xtype: 'textfield',
        name: 'password',
        inputType: 'password',
        fieldLabel: 'Password',
        allowBlank: false,
        enableKeyEvents: true
      },
      {
        xtype: 'combobox',
        name: 'organization',
        fieldLabel: 'Organization',
        reference: 'organization',
        queryMode: 'local',
        editable: false,
        forceSelection: true,
        displayField: 'name',
        valueField: 'id',
        bind: {
          store: '{organizations}',
          value: {
            twoWay: false,
            bindTo: '{defaultOrg}'
          }
        }
      }
    ]
  },

  buttons: [
    {
      text: 'Login',
      listeners: {
        click: 'onLoginClick'
      }
    }
  ]

});
