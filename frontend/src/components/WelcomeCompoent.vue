<template>
    <div class="welcome-container">
        <h1>Welcome to Our Website</h1>
        <p>Thank you for visiting us!</p>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'HomeComponent',
})

</script>
<style scoped>
.welcome-container {
    padding: 100px;
}

h1 {
    font-size: 36px;
    color: #333;
}

p {
    font-size: 18px;
    color: #666;
}
</style>
