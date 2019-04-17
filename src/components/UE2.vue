<template>
    <div>
        <script id="editor2" type="text/plain"></script>
    </div>
</template>
<script>
    export default {
        name: 'ue',
        data () {
            return {
                editor: null
            }
        },
        props: {
            value: '',
            config: {}
        },
        mounted () {
            this.editor = window.UE.getEditor('editor2', this.config);
            this.editor.addListener('ready',  () => {
                this.editor.setContent(this.value)
            })
        },
        methods: {
            getUEContent () {
                return this.editor.getContent()
            },
            setUEContent (value) {
                return this.editor.setContent(value)
            }
        },
        destroyed () {
            this.editor.destroy()
        }
    }
</script>