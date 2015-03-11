Ext.define('ext5.view.chapter6.PaymentOfCardInfo',{
  extend: 'Ext.form.FieldSet',
  xtype: 'chapter6-paymentcard',
  requires: [
    'ext5.view.chapter6.DataSet',
    'ext5.view.chapter6.Months',
    'ext5.model.smpl.Data'
  ],
  title: '결제정보',
  initComponent: function(){
    Ext.apply(this, {
      items: this.getItems()
    });
    this.callParent();
  },

  getItems: function() {
    //구현예정
    return [
      {
        xtype: 'container',
        layout: 'hbox',
        margin: '0 0 5 0',
        items: [
          //폼 필드를 추가하자.
          {
            xtype: 'combo',
            fieldLabel: '카드종류',
            width: 210,
            displayField: 'name',
            valueField: 'code',
            queryMode: 'local',                 // 원격지 서버에 데이터를 요청하지 않기 우해 local로 설정함
            emptyText: '카드를 선택하세요',
            editable: false,                    // 콥모박스를 선택만 할수 있도록 설정함
            layout: {
              autoFlex: false
            },
            margin: '0 0 10 0',
            store: new Ext.data.Store({         // 별도 Store클래스파일을 만들지 않고, 직접 생성함
              model: ext5.model.smpl.Data,      // 모델지정함
              proxy: {
                type: 'memory',                 // 브라우저 내부에서 생성하는 데이터 타입으로 지정함
                reader: {
                  type: 'array'                 // 읽을 데이터 타입지정(아래 data: ext5.view.chapter6.DataSet.cardList과 연계됨)
                }
              },
              data: ext5.view.chapter6.DataSet.cardList
            })
          },
          {
            xtype: 'textfield',
            name: 'cardNumber',
            fieldLabel: '카드번호',
            flex: 1,
            allowBlank: false,
            minLength: 15,
            maxLength: 16,
            enforceMaxLength: true,
            maskRe: /\d/
          },
          {
            xtype: 'fieldcontainer',
            fieldLabel: '유효일',
            labelWidth: 75,
            layout: 'hbox',
            items: [
              //폼필드 추가
              {
                xtype: 'numberfield',
                name: 'cardExpireYear',
                hideLabel: true,
                width: 70,
                margins: '0 6 0 0',
                value: new Date().getFullYear(),
                minValue: new Date().getFullYear(),
                allowBlank: false
              },
              {
                xtype: 'combobox',
                editable: false,
                name: 'cardExpireMonth',
                displayField: 'name',
                valueField: 'num',
                queryMode: 'local',
                emptyText: '유효월',
                hideLabel: true,
                margins: '0 6 0 0',
                store: new Ext.data.Store({                                   // 콤보박스에 스토어 지정
                  fields: ['name','num'],                                     // 모델대신 fields설정을 사용함
                  data: (function (){                                         // Store에 proxy를 설정하지 않고 data설정에 직접 데이터를 제공해 처리함
                    var data = [],                                            // 반환할 데이터 배열 변수
                        months = ext5.view.chapter6.Months.monthNames;
                    Ext.Array.forEach(months, function(name,i){
                      data[i] = {name:name, num:i+1}
                    });
                    return data;
                  })()
                }),
                width: 60,
                allowBlank: false,
                forceSelection: true
              }
            ]
          }

        ]
      }
    ]
  }
});