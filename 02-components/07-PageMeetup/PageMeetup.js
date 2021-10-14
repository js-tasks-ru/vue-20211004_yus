import { defineComponent } from './vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import MeetupView from '../06-MeetupView/MeetupView.js';
import { fetchMeetupById } from './meetupService.js';

export default defineComponent({
    name: 'PageMeetup',

    components: {
        UiAlert,
        UiContainer,
        MeetupView,
    },

    props: {
        meetupId: {
            type: Number,
            required: true,
        },
    },

    data() {
        return {
            error: null,
            meetup: null,
            loading: false,
        };
    },

    watch: {
        meetupId: {
            async handler() {
                this.error = null;
                this.meetup = null;
                this.loading = true;

                try {
                    this.meetup = await fetchMeetupById(this.meetupId);

                } catch (error) {
                    this.error = error;
                }

                this.loading = false;
            },
            immediate: true,
        },
    },

    template: `
        <div class="page-meetup">
            <ui-container v-if="loading">
                <ui-alert>Загрузка...</ui-alert>
            </ui-container>
        
            <meetup-view
                v-else-if="meetup"
                :meetup="meetup"
            ></meetup-view>

            <ui-container v-if="error">
                <ui-alert>{{ error.message }}</ui-alert>
            </ui-container>
        </div>`,
});
