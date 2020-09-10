#!/usr/bin/env node
/**
 * Created by gz on 2020/6/15
 */
const fs = require('fs');
const path = require('path');
const generateTemplate = require('../utils/generateTemplate');
const generateScript = require('../utils/generateScript');
let { name } = require(`${path.resolve(process.cwd())}/template.js`);

let pageStr = generateTemplate();

pageStr += `\n${generateScript()}\n`;

pageStr += `<style rel="stylesheet/scss" lang="scss" scoped>

</style>`;

if (!name) name = 'template_' + new Date().getTime() + '.vue';
fs.writeFile(`${path.resolve(process.cwd())}/${name}`, pageStr, err => {
    if (err) throw err
});
