Ext.define('ext5.view.chapter6.SurveyRadio',{
  extend: 'Ext.container.Container',
  xtype: 'chapter6-surveyradio',
  requires: [
    'ext5.view.chapter6.DataSet',
    'ext5.model.smpl.Data'
  ],
  initComponent: function () {
    var me = this;

    Ext.apply(this,{
      //items구현
      items: [
        {
          xtype: 'component',
          html: me.label,                         // 이클래스를 이용하는 쪽에서 등록한 label속성 이용함
          cls: 'x-form-check-group-label'         // 라밸설정에 밑줄을 표시하기 위한 cls설정
        }
      ]
    });

    this.callParent();

    //스토어선언
    var store = new Ext.data.Store({
      model: ext5.model.smpl.Data,
      proxy: {
        type: 'memory',
        reader: {
          type: 'array'
        }
      },
      data: eval('ext5.view.chapter6.DataSet.'+me.code)     //데이터를 code값으로 동적으로 지정함
    });

    //store가 정상적으로 로딩되었는지 확인하기위한 작업
    store.each(function(item, idx){
      console.log('No:',idx, 'Value',item.data);
      //읽은 데이터를 기준으로 라디오 버튼 추가하기
      me.add({
        xtype: 'radiofield',
        name: me.code,
        inputValue: item.get('code'),
        boxLabel: item.get('name')
      });
    });

    /*
    * 라디오 버튼이 생성되는지 테스트를 위한 코드
    this.on('render', function(){
      me.add({
        xtype: 'radiofield',
        name : me.code,
        inputValue: '0',
        boxLabel: me.code
      })
    });
    */
  }
});