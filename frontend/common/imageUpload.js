import Compressor from 'compressorjs';

export default {
    methods: {
        getImageFromInput(elementId) {
            return new Promise((resolve, reject) => {
                let file = document.getElementById(elementId).files[0];
                if (!file) {
                    this.$store.commit('setSnackbar', {text: "Не удалось загрузить изображение", color: "error"});
                    reject()
                }
                let extension = file.name.split('.').pop().toLowerCase();
                let extensions = ['jpg', 'jpeg', 'png'];
                if (!extensions.includes(extension)) {
                    this.$store.commit('setSnackbar', {
                        text: "Только изображения в формате JPEG и PNG",
                        color: "error"
                    });
                    reject()
                }

                new Compressor(file, {
                    checkOrientation: true,
                    convertSize: 10000,
                    quality: 0.6,
                    success: result => {
                        let reader = new FileReader();
                        reader.readAsDataURL(result);
                        reader.onload = () => {
                            resolve(reader.result)
                        }
                    },
                    error: () => {
                        this.$store.commit('setSnackbar', {
                            text: "Произошла ошибка при сжатии изображения",
                            color: "error"
                        });
                        reject()
                    },
                });
            });
        },
        attachImage(elementId) {
            document.getElementById(elementId).value = null;
            document.getElementById(elementId).click()
        },
        async imageUploaded(elementId) {
            let image = null
            await this.getImageFromInput(elementId)
                .then(val => {
                    document.getElementById(elementId).value = null
                    image = val
                }).catch(() => {
                })
            return image
        }
    }
}
