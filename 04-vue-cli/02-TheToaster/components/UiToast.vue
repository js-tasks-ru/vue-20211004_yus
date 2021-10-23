<template>
    <div
        :class="toast.class"
        class="toast"
    >
        <div
            @click="$emit('close')"
            class="close"
        ></div>
        <ui-icon
            :icon="toast.icon"
            class="toast__icon"
        />
        <span>{{ text }}</span>
    </div>
</template>

<script>
import UiIcon from "./UiIcon";

const TYPES = {
    success: {
        class: 'toast_success',
        icon: 'check-circle',
    },

    error: {
        class: 'toast_error',
        icon: 'alert-circle',
    },
};

export default {
    name: 'UiToast',

    components: {
        UiIcon,
    },

    props: {
        type: {
            type: String,
            default: 'success',
            required: true,
            validate: (type) => Object.keys(TYPES).includes(type),
        },

        text: {
            type: String,
            required: true,
        },
    },

    computed: {
        toast() {
            return TYPES[this.type];
        },
    },
};
</script>

<style scoped>
.toast {
    display: flex;
    flex: 0 0 auto;
    flex-direction: row;
    align-items: center;
    padding: 16px;
    background: #ffffff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    font-size: 18px;
    line-height: 28px;
    width: auto;
    position: relative;
}

.toast__icon {
    margin-right: 12px;
}

.toast_success {
    color: var(--green);
}

.toast_error {
    color: var(--red);
}

.close {
    display: block;
    position: absolute;
    z-index: 9999;
    width: 15px;
    height: 15px;
    right: 10px;
    top: 3px;
    cursor: pointer;
}

.close:after {
    position: absolute;
    content: '';
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    transform: rotate(45deg);
    width: 15px;
    height: 2px;
    background-color: #000000;
}

.close:before {
    position: absolute;
    content: '';
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    transform: rotate(-45deg);
    width: 15px;
    height: 2px;
    background-color: #000000;
}

</style>
