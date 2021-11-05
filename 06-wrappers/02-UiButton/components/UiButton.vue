<template>
    <component
        :is="tag"
        :class="buttonClass"
        :type="elementType"
        class="button"
    >
        <slot></slot>
    </component>
</template>

<script>
const BUTTON_TYPES = {
    primary: 'button_primary',
    secondary: 'button_secondary',
    danger: 'button_danger',
};

const DEFAULT_TAG_BUTTON = 'button';

export default {
    name: 'UiButton',

    props: {
        tag: {
            default: DEFAULT_TAG_BUTTON,
        },

        variant: {
            type: String,
            default: 'secondary',
            validator: (type) => Object.keys(BUTTON_TYPES).includes(type),
        },

        block: {
            type: Boolean,
        },
    },

    computed: {
        buttonClass() {
            const variant = BUTTON_TYPES[this.variant];

            return {
                [variant]: variant,
                'button_block': this.block,
            };
        },

        elementType() {
            if (
                this.$attrs['type'] ||
                this.tag !== DEFAULT_TAG_BUTTON
            ) {
                return this.$attrs['type'];
            }

            return DEFAULT_TAG_BUTTON;
        },
    },
};
</script>

<style scoped>
.button {
    display: inline-block;
    padding: 10px 24px;
    font-weight: 700;
    font-size: 20px;
    line-height: 28px;
    color: initial;
    text-align: center;
    border: 4px solid transparent;
    transition-duration: 0.2s;
    transition-property: background-color, border-color, color;
    outline: none;
    box-shadow: none;
    background-color: transparent;
    cursor: pointer;
    text-decoration: none;
}

.button.button_block {
    display: block;
    width: 100%;
}

.button_primary {
    background-color: var(--blue);
    border-color: var(--blue);
    color: var(--white);
}

.button_primary:hover {
    background-color: var(--blue-light);
    border-color: var(--blue-light);
}

.button_secondary {
    background-color: var(--white);
    border-color: var(--blue);
    color: var(--blue);
}

.button_secondary:hover {
    border-color: var(--blue-light);
}

.button_danger {
    background-color: var(--white);
    border-color: var(--red);
    color: var(--red);
}

.button_danger:hover {
    border-color: var(--red-light);
}
</style>
