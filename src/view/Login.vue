<template>
    <div class="login_container">
      <div id="login-form" class="form-group">
        <div class="input-group">
          <input type="text" class="form-control" name="telephone" placeholder="请输入手机号码">
        </div>
        <div class="input-group">
          <input type="password" class="form-control" name="password" placeholder="请输入密码">
        </div>
        <div class="input-group">
          <label class="remember-label">
            <input type="checkbox" name="remember" value="1">
            记住我
          </label>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  components: {},
  setup() {
    return {};
  },
});
</script>

<style lang="less" scoped>
    .login_container{
        background-color: azure;
        height: 100%;
    }
    #login-form{
      padding: 1rem;
      .input-group{
        padding: 1rem 0;
      }
      .input-group-addon{
        margin-left: 1rem;
      }
    }
</style>
