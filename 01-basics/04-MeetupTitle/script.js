import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
    return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            return response.json().then((error) => {
                throw error;
            });
        }
    });
}

const RootComponent = defineComponent({
    name: 'MeetupTitle',

    data() {
        return {
            meetupId: null,
            meetup: null,
        };
    },

    watch: {
        async meetupId(id) {
            this.meetup = await fetchMeetupById(id);
        },
    },
});

const app = createApp(RootComponent),
    vm = app.mount('#app');
