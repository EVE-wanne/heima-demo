<template>
  <div>
    <van-nav-bar title="标题">
      <van-icon name="cross" slot="left"></van-icon>
    </van-nav-bar>

    <!-- 登录表单 -->
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model.trim="mobile"
        name="mobile"
        placeholder="手机号"
        :rules="[
          { required: true, message: '请填写用户名' },
          {
            pattern:
              /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,
            message: '手机号不符合',
          },
        ]"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model.trim="code"
        placeholder="验证码"
        name="code"
        :rules="[
          { required: true, message: '请填写验证码' },
          {
            pattern: /\d{6}/,
            message: '验证码必须为六位数字',
          },
        ]"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <!-- 发送验证码按钮 -->
        <template #button>
          <!-- 倒计时 -->
          <van-count-down
            :time="time"
            format="ss s"
            v-if="isCountDownShow"
            @finish="isCountDownShow = false"
          />
          <van-button
            size="small"
            class="yzm"
            native-type="button"
            v-else
            @click="sendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button round block native-type="submit" class="login-btn"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { getSmsCode, login } from '@/api/user'
export default {
  created () { },
  data () {
    return {
      mobile: '',
      code: '',
      time: 1000 * 5,
      isCountDownShow: false //* 默认不显示倒计时
    }
  },
  methods: {
    async onSubmit (values) {
      try {
        const res = await login(values)
        this.$toast.success('登录成功')
        //* 成功后存到vuex中
        this.$store.commit('setuser', res.data.data)
      } catch (err) {
        this.$toast.fail('登录失败')
      }
    },
    async sendSms () {
      try {
        await this.$refs.form.validate('mobile')
        this.isCountDownShow = true
        try {
          const res = await getSmsCode(this.mobile)
          this.$toast.success('发送成功')
        } catch (err) {
          this.$toast.fail('发送失败')
        }
      } catch (err) {
        console.log(err)
        this.$toast.fail('手机号格式不正确')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.toutiao {
  font-size: 37px;
}
.yzm {
  width: 152px;
  height: 46px;
  background-color: #ededed;
  border-radius: 23px;
  .van-button__text {
    zoom: 0.96;
  }
}
.login-btn {
  width: 694px;
  height: 88px;
  background-color: #6db4fb;
  border-radius: 10px;
  font-size: 30px;
  color: #fff;
}
</style>
