/* eslint-disable */
const viewsAbout = resolve => require(['../views/About'], resolve)
const viewsindex = resolve => require(['../views/index'], resolve)
export const routes = [
  {
    name: "About",
    path: "/About",
    component: viewsAbout
  },
  {
    name: "index",
    path: "/",
    component: viewsindex
  }
]