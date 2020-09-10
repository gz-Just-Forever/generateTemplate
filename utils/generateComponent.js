/**
 * Created by gz on 2020/6/15
 */
const generateComponent = {
    generateComponent: function (data) {
        let result = '';
        switch (data.type) {
            case 'input':
                result += generateComponent.generateInputComponent(data);
                break;
            case 'select':
                result += generateComponent.generateInputComponent(data);
                break;
            case 'date-picker':
                result += generateComponent.generateInputComponent(data);
                break;
            default:
                return ''
        }
        return result
    },
    generateInputComponent: function (data) {
        return `<el-input v-model="editForm.${data.prop}" :disable="${data.disable}" placeholder="${data.attr.placeholder}"></el-input>`
    },
    serializeData: function (type) {
        let result;
        switch (type) {
            case 'String':
                result = '';
                break;
            case 'Array':
                result = [];
                break;
            case 'Object':
                result = {};
                break;
            case 'Number':
                result = 0;
                break;
            case 'Null':
            case 'Undefined':
                result = null;
                break;
            default:
                return ''
        }
        return result
    }
};

module.exports = generateComponent;
