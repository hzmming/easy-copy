<template>
  <div class="popup">
    <div class="title">Easy Copy !</div>
    <div v-if="!isAdapted" class="disabled-tip">
      Unable to run on this page
    </div>
    <template v-else>
      <div class="status" :title="enableStatus ? 'Turn off' : 'Turn on'">
        <img :src="enableStatusImg" v-cloak @click="changeMode" />
      </div>
      <ul class="enable-opt">
        <li @click="changeOpt('enableCopy')"><span>Enable Copy</span><img :src="enableCopy | optStatusImg" /></li>
        <li @click="changeOpt('enableSelect')"><span>Enable Select</span><img :src="enableSelect | optStatusImg" /></li>
        <li @click="changeOpt('enableMenuContext')"><span>Enable MenuContext</span><img :src="enableMenuContext | optStatusImg" /></li>
      </ul>
      <div @click="reload" class="reload" title="Reload to apply changes if not working immediately" :style="{ visibility: optChanged ? 'visible' : 'hidden' }">
        <img src="/assets/img/reload.png" />
      </div>
    </template>
    <div class="footer">
      <img src="/assets/img/heart-red.png" title="Give me 5 stars!" style="visibility: hidden;" @click="jumpToStar" />
      <img src="/assets/img/settings.png" title="Settings" @click="jumpToSetting" />
    </div>
  </div>
</template>

<script>
const util = {
  tab: {
    reload() {
      chrome.tabs.reload();
      window.close();
    },
    createNear(url, direction = 'right') {
      const offset = direction === 'left' ? -1 : 1;
      chrome.tabs.query(
        {
          active: !0,
          currentWindow: !0,
        },
        function(a) {
          chrome.tabs.create({
            url,
            index: a[0].index + offset,
            active: !0,
            openerTabId: a[0].id,
          });
          window.close();
        }
      );
    },
  },
};

export default {
  data() {
    return {
      enableStatus: false,
      enableCopy: false,
      enableSelect: false,
      enableMenuContext: false,
      optChanged: false,
      isAdapted: false,
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
    this.judgeAdapted();
  },
  methods: {
    judgeAdapted() {
      // 注意permissions需添加tabs权限，否则拿不到url信息
      chrome.tabs.query(
        {
          active: !0,
          currentWindow: !0,
        },
        a => {
          this.isAdapted = /^https?:\/\//i.test(a[0].url);
        }
      );
    },
    changeMode() {
      this.enableStatus = !this.enableStatus;
    },
    changeOpt(opt) {
      this[opt] = !this[opt];
      this.optChanged = true;
    },
    reload() {
      util.tab.reload();
    },
    jumpToStar() {
      // 获取当前扩展的唯一id
      // console.log(chrome.runtime.id)
    },
    jumpToSetting() {
      util.tab.createNear('options/options.html');
    },
  },
};
</script>

<style lang="scss" scoped>
.popup {
  width: 240px;
  background-color: #fff;

  .disabled-tip {
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: rgb(169, 142, 142);
  }

  .title {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #f6e6e6;
    color: #999;
  }

  .status {
    display: flex;
    justify-content: center;
    padding: 10px 0;
    cursor: pointer;

    > img {
      width: 60px;
      transition: 0.2s;
    }

    &:hover {
      > img {
        transform: scale(1.2);
      }
    }
  }

  .enable-opt {
    margin: 0;
    padding: 0;

    > li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #666;
      font-size: 14px;
      line-height: 24px;
      padding: 10px;
      margin: 0 15px;
      border-bottom: 1px solid #e4e4e4;
      cursor: pointer;
      transition: 0.1s;
      user-select: none;

      &:hover {
        background: #f1f3f4;
      }

      > img {
        height: 14px;
      }
    }
  }

  .reload {
    margin: 16px 0;
    text-align: center;
    opacity: 0.3;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      opacity: 0.6;
    }

    > img {
      height: 24px;
    }
  }

  .footer {
    height: 40px;
    color: #545454;
    background-color: #f1f3f4;
    // text-decoration: unset;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid #d8d8d8;
    padding: 0 10px;

    > img {
      width: 22px;
      cursor: pointer;
      opacity: 0.5;

      &:hover {
        opacity: 0.8;
      }
    }
  }
}
</style>
