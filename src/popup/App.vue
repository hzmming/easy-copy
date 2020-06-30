<template>
  <div class="popup">
    <div class="title">Easy Copy !</div>
    <div v-if="!isAdapted" class="disabled-tip">
      Unable to run on this page
    </div>
    <template v-else>
      <div class="status" :title="enable ? 'Turn off' : 'Turn on'">
        <img :src="enableStatusImg" v-cloak @click="changeMode" />
      </div>
      <ul class="enable-opt">
        <li @click="changeOpt('enableCopy')"><span>Enable Copy</span><img :src="enableCopy | optStatusImg" /></li>
        <li @click="changeOpt('enableSelect')"><span>Enable Select</span><img :src="enableSelect | optStatusImg" /></li>
        <li @click="changeOpt('enableContextMenu')"><span>Enable ContextMenu</span><img :src="enableContextMenu | optStatusImg" /></li>
      </ul>
      <div @click="reload" class="reload" title="Reload to apply changes if not working immediately" :style="{ visibility: cfgChanged ? 'visible' : 'hidden' }">
        <img src="/assets/img/reload.png" />
      </div>
    </template>
    <div class="footer">
      <img src="/assets/img/heart-red.png" title="Give me 5 stars!" @click="jumpToStar" />
      <img src="/assets/img/settings.png" title="Settings" @click="jumpToSetting" />
    </div>
  </div>
</template>

<script>
import { getWebList, toggleItem } from '@/utils/store';
import { reload, createNear, sendMessage, changeBrowserIcon } from '@/utils/tab';
import { separator } from '@/utils/constant';

export default {
  data() {
    return {
      enable: false,
      enableCopy: false,
      enableSelect: false,
      enableContextMenu: false,
      cfgChanged: false,
      isAdapted: false,
      url: '',
      origin: '',
    };
  },
  filters: {
    optStatusImg(val) {
      return `/assets/img/${val ? 'on' : 'off'}.png`;
    },
  },
  computed: {
    enableStatusImg() {
      return `/assets/img/${this.enable ? 'on' : 'off'}Mode.png`;
    },
  },
  async created() {
    await this.judgeAdapted();
    this.updateEnableInfo();
  },
  methods: {
    judgeAdapted() {
      return new Promise(resolve => {
        // 注意permissions需添加tabs权限，否则拿不到url信息
        chrome.tabs.query(
          {
            active: !0,
            currentWindow: !0,
          },
          a => {
            this.isAdapted = /^https?:\/\//i.test(a[0].url);
            this.url = a[0].url;
            this.origin = new URL(this.url).origin;
            resolve();
          }
        );
      });
    },
    async updateEnableInfo() {
      const webList = await getWebList();
      const rules = webList.filter(i => i.includes(this.origin));
      if (!rules.length) return;
      rules.map(i => i.split(separator).pop()).forEach(key => (this[key] = true));
    },
    async changeMode() {
      this.enable = !this.enable;
      this.cfgChanged = true;
      changeBrowserIcon(this.enable);
      const item = this.origin + separator + 'enable';
      await toggleItem(item);
      sendMessage({
        updateOption: true,
        enable: this.enable,
      });
      // 如果第一次使用，打开默认勾选解除复制限制
      if (this.enable && !this.enableCopy && !this.enableSelect && !this.enableContextMenu) {
        this.changeOpt('enableCopy');
      }
    },
    async changeOpt(opt) {
      this[opt] = !this[opt];
      this.cfgChanged = true;
      const item = this.origin + separator + opt;
      await toggleItem(item);
      sendMessage({
        updateOption: true,
        [opt]: this[opt],
      });
    },
    reload() {
      reload();
    },
    jumpToStar() {
      // chrome.runtime.id获取当前扩展的唯一id
      createNear({ url: 'https://chrome.google.com/webstore/detail/' + chrome.runtime.id + '/reviews', closeWindow: true });
    },
    jumpToSetting() {
      createNear({ url: 'options/options.html', closeWindow: true });
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
