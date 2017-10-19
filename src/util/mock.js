import Mock from 'mockjs'
let fileList = Mock.mock('/file/list.do', {
    'status': 0,
    data: {
        'pageNum': 1,
        "pageSize": 10,
        "list|1-20": [
            {
                'id': '@natural(10000)',
                '_ext': function () {
                    var types = ['.doc', '.txt', '.xls', '.pdf', '.jpg', '.ppt']
                    var r = Math.floor(Math.random() * types.length)
                    return types[r]
                },
                '_ctitle': '@ctitle(3, 12)',
                'filename': function () {
                    return this._ctitle + this._ext
                },
                'fileType': function () {
                    var types = ['法律法规', '社会', '政治', '公安', '马克思主义', '国际政治', '教育行政管理']
                    var r = Math.floor(Math.random() * types.length)
                    return types[r]
                },
                'onloadeDate': '@date()',
            }
        ]
    }

})
let fileType = Mock.mock('/category/get_category.do', {
    'status': 0,
    'data': {
        'list|1-2': [
            {
                'id': '@natural()',
                'fileType': '法律法规'
            },
            {
                'id': '@natural()',
                'fileType': '马克思主义'
            },
            {
                'id': '@natural()',
                'fileType': '公安'
            },
            {
                'id': '@natural()',
                'fileType': '法律法规'
            },
            {
                'id': '@natural()',
                'fileType': '政治'
            },
            {
                'id': '@natural()',
                'fileType': '社会'
            },
            {
                'id': '@natural()',
                'fileType': '国际政治'
            },
            {
                'id': '@natural()',
                'fileType': '教育行政管理'
            }

        ]
    }
})
export default { fileList, fileType }