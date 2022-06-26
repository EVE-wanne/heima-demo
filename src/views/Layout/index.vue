<template>
  <div>
    父页面

    <router-view />

    <van-tabbar route>
      <van-tabbar-item replace to="/home"
        >首页<i slot="icon" class="toutiao toutiao-shouye"></i
      ></van-tabbar-item>
      <van-tabbar-item replace to="/video"
        >视频 <i slot="icon" class="toutiao toutiao-shipin"></i>
      </van-tabbar-item>
      <van-tabbar-item replace to="/question"
        >问答 <i slot="icon" class="toutiao toutiao-wenda"></i>
      </van-tabbar-item>
      <van-tabbar-item replace to="/my"
        >我的 <i slot="icon" class="toutiao toutiao-wode"></i>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.toutiao {
  font-size: 40px;
}
/deep/.van-tabbar-item__text {
  font-size: 20px;
}
</style>
