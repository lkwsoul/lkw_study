Ext.define('ext5.view.chapter6.CheckOutMaster',{
  extend: 'Ext.form.Panel',
  alias: 'widget.chapter6-checkoutmaster',
  requires: [
    'ext5.view.chapter6.DeliveryForm',
    'ext5.view.chapter6.DeliveryPersonInfo',
    'ext5.view.chapter6.PaymentOfCardInfo'
  ],
  title: '배송/결제',
  bodyPadding: 5,
  width: 700,
  initComponent: function() {
    var me = this;
    Ext.apply(me,{
      //기본설정
      fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 80,
        msgTarget: 'qtip'
      },
      //추가할 Items
      items:[
        {
          xtype: 'chapter6-deliveryform'
        },
        {
          xtype: 'chapter6-deliveryperson'
        },
        {
          xtype: 'chapter6-paymentcard'
        }
      ],
      buttons: [
        {
          text: 'Reset',
          scope: this,
          handler: this.onResetClick
        },
        {
          text: 'Submit',
          scope: this,
          handler: this.onCompleteClick
        }
      ]
    });

    me.callParent(arguments);
  },

  onResetClick: function(){                                   // OnResetClick 정의
    this.getForm().reset();
  },

  onCompleteClick: function(){                                // onCompleteClick 정의 
    var form = this.getForm();
    if(form.isValid()){
      console.log('Submmited Values',form.getValues(true));
      form.submit({
        url: 'server.jsp'
      });
    }
  }
});