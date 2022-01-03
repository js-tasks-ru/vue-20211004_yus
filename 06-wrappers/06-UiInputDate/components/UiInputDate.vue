<template>
    <ui-input
        v-bind="$attrs"
        :type="type"
        :model-value="value && value.toString()"
        @update:modelValue="update('update:modelValue')"
        @change="update('change')"
        ref="UiInputDate"
    >
        <template v-for="slot in Object.keys($slots)" #[slot]>
            <slot :name="slot" />
        </template>
    </ui-input>
</template>

<script>
import UiInput from './UiInput';

const TYPE_DATE = 'date',
    TYPE_TIME = 'time',
    TYPE_DECIMAL_LOCAL = 'datetime-local';

export default {
    name: 'UiInputDate',

    inheritAttrs: false,

    components: {UiInput},

    emits: ['update:modelValue', 'change'],

    props: {
        modelValue: {
            default: null,
        },

        type: {
            type: String,
            validator: (type) => [TYPE_DATE, TYPE_TIME, TYPE_DECIMAL_LOCAL].includes(type),
            default: TYPE_DATE,
        },
    },

    data() {
        return {
            valueNumber: null,
        };
    },

    computed: {
        value() {
            if (!this.modelValue) {
                return;
            }

            return this.formatValue(this.modelValue);
        },
    },

    methods: {
        /**
         * @param {string} event
         */
        update(event) {
            this.$emit(event, this.$refs.UiInputDate.$refs.input.valueAsNumber);
        },

        /**
         * @param {number} value
         * @returns {string}
         */
        formatValue(value) {
            let formattedValue;

            switch (this.type) {
                case TYPE_TIME:
                    formattedValue = formatTime(value);
                    break;
                case TYPE_DECIMAL_LOCAL:
                    formattedValue = formatDateTime(value);
                    break;
                default:
                    formattedValue = formatDate(value);
            }

            return formattedValue;
        },
    },
};

/**
 * @param {number} value
 * @returns {string}
 */
function formatDate(value) {
    let date = new Date(value),
        days = date.getUTCDate(),
        months = date.getUTCMonth() + 1,
        year = date.getUTCFullYear();

    if (days < 10) days = '0' + days;
    if (months < 10) months = '0' + months;

    return `${year}-${months}-${days}`;
}

/**
 * @param {number} value
 * @returns {string}
 */
function formatTime(value) {
    let date = new Date(value),
        hours = date.getUTCHours(),
        minutes = date.getUTCMinutes();

    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;

    return `${hours}:${minutes}`;
}

/**
 * @param {number} value
 * @returns {string}
 */
function formatDateTime(value) {
    const date = formatDate(value),
        time = formatTime(value);

    return `${date}T${time}`;
}
</script>
