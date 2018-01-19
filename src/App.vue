<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
html,body,#app{
    min-width: 1000px;
    width:100%;
    height:100%;
    font-family: "Microsoft YaHei";
    font-size:14px;
    color: #333;
    background: #F2F6FA;
}
.el-button--primary{
  background-color: $blue;
    border-color: $blue;
    &:focus,&:hover{
    background-color: $blue_hover;
      border-color: $blue_hover;
    }
}
</style>
