<template>
  <div class="app">
    <div class="bar-wrapper">
      <Bar></Bar>
    </div>
    <div class="content-wrapper">
      <ul class="sidebar-wrapper">
        <li class="file title">
          <h3>
            <span>文件管理</span>
          </h3>
          <ul>
            <li>
              <router-link to="/filePublish">文件发布</router-link>
            </li>
            <li>
              <router-link to="/fileMange">文件管理</router-link>
            </li>
          </ul>
        </li>
        <li class="case title">
          <h3>
            <span>案例管理</span>
          </h3>
          <ul>
            <li>
              <router-link to="/casePublish">案例发布</router-link>
            </li>
            <li>
              <router-link to="/caseMange">案例管理</router-link>
            </li>
          </ul>
        </li>
        <li class="video title">
          <h3>
            <span>视频管理</span>
          </h3>
          <ul>
            <li>
              <router-link to="/videoPublish">视频发布</router-link>
            </li>
            <li>
              <router-link to="/videoMange">视频管理</router-link>
            </li>
          </ul>
        </li>
        <li class="sys title">
          <h3>
            <span>系统管理</span>
          </h3>
          <ul>
            <li>
              <router-link to="/password">修改密码</router-link>
            </li>
          </ul>
        </li>
      </ul>
      <div class="content">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import data from './util/mock'
import Bar from '#/Bar/Bar'
export default {
  name: 'app',
  data() {
    return {
      list: {}
    }
  },
  created() {
    this.$http.get("/category/get_category.do").then(res => {
      var res = res.body
      this.seller = res
    }, res => {
    })

  },
  components: {
    Bar,
  }


}
</script>

<style lang="scss">
.app {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  .bar-wrapper {
    flex: 0 0 72px;
  }
  .content-wrapper {
    flex: 1;
    display: flex;
    .sidebar-wrapper {
      flex: 0 0 240px;
      width: 240px;
      background: #e1e7ee;
      padding: 5px 0;
      .title {
        border-bottom: 1px #c9cfd6 solid;
        border-top: 1px #ecf3fa solid;
        padding: 14px 0;
        &:first-of-type {
          border-top: none;
        }
        &:last-of-type {
          border-bottom: none;
        }
        &.case {
          span {
            background-position-y: -40px;
          }
        }
        &.video {
          span {
            background-position-y: -78px;
          }
        }
        &.sys {
          span {
            background-position-y: -118px;
          }
        }
        h3 {
          padding-left: 24px;
          font-weight: normal;
          span {
            background: url(./assets/sidebar.png) 0 4px no-repeat;
            padding-left: 24px;
            font-size: 16px;
          }
        }
        a {
          padding-left: 48px;
          font-size: 14px;
          color: #005c9e;
          height: 26px;
          line-height: 26px;
          display: block;
          &:hover {
            background: #bbd7f8;
          }
          &.active {
            background: #ff9c00;
            color: white;
          }
        }
      }
    }
    .content {
      flex: 1;
      padding: 20px;
    }
  }
}
</style>
