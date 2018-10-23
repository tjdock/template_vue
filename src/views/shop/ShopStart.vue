<template>
    <p>Shop start</p>
</template>

<script>
    export default {
        name: "ShopStart",
        created(){
            this.$store.dispatch('resetStoreid');
        }
    }
</script>

<style scoped>

</style>