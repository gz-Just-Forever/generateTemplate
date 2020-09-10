const template = {
    // table
    table: {
        actionable: true,
        data: [
            {
                prop: 'test1',
                propType: 'String',
                label: '测试内容1'
            },
            {
                prop: 'test2',
                propType: 'String',
                label: '测试内容2'
            },
            {
                prop: 'test3',
                propType: 'Array',
                label: '测试内容3'
            },
            {
                prop: 'test4',
                propType: 'Object',
                label: '测试内容4'
            },
            {
                prop: 'test4',
                propType: 'Object',
                label: '测试内容4'
            }
        ]
    },
    //  pagination
    pagination: true,
    //  初始对话框
    dialog: false,
    //  form表单，内容取自table
    form: {
        title: '活动',
        data: [
            {
                type: 'uploadImg',
                defaultVal: '',
                label: '封面',
                prop: 'image',
                rules: true,
                attr: {
    
                }
            },
            {
                type: 'input',
                label: '名称',
                prop: 'name',
                defaultVal: '{}',
                disable: false,
                rules: true,
                attr: {
                    placeholder: '请输入名称',
                    type: 'text',
                }
            },
            {
                type: 'input',
                label: '名称',
                prop: 'test1',
                defaultVal: '[]',
                disable: false,
                rules: true,
                attr: {
                    placeholder: '请输入名称',
                    type: 'text',
                }
            },
            {
                type: 'input',
                label: '名称',
                prop: 'test2',
                defaultVal: 0,
                disable: false,
                rules: true,
                attr: {
                    placeholder: '请输入名称',
                    type: 'text',
                }
            }
        ]
    }
    , 
};

module.exports = template;