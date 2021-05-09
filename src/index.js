import React, { Component } from 'react'
import { withRouter } from 'react-router'

class ReactRouterWatcher extends Component{
  constructor(){
    super()
    this.listeners = []
    this.addRouteChangeListener = this.addRouteChangeListener.bind(this)
    this.removeRouteChangeListener = this.removeRouteChangeListener.bind(this)
  }

  addRouteChangeListener(listener){
    this.listeners.push(listener)
  }

  removeRouteChangeListener(listener) {
    const index = this.listeners.findIndex(item => item === listener)
    if (index >= 0) {
      this.listeners.splice(index, 1)
    }
  }

  componentDidUpdate(){
    this.execListeners()
  }

  componentDidMount(){
    this.execListeners()
  }

  execListeners(){
    this.listeners.forEach(func => {
      func({
        history: this.props.history,
        match: this.props.match,
        location: this.props.location
      })
    })

  }

  shouldComponentUpdate(nextProps){
    return nextProps.location.pathname !== this.props.location.pathname
  }
  
  render() {
    return this.props.children({ 
      addRouteChangeListener: this.addRouteChangeListener,
      removeRouteChangeListener: this.removeRouteChangeListener
    })
  }

}

const Watcher =  withRouter(ReactRouterWatcher)

export default Watcher

export const withWatcher = (TargetComponent) => {
  return (props) => (
    <Watcher>
      {
        ({addRouteChangeListener, removeRouteChangeListener}) => {
          return <TargetComponent 
            addRouteChangeListener={addRouteChangeListener} 
            removeRouteChangeListener={removeRouteChangeListener}
            {...props}
          />
        }
      }
    </Watcher>
  )
}