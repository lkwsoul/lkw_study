Ext.define('ext5.view.chapter2.ClassConfig',{
  extend: 'Ext.panel.Panel',
  xtype: 'chapter2-classconfig',
  title: 'ClassConfig',

  config: {                                               // config 설정을 이용해 사용자 클래스 Config를 정의함
    subject: '제목을 입력하세요',                          // subject를 정의함
    bottomBar: {                                          // buttomBar를 정의함(Object타입)
      height: 50,
      width: 200
    }
  },

  applySubject: function(subject){                        // subject에 대한 apply함수(세터 함수를 실해앟면 자동으로 호출되는 함수, 반한값이 최종 적용됨)
    if(!Ext.isString(subject) || subject.length==0){
      console.log('제목은 반드시 입력해야 합니다.');
    }else{
      return subject;
    }
  },

  applyBottomBar: function(bottomBar){                   // bottomBar의 apply함수
    if(bottomBar) {
      if(!this.bottomBar){                               // bottomBar가 비어 있을 때에만 세팅되도록 함
        return Ext.create('MyInnerClass', bottomBar);
      }else{
        this.bottomBar.setConfig(bottomBar);
      }
    }
  }
});

Ext.define('MyInnerClass',{
  config: {
    height: undefined,
    width: 100
  }
});