Ext.define('ext5.view.chapter4.MyCustomTabPanelStep3',{
  extend: 'Ext.Component',
  cls: 'custom-tab',
  xtype: 'chapter4-customstep4',
  requires: [
    'Ext.window.MessageBox'
  ],

  onRender: function() {
    this.callParent(arguments);
    Ext.core.DomHelper.append(this.getEl(),
      '<div class="main_dashboard">'+
      '<div class="tab_bg">'+
      '  <ul class="dashboard_tab_menu" id="ulroot">'+
      '    <li><a href="http://www.daum.net" class="tab1">탭1번</a></li>'+
      '    <li><a href="#" class="tab2 on">탭2번</a></li>'+
      '    <li><a href="#" class="tab3">탭3번</a></li>'+
      '    <li><a href="#" class="tab4">탭4번</a></li>'+
      '  </ul>'+
      '</div>'+
      '</div>'
    );
  },

  initComponent: function(){
    var me = this;
    me.callParent(arguments);
    me.on('afterrender',function(){                               // afterrender 이벤트 정의

      /* Ext.select()는 CSS기반으로 DOM을 찾는다 */
      /*
      * 돔요소 제거: Ext.select('li a').destory();
      * 돔요소 숨김: Ext.select('li a').hide();
      * 돔요소 스타일속성 변경 : Ext.select('li a').removeCls('on');
      */
      /*
      me.findElement('div.main_dashboard');
      me.findElement('div.main_dashboard div.tab_bg ul.dashboard_tab_menu');
      me.findElement('div.main_dashboard div.tab_bg ul.dashboard_tab_menu li');

      //var els = me.findElement('div.main_dashboard div.tab_bg ul.dashboard_tab_menu li a');
      var els = me.findElement('li a');
      //위 CSS요소로 검색된 요소를 모두 로깅처리함
      Ext.each(els.elements, function(element){       // 요소를 하나씩 로깅처리함
        console.log('검색한요소는:', element);
      });
      //me.findElement('div.main_dashboard div.tab_bg ul.dashboard_tab_menu li a.on')
      //class 추가처리하기('on' 스타일 모두 적용처리하기)
      //me.findElement('div.main_dashboard div.tab_bg ul.dashboard_tab_menu li a').addCls('on');

      console.log('선택결과:', els.elements[0], '결과갯수:', els.getCount());
      */

      /* Ext.query() 함수 */
      /* => Ext.DomQuery.select()의 단축이름 */
      /*
      // id로 선택
      console.log(Ext.query('#ulroot'));

      // css클래스로 선택
      console.log(Ext.query('.dashboard_tab_menu'));

      // id, css 클래스 모두 사용해 선택
      console.log(Ext.query('#ulroot.dashboard_tab_menu'));
      */
      this.el.on('click',function(eventObject, htmlElement){      // 클래스가 가진 돔 요소에 이벤트를 등록 리스닝함

          /* 탭클릭시 첫번째 탭색상변경 */
          /*
          var first_anchor = Ext.get(Ext.select('a').first());
          first_anchor.hide();
          var first_li = Ext.get(Ext.select('li').first());
          first_li.addCls('bgcolor_red');
          console.log(Ext.query('#ulroot.dashboard_tab_menu li.bgcolor_red'));
          console.log(Ext.query('li.bgcolor_red'));
          console.log(Ext.query('.bgcolor_red'));
          */

          // 이벤트 발생시 처리할 내용
          console.log(htmlElement);
          eventObject.preventDefault();                           // 이벤트의 작동을 막는다

          Ext.select('.dashboard_tab_menu li a').removeCls('on'); // dashboard_tab_menu CSS 클래스에 속한 모든 li a 엘리먼트의 'on' 스타일을 삭제함
          Ext.get(htmlElement).addCls('on');                      // 현재 이벤트가 발생한  엘리먼트에 'on' 스타일 적용

          /* 클릭시 링크 존재시 확인후 이동하는 기능 추가 */
          var url = Ext.get(htmlElement).getAttribute('href');
          if(url!='#'){
            Ext.Msg.confirm('주소확인','링크주소가 존재합니다. 이동하시겠습니까?',
              function(btn){
                if(btn=='yes'){
                  location.href=url;
                }
              },
              me
            );
          }

          /* Ext.get(), Ext.query()사용법 */
          /*
          eventObject.stopEvent();
          console.log('id전달', Ext.get('ulroot').dom);
          var ulroot = Ext.query('#ulroot')[0];
          console.log('Ext.dom.Element 전달', Ext.get(ulroot).dom);

          var ulrootDomElement = Ext.get('ulroot').dom;
          console.log('HTML DomElement전달',Ext.get(ulrootDomElement).dom);
          */

        }, this, {                                                // target Object
          delegate: 'a'                                           // delegate(위임) 처리할 태그(만약 본줄 주석처리시, 전체 클릭이벤트에 반응하게 됨)
        });
    });
  },

  findElement: function(condition) {
    /* CSS기반으로 DOM을 찾는다 */
    var els = Ext.select(condition), domEl = els.first().dom;
    console.log('선택결과', domEl, '결과갯수', els.getCount());
    return els;
  }
});