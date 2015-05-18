Ext.define('ext5.view.chapter7.CodeComboBox', {
  extend: 'Ext.form.field.ComboBox',
  xtype: 'chapter7-codecombobox',
  displayField: 'codeNm',
  valueField: 'codeCd',
  config: {
    filterFld: 'grpCd',
    filterCd: 'G000',
    preload: false
  },
  initComponent:function() {
    var me = this;

    this.store = Ext.create('Ext.data.Store',{
      autoLoad: true,
      fields: ['codeNm','codeCd','grpCd','grpNm'],
      proxy: {
        url: '/resources/data/memberCode.json',
        type: 'ajax',
        reader: {
          type: 'json',
          rootProperty: 'items'
        }
      },
      // 필터 설정으로 특정 그룹코드만 보여주도록 함
      filters: [
        {
          property: me.getFilterFld(),
          value: me.getFilterCd()
        }
      ]
    });

    me.callParent(arguments);
  }
});