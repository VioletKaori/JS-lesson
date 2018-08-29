<template>
    <div id="normalLoginTab" class="loginForm">
      <div id="input-box-1" class="input-box">
        <img src="../../static/人.png" class="picture">
        <input placeholder="邮箱">
      </div>
      <div id="input-box-2" class="input-box">
        <img src="../../static/密码.png" class="picture">
        <input placeholder="密码">
      </div>
      <div id="confirm">
        >>>请依次点击 “敏” “享” “昔” 完成验证>>>
      </div>
      <div id="button">登 录</div>
    </div>

</template>

<script>
export default {
  data: function () {
    return {
    }
  }
}
</script>

<style>
.loginForm{
  height: 200px;
  width: 490px;
}
.input-box{
  height: 40px;
  width: 350px;
  display: flex;
  justify-content:center;
  align-items:Center;
  border-style: solid;
  border-width: 1px;
  border-color: rgb(202, 202, 202);
  background-color: white;
  margin-left: auto;
  margin-right: auto;
}
#input-box-1{
  margin-top: 50px;
}
#input-box-2{
  margin-top: 15px;
}
input{
  height: 35px;
  width: 300px;
  border: none;
  margin-left: 13px;
}
.picture{
  height: 30px;
  width: 30px;
}
#confirm{
  height: 30px;
  width: 350px;
  border-style: solid;
  border-width: 1px;
  border-radius: 10px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 25px;
  font-size: 12px;
  color: rgba(126, 126, 126, 0.74);
  line-height: 30px;
}
#button{
  height: 35px;
  width: 350px;
  font-size: 20px;
  background-color:rgb(142, 191, 231);
  border-radius: 10px;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  line-height: 35px;
  color: white;
}
</style>
