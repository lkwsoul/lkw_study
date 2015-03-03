Ext.define('ext5.model.ticket.Project',{
  extend: 'ext5.model.ticket.Base',
  fields: [
    {
      name: 'organizationId',
      reference: 'Organization'
    },
    {
      name: 'leadId',
      unique: true,           // 리더는 1:1 관계
      reference: 'User'
    }
  ]
});