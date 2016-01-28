/**
 * Created by lkwsoul on 15. 6. 15..
 */
Ext.define('ext5 .view.chapter8.ticket.Main', {
  extend: 'Ext.container.Container',
  alias: 'widget.chapter8-ticketmain',
  width: 500,
  requires: ['ext5.view.chapter8.ticket.login.Login'],
  otherContent: [
    {
      type: 'Login',
      path: 'app/view/chapter8/ticket/login/Login.js'
    },
    {
      type: 'LoginController',
      path: 'app/view/chapter8/ticket/login/LoginController.js'
    },
    {
      type: 'LoginModel',
      path: 'app/view/chapter8/ticket/login/LoginModel.js'
    }
  ],

  initComponent: function() {
    Ext.apply(this,{
      items: [
        {
          padding: '5 5 5 5',
          xtype: 'component',
          id: 'databinding'
        }
      ]
    });

    this.callParent(arguments);

    var fp = Ext.create('ext5 .view.chapter8.ticket.login.Login',{
      autoShow: true,
      listeners: {
        scope: this,
        login: function(loginController, user, organization) {
          console.log('로그인 성공:',user,organization);
          Ext.create('ext5 .view.chapter8.ticket.Body',{
            renderTo : 'databinding',
            viewModel: {
              data: {
                currentOrg : organization,
                currentuser: user
              }
            }
          });
          fp.close();
        }
      }
    });
  }
});
