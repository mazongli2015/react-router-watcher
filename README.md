我们有时候会遇到这种业务场景： 进入某个页面时，我们需要验证用户是否已经登陆，是否拥有足够权限？
我们可以通过监听路由的变化来实现。但是在react下，怎么实现呢？`react-router-watcher`为您提供了一种方案。

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

```js

## 方法二： 使用高阶函数

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
```js


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
  const onRouteChange = useCallback((context) => {
    console.log('onRouteChange---c----use hook-----', context)
  }, [])

  useEffect(() => {
    watcher.addListener(onRouteChange)
    return () => {
      watcher.removeListener(onRouteChange)
    }
  }, [watcher, onRouteChange])

  return <Main />
}

function App() {
  return (
    <Router>
      <div className="App">
        <Content />
      </div>
    </Router>
  );
}
```js
