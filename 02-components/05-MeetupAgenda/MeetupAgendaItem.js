import { defineComponent } from './vendor/vue.esm-browser.js';
import { agendaItemIcons, agendaItemDefaultTitles } from './meetupService.js';

const TALK_TYPE = 'talk';

export default defineComponent({
    name: 'MeetupAgendaItem',

    props: {
        agendaItem: {
            type: Object,
            required: true,
        },
    },

    computed: {
        title() {
            return this.agendaItem.title || agendaItemDefaultTitles[this.type];
        },

        needTalkInfo() {
            return this.type === TALK_TYPE;
        },

        icon() {
            const iconName = agendaItemIcons[this.type];
            return `/assets/icons/icon-${iconName}.svg`;
        },

        time() {
            return `${this.agendaItem.startsAt} - ${this.agendaItem.endsAt}`;
        },

        type() {
            return this.agendaItem.type;
        },
    },

    template: `
        <div class="agenda-item">
          <div class="agenda-item__col">
            <img :src="icon" class="icon" alt="key" />
          </div>
          <div class="agenda-item__col">{{ time }}</div>
          <div class="agenda-item__col">
            <h3 class="agenda-item__title">{{ title }}</h3>
            <p class="agenda-item__talk" v-if="needTalkInfo">
              <span>{{ agendaItem.speaker }}</span>
              <span class="agenda-item__dot"></span>
              <span class="agenda-item__lang">{{ agendaItem.language }}</span>
            </p>
            <p v-if="agendaItem.description">{{ agendaItem.description }}</p>
          </div>
        </div>`,
});
