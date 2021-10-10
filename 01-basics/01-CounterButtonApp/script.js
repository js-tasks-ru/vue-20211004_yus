import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const RootComponent = defineComponent({
    name: 'App',

    data() {
        return {
            counter: 0,
        };
    },

    methods: {
        increment() {
            this.counter++;
        },
    },
});

const app = createApp(RootComponent),
    vm = app.mount('#app');
