// if you want use this mixin you should be install package compressorjs

import Compressor from 'compressorjs'

export default {
    methods: {
        getImageFromInput(elementId) {
            return new Promise((resolve, reject) => {

                let files = document.getElementById(elementId).files
                if (this.multiple) {
                    files.forEach(file => {
                        if (!this.checkFile(file)) {
                            reject()
                        }
                    })
                    let promises = []
                    files.forEach(file => {
                        promises.push(this.compressImage(file))
                    })
                    Promise.all(promises).then(values => {
                        resolve(values)
                    }).catch(() => {
                        reject()
                    })
                } else {
                    if (!this.checkFile(files[0]))
                        reject()
                    this.compressImage(files[0]).then(value => {
                        resolve(value)
                    }).catch(() => {
                        reject()
                    })
                }
            })
        },
        checkFile(file) {
            if (!file) {
                this.$store.commit('setSnackbar', {text: "Не удалось загрузить изображение", color: "error"})
                return false
            }
            let extension = file.name.split('.').pop().toLowerCase()
            let extensions = ['jpg', 'jpeg', 'png']
            if (!extensions.includes(extension)) {
                this.$store.commit('setSnackbar', {
                    text: "Только изображения в формате JPEG и PNG",
                    color: "error"
                })
                return false
            }
            return true
        },
        attachImage(elementId) {
            document.getElementById(elementId).value = null
            document.getElementById(elementId).click()
        },
        compressImage(file) {
            return new Promise((resolve, reject) => {
                new Compressor(file, {
                    checkOrientation: true,
                    convertSize: 10000,
                    quality: 0.6,
                    success: result => {
                        let reader = new FileReader()
                        reader.readAsDataURL(result)
                        reader.onload = () => {
                            resolve(reader.result)
                        }
                    },
                    error: () => {
                        this.$store.commit('setSnackbar', {
                            text: "Произошла ошибка при сжатии изображения",
                            color: "error"
                        })
                        reject()
                    },
                })
            })
        },
        imageUploaded(elementId) {
            return new Promise((resolve, reject) => {
                this.getImageFromInput(elementId)
                    .then(val => {
                        console.log(val)
                        document.getElementById(elementId).value = null
                        resolve(val)
                    }).catch(() => {
                }).catch(() => {
                    console.log('jsafkjhasf')
                })
            })
        }
    }
}
