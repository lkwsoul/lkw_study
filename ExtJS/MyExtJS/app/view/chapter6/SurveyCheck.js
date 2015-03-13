Ext.define('ext5.view.chapter6.SurveyCheck',{
  extend: 'Ext.container.Container',
  xtype: 'chapter6-surveycheck',
  requires: [
    'ext5.view.chapter6.DataSet',
    'ext5.model.smpl.Data'
  ],
  layout: {
    type: 'vbox',
    align: 'stretch'             // 가로확장을 위해 strech로 설정함
  },
  initComponent: function() {
    var me = this;
    Ext.apply(this,{
      items: [
        {
          xtype: 'component',
          html: me.label,
          cls: 'x-form-check-group-label'
        }
      ]
    });

    this.callParent();

    this.on('render',function(){
      var store = new Ext.data.Store({
        model: ext5.model.smpl.Data,
        proxy: {
          type: 'memory',
          reader: {
            type: 'array'
          }
        },
        data: eval('ext5.view.chapter6.DataSet.'+me.code)
      });

      var checkboxGroup = {
        xtype: 'checkboxgroup',
        columns: me.columns,
        name: me.code,
        style: {
          padding: '5px 10px 5px 10px'
        },
        items: []       // 동적을 추가하기위해 자리만 만듦
      };

      //테스트로 하나만 생성해 봄
      /*
      checkboxGroup.items.push({
        xtype: 'checkbox',
        name: me.code,
        inputValue: me.code,
        boxLabel: me.code
      });
      */

      store.each(function(item){
        checkboxGroup.items.push({
          xtype: 'checkbox',
          name: me.code,
          inputValue: item.get('code'),
          boxLabel: item.get('name')
        });
      });

      me.add(checkboxGroup);
    });
  }
});