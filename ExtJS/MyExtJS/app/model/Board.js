Ext.define('ext5.model.Board',{
  extend: 'Ext.data.Model',
  requires:[
    'Ext.data.*'
  ],
  idProperty: 'id',
  fields: [
    {
      name: 'id',
      type: 'int'
    },
    {
      name: 'title',
      type: 'string'
    },
    {
      name: 'userName',
      type: 'string'
    },
    {
      name: 'role',
      type: 'string'
    },
    {
      name: 'content',
      type: 'string'
    },
    {
      name: 'createDate',
      type: 'date',
      dateFormat: 'Y.m.d'
    },
    {
      name: 'updateDate',
      type: 'date',
      dateFormat: 'Y.m.d'
    },
    {
      name: 'readCnt',
      type: 'int'
    },
    {
      name: 'deleteYn',
      type: 'boolean',
      defaultValue: false
    }
  ],

  proxy: {
    type: 'ajax',
    actionMethods: {
      read : 'GET',
      create : 'POST',
      update : 'POST',
      //destroy: 'DELETE'
      destroy: 'POST'  //Server없이 테스트를 위해 POST방식으로 변경
    },
    api: {
      read : '/resources/data/boards.json?read',
      create : '/resources/data/boards.json?create',
      update : '/resources/data/boards.json?update',
      destroy : '/resources/data/boards.json?destory'
    },
    reader: {
      type: 'json',
      rootProperty: 'entitys'
    }
  },

  validators: {
    title: 'presence',                                  // 필수입력 필드로 공백을 허용하지 않음
    content: {                                          
      //type: 'length', min: 2, max: 10                   // 길이검증
      type: 'length', min: 2, max: 100                  // 길이검증
    },
    deleteYn: {
      type: 'inclusion', list:[true,false]              // 포함하는지 여부
    },
    role: [
      {
        type: 'exclusion', list: ['Admin','Manager']    // 포함하지 않는지 여부
      }
    ],
    userName: {
      type: 'format', matcher: /^[ㄱ-힣"'\\{\\}\s]+$/    // 정규식으로 한글만 입력
    }
  }
});