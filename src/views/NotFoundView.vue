<template>
  <div class="not-found">
    <h1>This page does not exist.</h1>
    <p>Please use the navigation drawer to navigate through this app.</p>
  </div>
</template>

<script>
export default {
    name: 'NotFoundView'
}
</script>

<style lang="scss" scoped>
    .not-found {
        padding-top: 30px;
        padding-left: 60px;
        padding-right: 15px;

        h1 {
            color: rgb(189, 26, 26); 
            font-size: 1.6rem;
            font-weight: 500;
            margin-bottom: 20px;
        }

        p {
            color: rgb(201, 47, 47);
            font-size: 1.2rem;
        }
    }

</style>
