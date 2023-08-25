<template>
    <div>
        <h2>Specific Template</h2>
        <p>ID: {{ id }}</p>
        <!-- Add your content here -->
    </div>
</template>
  
<script>
export default {
    props: ['id'], // This will receive the 'id' prop from the route
    // Add any other logic you need here
};
</script>
  