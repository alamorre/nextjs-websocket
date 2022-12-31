import React, { useRef, useEffect, useState } from 'react'

var W3CWebSocket = require('websocket').w3cwebsocket

const WebSocketNext = (props) => {
  const didMountRef = useRef(false)
  const [ws, setWS] = useState(new W3CWebSocket(props.url))
  const [attempts, setAttempts] = useState(1)
  const [reconnect, setReconnect] = useState(props.reconnect)
  const [timeoutID, setTimeoutID] = useState(-1)

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true
      setupWebsocket()
    } else {
      return () => {
        setReconnect(false)
        clearTimeout(timeoutID)
        ws.close()
      }
    }
  }, [])

  const setupWebsocket = () => {
    ws.onopen = () => {
      if (typeof props.onOpen === 'function') props.onOpen()
    }
    ws.onerror = (e) => {
      if (typeof props.onError === 'function') props.onError(e)
    }
    ws.onmessage = (evt) => {
      props.onMessage(evt.data)
    }
    ws.onclose = (evt) => {
      if (typeof props.onClose === 'function') {
        props.onClose(evt.code, evt.reason)
      }
      if (reconnect) {
        const tid = setTimeout(() => {
          setAttempts(attempts + 1)
          setWS(new W3CWebSocket(props.url))
          setupWebsocket()
        }, 3000)
        setTimeoutID(tid)
      }
    }
  }

  return <div />
}

export { WebSocketNext }
