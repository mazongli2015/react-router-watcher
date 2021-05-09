/*
**使用ReactRouterWatcher组件
*/

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


/**
 * 使用高阶函数
 */
/*
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
*/

/**
 * 使用hook
 */
/*
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
*/

export default App;
