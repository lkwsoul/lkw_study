/**
 * Created by lkwsoul on 15. 5. 22..
 */
Ext.define('ext5.view.chapter8.DataBindController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.chapter8-databind',

  /**
   * Called when the view is created
   */
  init: function () {

  },

  onClickButton: function () {
    Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
  },

  onConfirm: function (choice) {
    if (choice === 'yes') {
      var mypanel = this.getView().down('panel');
      var mypanel = this.lookupReference('datapanel');
      var mypanel = this.getReferences().datapanel;
      mypanel.setTitle('레퍼런스를 통해 접근');

    this.getViewModel().set('name','안녕하세요^^');
    }
  }
});