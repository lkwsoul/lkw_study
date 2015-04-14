Ext.define('ext5.view.chapter7.GroupChangeCombo',{
  extend: 'Ext.form.field.ComboBox',
  fieldLabel: '그룹변경',
  displayField: 'grpNm',
  valueField: 'grpCd',
  emptyText: '그룹핑 변경',
  editable: false,
  xtype: 'chapter7-grpchgcbx',
  initComponent: function() {
    var me = this;
    me.callParent(arguments);
    me.on('render',me.setStore,me);
  },

  setStore:function() {
    var me = this;
    var columns = Ext.Array.clone(me.up('grid').columns);
    var store = Ext.create('Ext.data.Store',{
          fields: ['grpNm','grpCd'],
          data: (function() {
            Ext.Array.erase(columns, 0, 1);
            Ext.Array.erase(columns, columns.length-1, 1);
            var data = [];
            Ext.each(columns, function(column, idx){
              data.push(
                {
                  grpNm: column.text,
                  grpCd: column.dataIndex
                }
              );
            });
            console.log('data',data);
            return data;
          })()
        });

    this.bindStore(store);
  }
});