/**
 * Created by lkwsoul on 15. 5. 20..
 */
Ext.define('ext5.view.chapter7.PagingGrid', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.chapter7-paginggrid',
  requires: [
    'Ext.data.proxy.JsonP'
  ],
  width: 700,
  height: 285,
  columnLines: true,
  initComponent: function () {
    var me = this;
    var store = Ext.create('Ext.data.Store', {
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
        },
        'lastposter'

      ],
      pageSize: 10,
      proxy: {
        type: 'jsonp',
        url: 'http://www.sencha.com/forum/remote_topics/index.php',
        reader: {
          rootProperty: 'topics',
          totalProperty: 'totalCount'
        }
      },
      autoLoad: true
    });

    Ext.apply(this, {
        dockedItems: [
          {
            dock: 'bottom',
            xtype: 'pagingtoolbar',     // 그리드 패널 하단에 툴바를 추가함
            store: store                // 필수로 store를 지정해야 함
          }
        ],
        store: store,
        columns: this.getColumnConfig()
      }
    );

    me.callParent(arguments);
  },

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