Ext.define('ext5.view.chapter6.MyForm',{
  extend: 'Ext.form.Panel',
  xtype: 'chapter6-myform',
  requires: [],
  frame: true,
  width: 500,
  title: '폼 패널의 생성',
  bodyStyle: 'padding:6px',       // 바디에 스타일 지정
  defaultType: 'textfield',       // items에 xtype을 지정하지 않으면 필드(textfield)로 생성함
  defaults: {                     // items에 추가될 폼 필드에 적용할 기본설정 값
    msgTarget: 'under',
    anchor: '100%',
    labelWidth: 120,
    labelAlign: 'right',
  },
  items: [],
  buttons:[                       // 전송버튼 추가
    {
      text: '전송',
      handler: function() {
        this.up('form').getForm().submit(
          {
            url: 'serverside/formSave.do',
            success: function(form, action){
              Ext.Msg.alert('Success', '저장 성공');
            },
            failure: function(form, action){
              Ext.Msg.alert('Failure', '저장 실패');
            }
          }
        );
      }
    }
  ]
});