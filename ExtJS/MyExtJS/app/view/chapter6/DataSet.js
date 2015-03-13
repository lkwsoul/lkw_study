Ext.define('ext5.view.chapter6.DataSet',{
  singleton: true,                  // 한번만 메모리 상주하도록 설정함
  cardList: [
    ['국민카드', 'kb'],
    ['신한카드', 'sh'],
    ['우리카드', 'wr'],
    ['시티카드', 'ct']
  ],
  gender:[
    ['남자','M'],
    ['여자','F']
  ],
  age: [
    ['20대','20'],
    ['30대','30'],
    ['40대','40'],
    ['50대','50'],
    ['60대이상','60']
  ],
  career: [
    ['1~3년','1~3'],
    ['3~5년','3~5'],
    ['5~10년','5~10'],
    ['10년이상','10']
  ],
  job: [
    ['시스템엔지니어','systemeng'],
    ['시스템프로그래머','systempgm'],
    ['디자이너','designer'],
    ['웹프로그래머','webprogramer']
  ],
  jobtype: [
    ['정규직','fulltime'],
    ['파트타임','parttime'],
    ['프리랜서','freelancer'],
    ['기타','etc']
  ],
  interest: [
    ['Java','java'],
    ['C#','c#'],
    ['C&C++','c&c++'],
    ['ExtJS','ExtJS'],
    ['JQuery','JQuery'],
    ['Sencha-Touch','ST'],
    ['JQuery-Mobile','JM'],
    ['CSS','CSS'],
    ['퍼블리싱','Publishing'],
    ['웹디자인','WebDesign']
  ]
});