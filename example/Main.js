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