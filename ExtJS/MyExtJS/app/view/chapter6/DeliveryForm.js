Ext.define('ext5.view.chapter6.DeliveryForm',{
  extend: 'Ext.form.FieldSet',
  xtype: 'chapter6-deliveryform',
  title: '배송지 정보',
  layout: 'column',

  initComponent: function(){
    // Store 정보세팅(주소정보)
    var remoteJsonStore = Ext.create('Ext.data.JsonStore',{
      fields: ['zipcode', 'address'],
      proxy: {
        type: 'ajax',
        url: '/resources/data/jusoData.json',
        reader: {
          type: 'json',
          rootProperty: 'data',
          totalProperty: 'totalCount'
        }
      }
    });

    Ext.apply(this,{
      items:[
        // 배송지주소 정보
        {
          xtype: 'fieldcontainer',
          fieldLabel: '배송지 주소',
          columnWidth: .5,
          layout: 'hbox',
          combineErrors: true,
          defaultType: 'radio',
          items:[
            {
              name: 'delivery',
              inputValue: 'newDelivery',
              boxLabel: '새로운 배송지',
              checked: true,
              handler: this.resetDelivery,
              scope: this,
              margin: '0 5 0 0'
            },
            {
              name: 'delivery',
              inputValue: '0',
              boxLabel: '회원정보 주소',
              handler: this.clickLatestDelivery,
              scope: this,
              margin: '0 5 0 0'
            }
          ]
        },
        // 주소검색 추가
        {
          xtype: 'container',
          layout: 'hbox',
          columnWidth: 1,
          defaultType: 'textfield',
          margin: '0 0 5 80',
          items: [
            //주소정보 combo
            {
              xtype: 'combo',
              name: 'findaddress',
              queryMode: 'remote',                                        // 원격지 서버와 통신하기 위해 설정
              width: 400,
              labelWidth: 55,
              fieldLabel: '주소검색',
              forceSelection: true,                                       // 콤보박스 내부에 있는 리스트의 선택만 가능하고 텍스트 필드에
                                                                          // 입력된 값이 서버에 전송되지 않도록 함
              displayField: 'address',                                    // 표시할 필드
              valueField: 'address',                                      // 실제 값이 담긴 필드
              pageSize: 5,                                                // 콤보 박스가 펼처진 후 하단에 페이징 툴바가 나타나게 함
              minChars: 1,                                                // 자동완성을 위한 최소 입력 문자열
              triggerAction: 'query',                                     // 트리거를 클릭했을 때의 처리를 정의함.
              store: remoteJsonStore,                                     // 스토어 설정
              listConfig: {                                               // listConfig 재정의
                getInnerTpl: function (displayField) {                     
                  return '<div data-qtip="{fullName}">' +
                         '<div class="combo">{zipcode}</div>' +
                         '<div class="combo-address">{address}</div>' +
                         '</div>';
                }
              },
              listeners: {
                select: function(combo, records) {                                    // 콤보박스의 select 이벤트 리스닝
                  var //zipcode = records[0].get('zipcode').split('-'),
                      zipcode = records.get('zipcode').split('-'),                    // 선택한 코드의 '-'문자열로 나누어 배열로 전달함
                      //address = records[0].get('address'),
                      address = records.get('address'),                               // 주소정보 가져옴
                      zipcodeField = this.query('[name=zipcode1],[name=zipcode2]'),   // this는 콤보박스를 의미
                                                                                      // "socope: this"로 인해 찾는 위치는 DeliveryForm내로 지정됨
                                                                                      // query를 통해 name이 zipcode1, zipcode2인 객체를 배열로 리턴함
                      addressField = this.down('[name=address1]');                    // down메소드를 통해 name이 address1인 객체를 찾아 리턴함

                  Ext.each(zipcodeField, function(field,idx) {                        // query로 통해 찾은 객체를 루핑돌며 우편번호값을 세팅함
                    field.setValue(zipcode[idx]);
                  });

                  addressField.setValue(address);                                     // down으로 찾은 주소 텍스트 필드에 주소정보를 세팅함
                },
                scope: this
              }
            },
            {
              xtype: 'checkbox',
              name: 'basicadress',
              margin: '0 0 0 5',
              boxLabel: '기본 배송지로 지정'
            }
          ]
        },
        {
          xtype: 'container',
          layout: 'hbox',
          itemId: 'zipcodeContainer',
          columnWidth: 1,
          defaultType: 'textfield',
          margin: '0 0 5 85',
          defaults: {
            readOnly: true
          },
          items: [
            {
              xtype: 'textfield',
              name: 'zipcode1',
              width: 50
            },
            {
              xtype: 'label',
              text: '-',
              margin: '0 5 0 5'
            },
            {
              xtype: 'textfield',
              name: 'zipcode2',
              width : 50,
              margin: '0 5 0 5'
            },
            {
              xtype: 'textfield',
              name: 'address1',
              flex: 1
            }
          ]
        },
        {
          xtype: 'textfield',
          columnWidth: 1,
          name: 'address2',
          margin: '0 0 5 85'
        },
        //배송요청정보
        {
          xtype: 'fieldcontainer',
          fieldLabel: '배송요청일',
          layout: 'hbox',
          columnWidth: 1,
          defaultType: 'textfield',
          margin: '0 0 5 0',
          items: [
            {
              xtype: 'datefield',
              width: 100
            },
            {
              xtype: 'label',
              text: '~',
              margin: '0 5 0 5'
            },
            {
              xtype: 'datefield',
              width: 100,
              margin: '0 5 0 0'
            },
            {
              xtype: 'datefield',
              fieldLabel: '배송예정일',
              width: 180
            },
            {
              xtype: 'label',
              text: '~',
              margin: '0 5 0 5'
            },
            {
              xtype: 'datefield',
              width: 100,
              margin: '0 5 0 0'
            }
          ]
        }

      ] // End DeliveryForm.items
    });

    this.callParent(arguments);

    //동적으로 Form구성하기
    this.setLatestDelivery();
  },

  //새로운 배송지 선택시 이벤트
  resetDelivery: function(radio, checked){
    if(!checked) return;
    var me = this,
        delivery = ['zipcode1','zipcode2','address1','address2'];

    Ext.each(delivery, function(field) {                            // 위에서 지정한 delivery배열 반복처리
      me.down('textfield[name=' + field + ']').setValue();          // delivery배열값으로 textfield내 이름으로 검색하여 값을 초기화 함
    });
  },

  // 폼데이터 채우기는 예제(json name에 해당하는 값을 일괄적으로 세팅함)
  clickLatestDelivery: function(raido, checked){
    if(!checked) return;

    var me = this;

    //Case1 (첫번째벙법)
    /*
    this.ownerCt.getForm().load({                         // this.ownerCt는 DeliveryForm 클래스를 담은 부모 컨테이너를 의미함
      url: '/resources/data/memberAddress.json',          // 호출할 서버 URL
      params: {
        addressnum: raido.inputValue                      // URL파라메터 정보(선택한 라디오버튼 값을 addressnum값으로 넘김)
      }
    });
    */

    //Case2,3은 Ext.Ajax.request를 이용하여 처리
    Ext.Ajax.request({
      url: '/resources/data/memberAddress.json', 
      success: function (response) {
        var response = Ext.decode(response.responseText);
        //Case2 (두번째방법) - scope: this 설정을 반드시 해야함
        //this.ownerCt.getForm().setValues(response.data);
        //Case3 (세번째방법) - scope: this 설정을 반드시 해야함
        //                  - model을 이용하여 맵핑처리
        var model = Ext.create('ext5.model.smpl.CheckOut');
        Ext.apply(model.data, response.data);
        this.ownerCt.getForm().loadRecord(model);
      },
      scope: this
    });
  },

  //동적인 Form을 구성하기 위한 Json로딩
  setLatestDelivery: function() {
    console.log('setLatestDelivery', '호출시작');
    Ext.Ajax.request({
      url: '/resources/data/latestDelivery.json',
      success: this.onLoad,
      scope: this
    });
    console.log('setLatestDelivery', '호출종료');
  },

  // 동적으로 최근 배송지 정보 표시함
  onLoad: function(response){
    console.log('onLoad', '호출시작');
    var response = Ext.decode(response.responseText);
    if(response.success){                                   // 성공시(받은 json항목중 "success"값을 기준으로 함)
      var radiogroup = {                                    // 라디오 버튼 그룹객체 준비함
        xtype: 'radiogroup',
        itemId: 'latestDelivery',
        fieldLabel: '최근배송지',
        columnWidth: .5,
        items: [
        ]
      };

      var i, len = response.data.length;
      for(i=0;i<len;i++){
        record = response.data[i];                          // 데이터 추출
        radiogroup.items.push({                             // 라디오 버튼 그룹에 추가함
          boxLabel: record.label,
          name: 'latestDelivery',
          inputValue: record.latestnum,
          handler: this.clickLatestDelivery,                // 라디오 버튼 클릭시 처리내용 정의함
          scope: this                                       // 스코프를 DeliveryForm으로 지정함
                                                            // (미지정시, 위 clickLatestDelivery 앞의 this는 라디오버튼 자신이 됨)
        });
      }
      this.insert(1, radiogroup);                           // 두번째에 추가합니다.(index가 0부터 시작하므로)
    }
    console.log('onLoad', '호출종료');
  }
});