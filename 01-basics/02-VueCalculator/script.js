import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const RootComponent = defineComponent({
    name: 'Calculator',

    data() {
        return {
            OPERATION_SUM: 'sum',
            OPERATION_SUBTRACT: 'subtract',
            OPERATION_MULTIPLY: 'multiply',
            OPERATION_DIVIDE: 'divide',
            operation: null,
            operand1: 0,
            operand2: 0,
        };
    },

    computed: {
        result() {
            let result = 0;

            switch (this.operation) {
                case this.OPERATION_SUM:
                    result = this.operand1 + this.operand2;
                    break;
                case this.OPERATION_SUBTRACT:
                    result = this.operand1 - this.operand2;
                    break;
                case this.OPERATION_MULTIPLY:
                    result = this.operand1 * this.operand2;
                    break;
                case this.OPERATION_DIVIDE:
                    result = this.operand1 / this.operand2;
                    break;
                default:
                    result = 0;
            }

            return result;
        },
    },
});

const app = createApp(RootComponent),
    vm = app.mount('#app');
