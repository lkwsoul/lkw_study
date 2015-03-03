Ext.define('ext5.view.chapter1.HelloWorld', {     // 클라스정의 'ext5' 앱이름, 'view.chapter1' 패키지명, 'HelloWorld' 클라스명
  extend: 'Ext.panel.Panel',                      // 부모클라스 정의
  alias: 'widget.chapter1-helloworld',            // 클라스의 함축적이름으로 xtype으로 지정할때 사용함.
  /*
  otherContent:[
    {
      type : 'Login',
      path : 'app/view/dataview/MultiSortButton.js'
    },
    {
      type: 'Data',
      path: 'resource/data/sencha-touch-example.json'
    }
  ],
  */
  title:'Hello Word',
  html: '안녕하세요. ExtJS5를 같이 배워요'
});