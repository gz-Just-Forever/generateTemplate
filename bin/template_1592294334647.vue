<template>
    <div class="container">
        <p class="warn-content">
            <a>活动管理</a>
            <el-button class="addBtn" type="primary" @click="handleAdd">添加活动</el-button>
        </p>
        <el-dialog
            :title="dialogTitle"
            :visible.sync="dialogFormVisible"
            :close-on-click-modal="false"
            :width="$store.getters.dialogWidth"
            :top="$store.getters.dialogTop"
            :width="$store.getters.dialogWidth"
            :top="$store.getters.dialogTop">
            <el-form
                :model="editForm"
                :label-position="$store.getters.labelPosition"
                label-width="120px"
                :rules="editFormRules"
                ref="editForm">
                <el-form-item label="封面" prop="image">

                </el-form-item>
                <el-form-item label="名称" prop="name">
                    <el-input v-model="editForm.name" :disable="false" placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item label="名称" prop="test1">
                    <el-input v-model="editForm.test1" :disable="false" placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item label="名称" prop="test2">
                    <el-input v-model="editForm.test2" :disable="false" placeholder="请输入名称"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="dialogFormVisible = false">取消</el-button>
                <el-button v-if="dialogStatus === 'create'" type="primary" @click="createData">添加</el-button>
                <el-button v-if="dialogStatus === 'update'" type="primary" @click="updateData">修改</el-button>
            </div>
        </el-dialog>
        <el-table
            :data="tableData"
            ref="table"
            tooltip-effect="dark" fit stripe
            border highlight-current-row
            v-loading="tableLoading">
            <el-table-column prop="test1" label="测试内容1" align="center">
                <template slot-scope="scope">{{scope.row.test1}}</template>
            </el-table-column>
            <el-table-column prop="test2" label="测试内容2" align="center">
                <template slot-scope="scope">{{scope.row.test2}}</template>
            </el-table-column>
            <el-table-column prop="test3" label="测试内容3" align="center">
                <template slot-scope="scope">{{scope.row.test3}}</template>
            </el-table-column>
            <el-table-column prop="test4" label="测试内容4" align="center">
                <template slot-scope="scope">{{scope.row.test4}}</template>
            </el-table-column>
            <el-table-column prop="test4" label="测试内容4" align="center">
                <template slot-scope="scope">{{scope.row.test4}}</template>
            </el-table-column>
            <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            v-if="paginationShow && total !== 0"
            layout="sizes, prev, pager, next"
            :page-size="lineSize"
            :page-sizes="[size, 2*size, 3*size, 4*size, 5*size, 6*size, 7*size, 8*size, 9*size, 10*size]"
            :current-page.sync="page"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange">
        </el-pagination>
    </div>
</template>
<script>
export default {
    name: '',
    components: {},
    data() {
        return {
            list: [],
            loading: false,
            dialogTitle: '',
            dialogStatus: '',
            dialogFormVisible: false,
            openId: '',
            editForm: {
                image: '',
                name: {},
                test1: [],
                test2: 0,
            },
            editFormRules: {
                image: '',
                name: '',
                test1: '',
                test2: '',
            },
            tableData: [],
            tableLoading: false,
            total: 0,
            page: 1,
            lineSize: 10,
            pageSize: 0,
            size: 10,
            paginationShow: true,
        }
    },
    computed: {},
    filters: {},
    created() {
        this.getData()
    },
    watch: {},
    method: {
        getData() {
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
        },
        handleAdd() {
            this.dialogStatus = 'create';
            this.dialogFormVisible = true;
            this.dialogTitle = '添加活动';
            this.editForm = {
                image: '',
                name: {},
                test1: [],
                test2: '',
            }
        },
        handleEdit(index, row) {
            this.dialogStatus = 'update';
            this.dialogFormVisible = true;
            this.dialogTitle = '编辑活动';
            this.openId = row.id;
            this.editForm = {
                image: row.image,
                name: row.name,
                test1: row.test1,
                test2: row.test2,
            }
        },
        createData() {
            this.refs.editForm.validate(valid => {
                if (valid) {
                    const params = {
                        image: this.editForm.image,
                        name: this.editForm.name,
                        test1: this.editForm.test1,
                        test2: this.editForm.test2,
                    };
                    add(params).then(res => {
                        this.$message({
                            message: res.data.message,
                            type: res.data.sucFlag ? 'success' : 'error'
                        });
                        if (res.data.sucFlag) {
                            this.$refs['editForm'].resetFields();
                            this.dialogFormVisible = false;
                            this.getData()
                        }
                    })
                } else {
                    this.$message({
                        message: '必填信息未填写！',
                        type: 'error'
                    })
                }
            })
        },
        updateData() {
            this.refs.editForm.validate(valid => {
                if (valid) {
                    const params = {
                        image: this.editForm.image,
                        name: this.editForm.name,
                        test1: this.editForm.test1,
                        test2: this.editForm.test2,
                        id: this.openId
                    };
                    update(params).then(res => {
                        this.$message({
                            message: res.data.message,
                            type: res.data.sucFlag ? 'success' : 'error'
                        });
                        if (res.data.sucFlag) {
                            this.$refs['editForm'].resetFields();
                            this.dialogFormVisible = false;
                            this.getData()
                        }
                    })
                } else {
                    this.$message({
                        message: '必填信息未填写！',
                        type: 'error'
                    })
                }
            })
        },
        handleDel(index, row) {
            this.$confirm('确认删除该条活动吗?', '提示', {
                type: 'warning',
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                delete(row.id).then(res => {
                    this.$message({
                        message: res.data.message,
                        type: res.data.sucFlag ? 'success' : 'error'
                    })
                    if (this.list.length === 1) {
                        this.page -= 1
                        this.getData()
                    } else {
                        this.getData()
                    }
                })
            }).catch(() => {})
        },
        handleSizeChange(val) {
            this.loading = true;
            this.lineSize = val;
            this.page = 1;
            this.getData()
        },
        handleCurrentChange(val) {
            this.loading = true;
            this.page = val;
            this.getData()
        },
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>