/**
 * Created by gz on 2020/6/15
 */
const _data = {
    //  data参数
    pageData: {
        list: [],
        loading: false
    },
    //  methods方法
    methods: {
        getData: `getData() {
            const params = {
                currentPage: this.page,
                lineSize: this.lineSize
            };
            ajax(params).then(res => {
                this.loading = false;
                if (res.data.data.length > 0) {
                    this.pageSize = res.data.pageSize;
                    this.total = res.data.totalCount;
                    this.list = res.data.data
                }
            })
        }`
    },
    //  table参数
    tableData: {
        tableData: [],
        tableLoading: false,
    },
    tableMethods: {},
    //  分页参数
    paginationData: {
        total: 0,   //  数据总数
        page: 1,    //  列表当前页
        lineSize: 10,    //  显示数
        pageSize: 0,    //  列表总页数
        size: 10,   //  自定义当前页面数
        paginationShow: true    //  强制刷新分页组件
    },
    //  分页方法
    paginationMethod: {
        handleSizeChange: `handleSizeChange(val) {
            this.loading = true;
            this.lineSize = val;
            this.page = 1;
            this.getData()
        }`,
        handleCurrentChange: `handleCurrentChange(val) {
            this.loading = true;
            this.page = val;
            this.getData()
        }`
    },
    //  对话框参数
    dialogData: {
        dialogTitle: '', //弹出层title
        dialogStatus: '', //弹出层出现方式(添加/编辑)
        dialogFormVisible: false, //弹出层状态
        openId: '', //当前编辑的活动id
        editForm: {},
        editFormRules: {}
    },
    formMethod: {
    },
    serialize: function() {
        return `export default {
            name: '',
            components: {},
            data() {
                return ${_data.serializeData()}
            },
            computed: {},
            filters: {},
            created() {
                this.getData()
            },
            watch: {},
            method: ${_data.serializeMethods()}
        }`
    },
    serializeData: function () {
        const data = _data.pageData;
        return this.subSerializeData(data);
    },
    //
    subSerializeData: function (data) {
        const keys = Object.keys(data);
        let result = '{';
        keys.forEach(key => {
            let value = data[key];
            if (Array.isArray(value)) {
                result += `${key}: [],\n`
            } else if (typeof value === 'object' && value !== null && Object.keys(value).length) {
                let obj = '{';
                Object.keys(value).forEach(_key => {
                    let val = value[_key];
                    if (typeof val === 'string' && !val.length) {
                        obj += `${_key}: '',\n`
                    } else {
                        obj += `${_key}: ${val},\n`;
                    }
                });
                obj += '}';
                result += `${key}: ${obj},\n`
            } else if (typeof value === 'string') {
                result += `${key}: '',\n`
            } else {
                result += `${key}: ${value},\n`
            }
        });
        result += '}';
        return result
    },
    serializeMethods: function () {
        const keys = Object.keys(_data.methods);
        let result = '{';
        keys.forEach(key => {
            result += `\n${_data.methods[key]},`
        });
        result += '}';
        return result
    }
};

module.exports = _data;
