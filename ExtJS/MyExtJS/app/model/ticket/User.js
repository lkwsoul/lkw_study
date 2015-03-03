Ext.define('ext5.model.ticket.User',{
  extend: 'ext5.model.ticket.Base',
  fields: [
    {
      name: 'organizationId',
      reference: 'Organization'
    },
    {
      name: 'projectId',
      reference: 'Project'
    }
  ]
});