import { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import { useLocation, useHistory, useRouteMatch } from 'react-router'

const useWatcher = () => {
  const location = useLocation()
  const history = useHistory()
  const match = useRouteMatch()
  const [pathname, setPathname] = useState('')
  const listeners = useRef([])
  

  const addListener = useCallback((listener) => {
    listeners.current.push(listener)
  }, [])

  const removeListener = useCallback((listener) => {
    const index = listeners.current.findIndex(item => item === listener)
    if (index >= 0) {
      listeners.current.splice(index, 1)
    }
  }, [])

  const execListeners = useCallback(() => {
    listeners.current.forEach(func => {
      func({
        history,
        match,
        location
      })
    })

  }, [history, match, location])

  useEffect(() => {
    if (pathname !== location.pathname) {
      execListeners()
      setPathname(pathname)
    }
  }, [location, execListeners, pathname])

  const watcher = useMemo(() => {
    return {
      removeListener, addListener
    }
  }, [removeListener, addListener])

  return watcher
}

export default useWatcher