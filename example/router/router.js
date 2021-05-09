import React from 'react'

const getLazyComponent = (conf) => {
  if (!conf || !conf.path) return ''
  let { path } = conf
  path = path.trim()
  let Component = ''
  if (path.startsWith('../')) {
    Component = () => import(`../${path.substring(3)}`)
  } else if (path.startsWith('./')) {
    Component = () => import(`./${path.substring(2)}`)
  }

  Component = React.lazy(Component)
  return (
    <React.Suspense fallback={<div>加载中......</div>}> 
      <Component />
    </React.Suspense>
  )
}

const routeConf = [
  {
    path: '../components/Foo',
    url: '/foo'
  },{
    path: '../components/Bar',
    url: '/bar'
  },{
    path: '../components/Foo',
    url: '*'
  }
]

export default routeConf.map((item) => {
  return {...item, component: () => getLazyComponent(item)}
})