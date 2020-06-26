<template>
  <div class="popup">
    <div class="title">Enable Copy!</div>
    <div class="status">
      <img :src="enableStatusImg" v-cloak @click="changeMode" />
    </div>
    <ul class="enable-opt">
      <li @click="changeOpt('enableCopy')"><span>Enable Copy</span><img :src="enableCopy | optStatusImg" /></li>
      <li @click="changeOpt('enableSelect')"><span>Enable Select</span><img :src="enableSelect | optStatusImg" /></li>
      <li @click="changeOpt('enableMenuContext')"><span>Enable MenuContext</span><img :src="enableMenuContext | optStatusImg" /></li>
    </ul>
    <div class="footer">
      <img src="/assets/img/heart-red.png" title="Give me 5 stars!" />
      <img src="/assets/img/settings.png" title="Settings" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      enableStatus: false,
      enableCopy: false,
      enableSelect: false,
      enableMenuContext: false,
    };
  },
  filters: {
    optStatusImg(val) {
      return `/assets/img/${val ? 'on' : 'off'}.png`;
    },
  },
  computed: {
    enableStatusImg() {
      return `/assets/img/${this.enableStatus ? 'on' : 'off'}Mode.png`;
    },
  },
  mounted() {
    console.log('hello');
  },
  methods: {
    changeMode() {
      this.enableStatus = !this.enableStatus;
    },
    changeOpt(opt) {
      this[opt] = !this[opt];
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  font-size: 20px;
}
</style>
