<template>
    <div flex-box="1" flex="dir:top">
        financial {{count}}
    </div>
</template>

<script>
    export default {
        name: 'financial',
        computed: {
            count(){
                return this.$store.state.count
            }
        }
    }
</script>
