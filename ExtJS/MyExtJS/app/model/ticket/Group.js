Ext.define('ext5.model.ticket.Group',{
  extend: 'ext5.model.ticket.Base',
  fileds: [
    // 1:다의 관계 설정(Organization : Group)
    {
      name: 'organizationId',
      reference: 'Organization'
    },
    {
      name: 'userId',
      reference: 'User'
    }
  ]
});