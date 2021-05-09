我们有时候会遇到这种业务场景： 进入某个页面时，我们需要验证用户是否已经登陆，是否拥有足够权限？
我们可以通过监听路由的变化来实现。但是在react下，怎么实现呢？`react-router-watcher`为您提供了一种方案。

## 注意使用细节
  无论使用以下哪种方式，都必须放在Router组件的孩子节点中。
  使用之前，若不熟悉`react-router`，请最好先了解下[react-router](https://github.com/ReactTraining/react-router#readme)

## API

### ReactRouterWatcher
  ReactRouterWatcher是一个headless风格的组件，children必须是一个函数， 该函数的形式是：
```js
  ({
    addRouteChangeListener, // 作用是添加监听函数，接受一个监听函数作为参数
    removeRouteChangeListener // 作用是移除监听函数，接受一个监听函数作为参数
  }) => {
    // 必须返回一个react组件
    return SomeReactComponent
  }
```
使用方式：
```js
 <ReactRouterWatcher>
  {
    ({
      addRouteChangeListener, // 
      removeRouteChangeListener
    }) => {
      return <Main addRouteChangeListener={addRouteChangeListener} removeRouteChangeListener={removeRouteChangeListener}/>
    }
  }
</ReactRouterWatcher>
```

## 监听函数
监听函数形式如下：
```js
/**
 *   history, match, location // 这三个参数与调用react-router的withRouter注入的参数一致
 * @param history
 * @param match
 * @param location
**/
function({history, match, location}){

}

```

### withWatcher
withWatcher是一个高阶函数，接受一个React组件作为参数，返回一个新的react组件，这个新的组件将被自动注入addRouteChangeListener, removeRouteChangeListener两个属性
使用方式：
```js
const Content = withWatcher(Main)
```

### hook
```js
const Content = () => {
  const watcher = useRouteWatcher()
  return <Main addRouteChangeListener={watcher.addListener} removeRouteChangeListener={watcher.removeListener}/>
}

```
## 准备

假设存在一个Main.js组件：

```js
import {
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import {useCallback, useEffect, useState} from 'react'
import routes from './router/router'

const Main = ({addRouteChangeListener, removeRouteChangeListener}) => {
  const history = useHistory()
  const [active, setActive] = useState('foo')
  const setBar = useCallback(() => {
    if (active === 'bar') return
    setActive('bar')
    history.push('/bar')
  }, [active, history])
  const setFoo = useCallback(() => {
    if (active === 'foo') return
    setActive('foo')
    history.push('/foo')
  }, [active, history])

  const onRouteChange = useCallback((context) => {
    console.log('onRouteChange----c--context----s--', context)
  }, [])

  useEffect(() => {
    addRouteChangeListener(onRouteChange)
    return () => removeRouteChangeListener && removeRouteChangeListener(onRouteChange)
    // return () => {
    //   removeRouteChangeListener(onRouteChange)
    // }
  }, [addRouteChangeListener, onRouteChange, removeRouteChangeListener])

  return (
    <>
      <div  style={{height: 80, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <button style={active === 'foo' ? {color: 'blue', marginRight: 8} : {marginRight: 8}}  onClick={setFoo}>Foo</button>
        <button style={active === 'bar' ? {color: 'blue', marginRight: 8} : {marginRight: 8}} onClick={setBar}>Bar</button>
      </div>
      <Switch >
        {
          routes.map((item) => {
            const Component = item.component
            return (
              <Route path={item.url} key={item.url} exact >
                <Component />
              </Route>
            )
          })
        }
      </Switch>
    </>
  )
}

export default Main

```

## 方法一： 使用ReactRouterWatcher组件

```js
import {
  HashRouter as Router
} from "react-router-dom";
import ReactRouterWatcher from 'react-router-watcher'
import Main from './Main'
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <ReactRouterWatcher>
          {
            ({addRouteChangeListener, removeRouteChangeListener}) => {
              return <Main addRouteChangeListener={addRouteChangeListener} removeRouteChangeListener={removeRouteChangeListener}/>
            }
          }
        </ReactRouterWatcher>
      </div>
    </Router>
  );
}

```

## 方法二： 使用高阶函数withWatcher

```js
import {
  HashRouter as Router
} from "react-router-dom";
import { withWatcher } from 'react-router-watcher'
import Main from './Main'
import './App.css';

const Content = withWatcher(Main)

function App() {
  return (
    <Router>
      <div className="App">
        <Content />
      </div>
    </Router>
  );
}



export default App;
```

## 使用hook


```js
import { useCallback, useEffect } from 'react'
import {
  HashRouter as Router
} from "react-router-dom";
import useRouteWatcher from 'react-router-watcher/build/hook'
import Main from './Main'
import './App.css';

const Content = () => {
  const watcher = useRouteWatcher()
  return <Main addRouteChangeListener={watcher.addListener} removeRouteChangeListener={watcher.removeListener}/>
}

function App() {
  const watcher = useRouteWatcher()
  
  return (
    <Router>
      <div className="App">
        <Content />
      </div>
    </Router>
  );
}
```
