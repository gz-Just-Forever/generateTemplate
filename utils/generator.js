/**
 * Created by gz on 2020/6/15
 */
const { generateComponent, serializeData } = require('./generateComponent');
const {
    pageData, methods, tableData, tableMethods,
    paginationData, paginationMethod,
    dialogData, formMethod
} = require('./data');

const generator = {
    generateTable: function (data) {
        if (!data.data || !data.data.length) return '';
        let result = `<el-table 
                        :data="tableData"
                        ref="table"
                        tooltip-effect="dark" fit stripe 
                        border highlight-current-row 
                        v-loading="tableLoading">`;
        data.data.map(item => {
            result += `<el-table-column prop="${item.prop}" label="${item.label}" align="center">
                            <template slot-scope="scope">{{scope.row.${item.prop}}}</template>
                        </el-table-column>`;
        });
        if (data.actionable) {
            result +=
                `<el-table-column label="操作" width="200" align="center">
                    <template slot-scope="scope">
                      <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                      <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>`;
        }
        result += '</el-table>';
        Object.assign(pageData, tableData);
        return result
    },
    generatePagination: function () {
        Object.assign(pageData, paginationData);
        Object.assign(methods, paginationMethod);
        return `<el-pagination
                    v-if="paginationShow && total !== 0"
                    layout="sizes, prev, pager, next"
                    :page-size="lineSize"
                    :page-sizes="[size, 2*size, 3*size, 4*size, 5*size, 6*size, 7*size, 8*size, 9*size, 10*size]"
                    :current-page.sync="page"
                    :total="total"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange">
                </el-pagination>`
    },
    generateFormDialog: function (data) {
        let c_params = '{', u_params = '{', e_editForm = '{', a_editForm = '{';
        let result = `<el-dialog 
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
                        ref="editForm">`;
        data.data.map(item => {
            result += `<el-form-item label="${item.label}" prop="${item.prop}">
                            ${generateComponent(item)}
                        </el-form-item>`;
            c_params += `\n ${item.prop}: this.editForm.${item.prop},`;
            u_params += `\n ${item.prop}: this.editForm.${item.prop},`;
            e_editForm += `\n${item.prop}: row.${item.prop},`;
            if (item.defaultVal !== 0 && Boolean(item.defaultVal)) {
                a_editForm += `\n${item.prop}: ${item.defaultVal},`;
            } else {
                a_editForm += `\n${item.prop}: '',`;
            }
            dialogData.editForm[item.prop] = item.defaultVal;
            if (item.rules) {
                dialogData.editFormRules[item.prop] = '';
            }
        });
        result += `</el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click.native="dialogFormVisible = false">取消</el-button>
                            <el-button v-if="dialogStatus === 'create'" type="primary" @click="createData">添加</el-button>
                            <el-button v-if="dialogStatus === 'update'" type="primary" @click="updateData">修改</el-button>
                        </div>
                    </el-dialog>`;
        c_params += '}';
        u_params += '\nid: this.openId\n}';
        e_editForm += '}';
        a_editForm += '}';
        formMethod.handleAdd =
            `handleAdd() {
                    this.dialogStatus = 'create';
                    this.dialogFormVisible = true;
                    this.dialogTitle = '添加${data.title}';
                    this.editForm = ${a_editForm}
                 }`;
        formMethod.handleEdit =
            `handleEdit(index, row) {
                    this.dialogStatus = 'update';
                    this.dialogFormVisible = true;
                    this.dialogTitle = '编辑${data.title}';
                    this.openId = row.id;
                    this.editForm = ${e_editForm}
                 }`;
        formMethod.createData =
            `createData() {
                this.refs.editForm.validate(valid => {
                    if (valid) {
                        const params = ${c_params};
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
            }`;
        formMethod.updateData =
            `updateData() {
                this.refs.editForm.validate(valid => {
                    if (valid) {
                        const params = ${u_params};
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
            }`;
        formMethod.handleDel =
            `handleDel(index, row) {
                     this.$confirm('确认删除该条${data.title}吗?', '提示', {
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
                     }).catch(() => {
                     })
                }`;
        Object.assign(pageData, dialogData);
        Object.assign(methods, formMethod);
        return result;
    }
};

module.exports = generator;
