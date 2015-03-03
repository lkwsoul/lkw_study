Ext.define('ext5.model.ticket.Base',{
  extend: 'Ext.data.Model',
  requires: [
    'Ext.data.proxy.JsonP'
  ],
  fields: [
    {
      name: 'id',
      type: 'int'
    }
  ],

  schema: {
    namespace: 'ext5.model.ticket',       // Namespace 지정
    proxy: {
      type: 'jsonp',
      actionMethods: {
        read: 'GET'
      },
      api: {
        read: 'http://extuxgroup.com/ticket-{entityName:uncapitalize}.do?read'    // entityName = Base.js를 확장하는 클래스 네임을 의미함
                                                                                  // uncapitalize = 대문자로 시작하는 클래스명을 소문자로 변경함
      },
      reader: {
        type: 'json',
        rootProperty: 'entitys'
      }
    }
  }
});