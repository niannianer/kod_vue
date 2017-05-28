<template>
    <div flex-box="1" flex="dir:top">
        position {{count}}
    </div>
</template>

<script>
    export default {
        name: 'position',
        computed: {
            count(){
                return this.$store.state.count
            }
        }
    }
</script>
