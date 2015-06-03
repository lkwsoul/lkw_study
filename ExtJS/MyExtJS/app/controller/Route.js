/**
 * Created by lkwsoul on 15. 6. 3..
 */
Ext.define('ex5.controller.Route', {
  extend: 'Ext.app.Controller',
  alias: 'controller.route',

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
    routes: {
      'user': 'findUser',
      // 테스트 URL : http://localhost:1841/#param/100/test
      'param/:id/:name' : {
        before: 'beforeHandleRoute',
        action: 'handleRoute',
        // 형식 지정, 형식에 맞지 않으면, app.js에 unmatchedroute 이벤트가 발생함
        conditions: {
          ':id':'([0-9]+)'
        }
      }
    }
  },

  findUser: function() {
    //http://localhost:1841/#user  로 호출 테스트하면 됨.
    console.log('findUser Start');
    this.redirectTo('user/1234');
    console.log('해시를 인식함');
    console.log('findUser End');
  },

  //라우트 Action전 수행하는 함수
  beforeHandleRoute: function(id,name,action) {
    console.log('routing start',id, name);
    if(id==100){
      console.log('routing stop');
      action.stop();
      return false;
    }
    console.log('routing continue');
    action.resume();
  },

  //라우트 Action처리 함수
  handleRoute: function() {
    console.log('routing finish',id);
  },

  /**
   * Called when the view is created
   */
  init: function () {
    console.log('Route init');
  }
});