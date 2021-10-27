<template>
    <div class="toasts">
        <ui-toast
            v-for="(toast, key) in toasts"
            :type="toast.type"
            :text="toast.text"
            @close="close(key)"
        ></ui-toast>
    </div>
</template>

<script>
import UiIcon from './UiIcon';
import UiToast from "./UiToast";

const SUCCESS_TOAST = 'success',
    ERROR_TOAST = 'error',
    DEFAULT_DELAY_BEFORE_DESTROY = 5000;

export default {
    name: 'TheToaster',

    components: {
        UiIcon,
        UiToast,
    },

    data() {
        return {
            toasts: {},
            toastKey: 0,
        };
    },

    methods: {
        /**
         * @param {string} text
         */
        success(text) {
            this.addToast(SUCCESS_TOAST, text);
        },

        /**
         * @param {string} text
         */
        error(text) {
            this.addToast(ERROR_TOAST, text, 2000);
        },

        /**
         * @param {string|number} key
         * @returns {(function(): void)}
         */
        timerCallback(key) {
            return () => {
                this.close(key);
            };
        },

        /**
         * @param {string} type
         * @param {string} text
         * @param {number} delay
         */
        addToast(type, text, delay = DEFAULT_DELAY_BEFORE_DESTROY) {
            const timerCallback = this.timerCallback(this.toastKey);

            this.toasts[this.toastKey] = {
                type,
                text,
                timer: setTimeout(timerCallback, delay),
            };

            this.toastKey++;
        },

        /**
         * @param {number} key
         */
        close(key) {
            this.deleteTimer(key);
            this.deleteToast(key);
        },

        /**
         * @param {number} key
         */
        deleteTimer(key) {
            const toast = this.toasts[key];

            if (toast && toast.timer) {
                clearTimeout(toast.timer);
            }
        },

        /**
         * @param {number} key
         */
        deleteToast(key) {
            delete this.toasts[key];
        },

        deleteAllTimers() {
            for (let key in this.toasts) {
                this.deleteTimer(key);
            }
        },
    },

    beforeUnmount() {
        this.deleteAllTimers();
    },
};
</script>

<style scoped>
.toasts {
    position: fixed;
    bottom: 8px;
    right: 8px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    white-space: pre-wrap;
    z-index: 999;
}

@media all and (min-width: 992px) {
    .toasts {
        bottom: 72px;
        right: 112px;
    }
}

.toast + .toast {
    margin-top: 20px;
}
</style>
