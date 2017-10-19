import Vue from 'vue'
import Router from 'vue-router'
import FileMange from '#/FileMange/FileMange'
import VideoMange from '#/VideoMange/VideoMange'
import CaseMange from '#/CaseMange/CaseMange'
import SysMange from '#/SysMange/SysMange'
import FilePublish from '#/FilePublish/FilePublish'
import CasePublish from '#/CasePublish/CasePublish'
import VideoPublish from '#/VideoPublish/VideoPublish'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/FilePublish',
      // alias: '/'
    },
    {
      path: '/FilePublish',
      name: 'FilePublish',
      component: FilePublish
    },
    {
      path: '/FileMange',
      name: 'FileMange',
      component: FileMange
    },
    {
      path: '/CasePublish',
      name: 'CasePublish',
      component: CasePublish
    },
    {
      path: '/CaseMange',
      name: 'CaseMange',
      component: CaseMange
    },
    {
      path: '/VideoPublish',
      name: 'VideoPublish',
      component: VideoPublish
    },
    {
      path: '/VideoMange',
      name: 'VideoMange',
      component: VideoMange
    },
    {
      path: '/SysMange',
      name: 'SysMange',
      component: SysMange
    }

  ],
  linkActiveClass: 'active'
})
