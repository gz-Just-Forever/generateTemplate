/**
 * Created by gz on 2020/6/15
 */
const path = require('path');
const { table, pagination, form } = require(`${path.resolve(process.cwd())}/template.js`);
const { generateTable, generatePagination, generateFormDialog } = require('./generator');
const beautify_html = require('js-beautify').html;

function generateTemplate() {
    let result = `<template><div class="container">`;
    if (table) {
        if (table.actionable) {
            result +=
                `<p class="warn-content">
                <a>${form.title}管理</a>
                <el-button class="addBtn" type="primary" @click="handleAdd">添加${form.title}</el-button>
            </p>`;
            result += generateFormDialog(form)
        }
        result += generateTable(table);
        result += generatePagination();
    }
    if (pagination) {

    }
    if (form) {

    }
    result += `</div></template>`;
    return beautify_html(result, {
        indent_size: 4,
        eol: '\r\n',
        'wrap-attributes': 'preserve',
        'wrap-attributes-indent-size': 4
    })
}

module.exports = generateTemplate;
