<template>
    <nav class="nav-main">
        <a href="/" @click="initTransition()">Acamera</a>
    </nav>
</template>
<script lang="ts" setup>
import { useAnimations } from '../modules/animations'
const { initTransition } = useAnimations()
</script>

<style scoped>
.nav-main {
    border-bottom: 1px solid var(--color-background-subcard);
    display: flex;
    align-items: center;
    padding-left: 26px;
    height: 80px;
}

.nav-main a {
    font-size: var(--text-size-title);
    color: var(--color-primary);
    font-weight: 700;
    text-decoration: none;
    letter-spacing: 1px;
    transition: color .2s;
}

.nav-main a:hover {
    color: var(--color-primary-dark);
}
</style>