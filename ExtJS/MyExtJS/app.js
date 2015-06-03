/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
 */
Ext.application({
  name: 'ex5',

  extend: 'ex5.Application',

  autoCreateViewport: 'ex5.view.main.Main',

  //-------------------------------------------------------------------------
  // Most customizations should be made to ex5.Application. If you need to
  // customize this file, doing so below this section reduces the likelihood
  // of merge conflicts when upgrading to new versions of Sencha Cmd.
  //-------------------------------------------------------------------------

  // Route에서 지정한 형식에 맞지 않을 때 발생하는 이벤트
  listen: {
    controller: {
      '#': {
        unmatchedroute: 'onUnmatchedRoute'
      }
    }
  },

  onUnmatchedRoute: function (hash) {
    console.log('unmatchedroute....');
  }
});
