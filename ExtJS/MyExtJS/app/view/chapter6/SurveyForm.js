Ext.define('ext5.view.chapter6.SurveyForm',{
  extend: 'Ext.form.FieldSet',
  xtype: 'chapter6-surveyform',
  requires:[
  ],
  title: '설문조사',
  layout: 'anchor',
  defaults: {
    anchor: '100%'
  },
  initComponent: function() {
    Ext.apply(this,{
      items: [
        // Item추가 
      ]
    });

    this.callParent();
  }
});