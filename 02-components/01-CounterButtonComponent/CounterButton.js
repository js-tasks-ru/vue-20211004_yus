import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
    name: 'CounterButton',

    props: {
        count: {
            type: Number,
            default: 0,
        },
    },

    emits: ['update:count'],

    data() {
        return {
            calcCount: this.count,
        };
    },

    watch: {
        count(newValue) {
            this.calcCount = newValue;
        },
    },

    methods: {
        increaseCount() {
            this.$emit('update:count', ++this.calcCount);
        },
    },

    template: `<button type="button" @click="increaseCount">{{ count }}</button>`,
});
