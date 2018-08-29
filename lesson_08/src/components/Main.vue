<template>
  <div>
    <el-button type="primary" @click="jumpPage">跳转</el-button>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data() {
    return {
    };
  },
  methods: {
    jumpPage() {
      this.$router.push({
        name: 'Crud',
        // name: 'answer',
        // name: 'pageansweritem',
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
</style>
