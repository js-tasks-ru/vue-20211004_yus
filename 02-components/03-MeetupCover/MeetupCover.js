import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
    name: 'MeetupCover',

    props: {
        title: {
            type: String,
        },

        image: {
            type: String,
        },
    },

    computed: {
        coverStyle() {
            let style = {};

            if (this.image) {
                style['--bg-url'] = `url(${this.image})`;
            }

            return style;
        },
    },

    template: `
        <div class="meetup-cover" :style="coverStyle">
        <h1 class="meetup-cover__title">{{ title }}</h1>
        </div>`,
});
