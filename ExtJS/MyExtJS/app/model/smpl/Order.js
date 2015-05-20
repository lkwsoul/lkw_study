Ext.define('ext5.model.smpl.Order',{
  extend: 'Ext.data.Model',
  requires: [
    'Ext.data.validator.Inclusion'
  ],
  fields: [
    'customName',           // 주문자명
    'orderDate',            // 주문일자
    'orderDesc',            // 주문내역
    {name:'orderCnt', type:'int'},        // 주문수량
    {name:'orderAmount', type:'float'},   // 주문금액
    {name:'accrueAmount', type:'float'},  // 누적 주문액
    //{name:'isMember', type:'boolean'},    // 회원주문여분
    {name:'isMember'},    // 회원주문여분
    'orderDetail',                        // 주문상세
    'estimate',                           // 고객평가
    'areaNm',                             // 주문지역
    'id',
    'name',
    'lastname'
  ],
  proxy: {
    type: 'ajax',
    url: '/resources/data/Order.json',
    reader: {
      type: 'json',
      rootProperty: 'entitys'
    }
  },
  validators: [
    {type: 'inclusion', field: 'isMember', list:[true,false]}
  ]
});