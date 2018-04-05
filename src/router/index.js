import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import healthBackground from '@/components/healthBackground'
import loadAvatar from '@/components/loadAvatar'
import avatarCreation from "@/components/avatarCreation"


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/healthBackground',
      name: 'healthBackground',
      component: healthBackground
    },
    {
      path: '/loadAvatar',
      name: 'loadAvatar',
      component: loadAvatar
    },
    {
      path: '/avatarCreation',
      name: 'avatarCreation',
      component: avatarCreation
    },

  ]
})
