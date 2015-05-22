/**
 * Created by lkwsoul on 15. 5. 22..
 */
Ext.define('ext5.view.chapter8.DataBindModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.chapter8-databind',

  stores: {
    /*
     A declaration of Ext.data.Store configurations that are first processed as binds to produce an effective
     store configuration. For example:

     users: {
     model: 'DataBind',
     autoLoad: true
     }
     */
  },

  data: {
    title: 'Hello World',
    html: 'The html content',
    buttonText: 'A button'
  }
});