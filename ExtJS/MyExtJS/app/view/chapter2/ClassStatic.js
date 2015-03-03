Ext.define('ext5.view.chapter2.ClassStatic',{
  extend: 'Ext.panel.Panel',
  xtype: 'chapter2-classstatic',
  config: {
    studentName: null
  },

  statics: {
    studentCount:0,
    student : function(studentName){                // 함수명 : function(인자들) 형태로 정의함
      return new this({                             // 강제로 생성자 호출("new this({...});")
        studentName : studentName,
        studentCount: this.studentCount++ 
      });
    }
  }
});