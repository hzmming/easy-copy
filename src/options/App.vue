<template>
  <div class="options">
    <div class="header">
      <div class="header-content">
        <span class="header-title">Settings</span>
        <a id="rate-me" class="rate">
          <img src="@/assets/img/heart-red.png" />
          <span>Rate this extension</span>
        </a>
      </div>
    </div>

    <div class="table">
      <div class="table-header">
        <label class="label-title">Web list</label>
      </div>
      <div class="table-grid">
        <div v-if="webList.length" id="user-list" class="table-grid-max">
          <template v-for="(item, index) in webList">
            <div class="table-row" :key="index">
              <div class="row-label">{{ item }}</div>
              <i class="row-delete" title="Delete" @click="deleteItem(item)"></i>
            </div>
          </template>
        </div>
        <div v-else class="list-empty">Web list is empty.</div>
      </div>
    </div>

    <div class="footer">
      <div class="footer-content">
        <div class="content-logo">
          <i class="logo--ico"></i>
          <div class="footer-content-info">
            <span class="content-info-name">Easy Copy</span>
            <br />
            <span class="content-info-ver">Version 0.1.0</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getWebList, deleteItem } from '@/utils/store';

export default {
  name: 'App',
  data() {
    return {
      webList: [],
    };
  },
  created() {
    this.getWebList();
  },
  methods: {
    async getWebList() {
      this.webList = await getWebList();
    },
    async deleteItem(item) {
      const result = await deleteItem(item);
      if (result) {
        this.webList = this.webList.filter(i => i !== item);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.options {
  .header {
    padding: 20px 0;
    box-shadow: 0px 4px 8px -3px #11111129;

    .header-content {
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 1000px;

      .header-title {
        font-size: 22px;
        font-weight: 500;
        color: #515151;
      }

      .rate {
        width: 160px;
        height: 40px;
        padding: 0 15px;
        background: #f2faf4;
        border-radius: 3px;
        font: 500 14px 'Open Sans', Arial, sans-serif;
        color: #778b7c;
        text-decoration: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;

        > img {
          width: 25px;
          height: 25px;
        }
      }
    }
  }
  .table {
    position: relative;
    margin: 50px auto;
    width: 1000px;

    .table-header {
      display: flex;
      background: #515151 !important;
      font-family: 'Open Sans', sans-serif;
      padding: 13px 39px 13px 36px;

      .label-title {
        color: #fff;
        font-size: 16px;
      }

      .label-hint {
        margin: 3px 9px;
        font-size: 11px;
        color: #cacaca;
      }
    }

    .table-grid {
      position: relative;
      margin: auto;
      min-height: 132px;
      max-height: 352px;
      overflow-y: auto;
      overflow-x: hidden;
      border-left: 1px solid #e6e6e6;
      border-right: 1px solid #e6e6e6;
      border-bottom: 1px solid #e6e6e6;

      .table-grid-max {
        width: 100%;
        margin: auto;

        .table-row {
          padding: 9px 39px 9px 36px;
          border-bottom: 1px solid #e6e6e6;
          height: 25px;
          display: flex;
          justify-content: space-between;

          &:nth-child(even) {
            background: #f5f5f5;
          }

          .row-label {
            width: 800px;
            font-size: 14px;
            font-family: monospace;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            display: inline-block;
            margin: 4px 0 0;
            cursor: auto;
          }

          .row-delete {
            width: 16px;
            height: 16px;
            cursor: pointer;
            background-image: url(~@/assets/img/delete.png);
            background-repeat: no-repeat;
            background-size: 90%;
            margin-top: 5px;
          }
        }
      }

      .list-empty {
        position: relative;
        width: 100%;
        top: 45%;
        text-align: center;
        margin: 50px auto;
        font: 400 14px/100% 'Open Sans', Arial, sans-serif;
        color: #999;
      }
    }

    .table-border-bottom {
      border-bottom: 1px solid #e6e6e6;
      margin: auto;
      width: 1000px;
      position: absolute;
      bottom: 0px;
    }
  }

  .footer {
    display: block;
    margin: auto;
    color: #999;
    font-family: 'Lucida Grande', sans-serif;
    font-size: 12px;
    text-align: center;
    padding: 50px;

    .footer-content {
      margin: auto;
      padding: 15px 0;
      display: flex;
      align-items: center;
      max-width: 1000px;
      justify-content: space-between;
      background-color: #efefef;

      .content-logo {
        display: flex;
        align-items: center;
        padding: 0 20px;

        .ico--chrome,
        .ico--firefox,
        .logo--ico {
          display: inline-block;
          width: 32px;
          height: 32px;
          background-position: center;
          background-repeat: no-repeat;
          transition: background-image 0.3s ease;
          background-color: transparent;
          padding: 0 0 0 10px;
          opacity: 0.8;
        }
        .logo--ico {
          opacity: 1;
          background-size: 32px;
          background-image: url(~@/icons/icon.png);
        }
        .footer-content-info {
          text-align: left;
          padding: 0 5px;
          .content-info-name {
            color: #7b7575;
            font-size: 14px;
            font-weight: 500;
            font-family: Roboto, 'Segoe UI', Tahoma, sans-serif;
          }
          .content-info-ver {
            font-size: 10px;
          }
        }
      }
    }
  }
}
</style>
