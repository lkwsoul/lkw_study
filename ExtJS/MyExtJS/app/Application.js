/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('ex5.Application', {
  extend: 'Ext.app.Application',

  name: 'ex5',

  //Route 추가(해시 인식테스트를 위함)
  controllers: [
    'Route'
  ],

  stores: [
    // TODO: add global / shared stores here
  ],

  launch: function () {
    // TODO - Launch the application
  }
  /*
  defaultToken: 'root',
  init: function() {
    this.setDefaultToken('root');
  }
  */
});
