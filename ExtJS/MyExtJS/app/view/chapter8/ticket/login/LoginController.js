/**
 * Created by lkwsoul on 15. 6. 15..
 */
Ext.define('ext5.view.chapter8.ticket.login.LoginController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.chapter8-ticketlogin',

  requires: [
    'ext5.model.ticket.User'
  ],

  config: {
    /*
     Uncomment to add references to view components
     refs: [{
     ref: 'list',
     selector: 'grid'
     }],
     */

    /*
     Uncomment to listen for events from view components
     control: {
     'useredit button[action=save]': {
     click: 'updateUser'
     }
     }
     */
  },

  /**
   * Called when the view is created
   */
  init: function () {

  },

  /**
   * @param {Ext.button.Button} component
   * @param {Event} e
   */
  onLoginClick: function (component, e) {
    var form = this.lookupReference('form');
    if(form.isValid()){
      Ext.getBody.mask(this.loginText);
      this.login({
        data: form.getValues(),
        scope: this,
        success: 'onLoginSucess',
        failure: 'onLoginFailure'
      });
    }
  },

  onLoginFailure:function(){
    Ext.getBody().unmask();       // mask제거
  },
  onLoginSucess:function(){
    Ext.getBody().unmask();       // mask제거

    var org = this.lookupReference('organization').getSelectedRecored();    // organization구해서, 선택된 레코드 반환
    this.fireViewEvent('login',this.getView(), user, org);                  // ViewEvnet발생
                                                                            // login은 Ajax 통신처리하는 메서드
  },

  login:function(option){
    Ext.Ajax.request({
      url: '../../resource/data/authentication.json',
      method: 'GET',
      params: option.data,
      scope: this,
      failure: this.onLoginFailure,
      callback: this.onLoginReturn,
      original: options
    });
  },

  onLoginReturn:function(options, success, response) {
    options = options.original;
    var resultSet;
    var user = Ext.create('ext5.model.ticket.User');

    if(success) {
      resultSet = user.getProxy().getReader().read(response);
      if(resultSet.getSuccess()){
        Ext.callback(options.success, options.scope, [resultset.getRecords()[0]]);
        return;
      }
    }

    //실패처리
    Ext.callback(options.failure, options.scope, [response, resultSet]);
  }
});
