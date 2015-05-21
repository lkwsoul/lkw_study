/**
 * Created by lkwsoul on 15. 5. 21..
 * BigDataGrid Example
 */
Ext.define('ext5.view.chapter7.BigDataGrid', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.chapter7-bigdatagrid',
  requires: [
    'Ext.data.proxy.JsonP'
  ],
  width: 700,
  height: 285,
  columnLines: true,
  initComponent: function () {
    var me = this;
    var store = Ext.create('Ext.data.Store', {
    //var store = Ext.create('Ext.data.BufferedStore', {
      fields: [
        {
          name: 'title'
        },
        {
          name: 'forumtitle'
        },
        {
          name: 'forumid',
          type: 'int'
        },
        {
          name: 'username'
        },
        {
          name: 'replycount',
          type: 'int'
        },
        {
          name: 'lastpost',
          type: 'date',
          dateFormat: 'timestamp'
        }
      ],
      //pageSize: 10,
      //pageSize: 10000,     // 전체데이터를 가져오기 위해 조정처리함
                           // 전체데이터를 출력하기 위해 다수의 시간이 필요함
                           // console에서 document.getElementsByTagName("*").length 입력시 541개 조회됨
                           // 데이터수는 6679에 비해 적게 생성됨
                           // Why, bufferrender를 기본적으로 사용하므로 위와 같은 현상 발생함
                           // (기본은 총 40개 row를 유지함, trailingBufferZone=10, leadingBufferZone=20, 현재 눈에 보이는 행수=10)
      //실제데이터사이즈 만큼 가져오기
      buffered: true,   // Ext.data.Store Buffer처리시 사용함
      pageSize: 100,
      proxy: {
        type: 'jsonp',
        url: 'http://www.sencha.com/forum/remote_topics/index.php',
        reader: {
          rootProperty: 'topics',
          totalProperty: 'totalCount'
        }
      },
      autoLoad: true
      // Ext.data.BufferedStore에서 Buffer관련 설정값
      //trailingBufferZone: 100,        // 눈에 보이는 그리드 영역 이전에 대기할 행 갯수(기본값 25)
      //leadingBufferZone: 100          // 눈에 보이는 그리드 영역 이후에 대기할 행 갯수(기본값 200)
    });

    Ext.apply(this, {
        // Ext.data.BufferedStore로 변경하여 주석처리함
        plugins: [    // 이후 추가됨
          {
            ptype: 'bufferedrenderer',
            /* 속성값 검증
            trailingBufferZone: 10,     // 눈에 보이는 그리드 영역 이전에 대기할 행 갯수(기본값 10)
            leadingBufferZone: 10       // 눈에 보이는 그리드 영역 이후에 대기할 행 갯수(기본값 20)
            // 위 설정값에 의해 541개에서 431개로 줄어들었음
            */
            // 실제 사용값으로 조정
            trailingBufferZone: 100,     // 눈에 보이는 그리드 영역 이전에 대기할 행 갯수(기본값 10)
            leadingBufferZone: 100       // 눈에 보이는 그리드 영역 이후에 대기할 행 갯수(기본값 20)
          }
        ],
        dockedItems: [
          // Pagingtoolbar는 buffered를 사용시 이전페이지/다음페이지 버튼 클리시 오류발생으로 주석 처리함(ExtJs 버그로 보임)
          //{
          //  dock: 'bottom',
          //  xtype: 'pagingtoolbar',     // 그리드 패널 하단에 툴바를 추가함
          //  store: store                // 필수로 store를 지정해야 함
          //  //displayInfo: true,
          //},
          // toolbar추가(상단)
          {
            dock: 'top',
            xtype: 'toolbar',
            items: [
              {
                xtype: 'component',
                itemId: 'status',               // onStoreSizeChange 이벤트 처리함수에서 사용함
                tpl: '전체 게시물 : {count}',      // 전체 게시물 갯수 표시
                style: 'margin-left:15px'
              }
            ]
          }
        ],
        store: store,
        columns: this.getColumnConfig(),
      }
    );

    me.callParent(arguments);
    me.store.on('datachanged',me.onStoreSizeChange, me);
  },

  //datachanged 이벤트 처리
  onStoreSizeChange: function() {
    this.down('#status').update({count: this.store.getTotalCount()});
  },

  //컬럼 설정
  getColumnConfig: function () {
    var me = this;
    return [
      {
        xtype: 'rownumberer',
        width: 50,
        sortable: false,
        renderer: function (value, meta, record, row, col, store) {
          return store.getTotalCount() - row - ((store.currentPage - 1) * store.pageSize)
        }
      },
      {
        text: "Topic",
        dataIndex: 'title',
        flex: 1,
        sortable: true
      },
      {
        text: "Author",
        dataIndex: 'username',
        width: 100,
        hidden: true,
        sortable: false
      },
      {
        text: "Replies",
        dataIndex: 'replycount',
        align: 'center',
        width: 70,
        sortable: false
      },
      {
        id: 'last',
        text: 'Last Post',
        dataIndex: 'lastpost',
        width: 130,
        renderer: Ext.util.Format.dateRenderer('n/j/Y g:i A'),
        sortable: false
      }
    ];
  }
});