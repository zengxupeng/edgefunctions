<template>
    <router-view v-slot="{Component}">
        <component :is="Component"></component>
    </router-view>
</template>

<script>
export default {
    name: 'App',
    setup () {
    }
}
</script>

<style>
@import 'assets/styles/reset.css';
</style>
