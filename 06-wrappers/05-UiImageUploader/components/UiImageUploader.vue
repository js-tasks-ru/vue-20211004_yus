<template>
    <div class="image-uploader">
        <label
            :class="{ 'image-uploader__preview-loading': loading }"
            :style="previewStyle"
            class="image-uploader__preview"
        >
            <span class="image-uploader__text">{{ uploaderText }}</span>
            <input
                v-bind="$attrs"
                @click="clickFileInput"
                @change="changeFile($event.target.files[0])"
                ref="file"
                type="file"
                accept="image/*"
                class="image-uploader__input"
            />
        </label>
    </div>
</template>

<script>
export default {
    name: 'UiImageUploader',

    inheritAttrs: false,

    props: {
        preview: {
            type: String,
        },

        uploader: {
            type: Function,
        },
    },

    emits: [
        'select',
        'upload',
        'error',
        'remove',
    ],

    data() {
        return {
            loading: false,
            file: this.preview,
        };
    },

    computed: {
        previewStyle() {
            const file = this.file;

            if (!(file instanceof File)) {
                return;
            }

            const image = URL.createObjectURL(file);
            return `--bg-url: url('${image}')`;
        },

        uploaderText() {
            let text = 'Загрузить изображение';

            if (this.loading) {
                return 'Загрузка...';
            }

            if (this.file) {
                text = 'Удалить изображение';
            }

            return text;
        },
    },

    methods: {
        /**
         * @param {File} file
         */
        changeFile(file) {
            this.file = file;
            this.$emit('select', this.file);

            if (!this.uploader) {
                return;
            }

            this.sendFile();
        },

        /**
         * @returns {Promise<void>}
         */
        async sendFile() {
            this.loading = true;

            await this.uploader(this.file)
                .then((response) => {
                    this.$emit('upload', response);
                })
                .catch((error) => {
                    this.unsetFile();
                    this.$emit('error', error);
                });

            this.loading = false;
        },

        /**
         * @param {Event} event
         */
        clickFileInput(event) {
            if (this.file) {
                event.preventDefault();
            }

            if (this.loading) {
                return;
            }

            this.unsetFile();
            this.$emit('remove');
        },

        unsetFile() {
            this.$refs.file.value = '';
            this.file = null;
            this.$emit('select', null);
        },
    },
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
    opacity: 0;
    height: 0;
}

.image-uploader__preview {
    --bg-url: var(--default-cover);
    background-size: cover;
    background-position: center;
    background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
    border: 2px solid var(--blue-light);
    border-radius: 8px;
    transition: 0.2s border-color;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 512px;
    height: 228px;
}

.image-uploader__text {
    color: var(--white);
    font-family: 'Nunito', sans-serif;
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
}

.image-uploader__preview:hover {
    border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
    cursor: no-drop;
}
</style>
