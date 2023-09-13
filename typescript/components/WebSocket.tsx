import React, { FC } from 'react'

import { WebSocketProps } from '../types/WebSocket.props'

const WebSocket: FC<WebSocketProps> = (props) => {
  return <div {...props} />
}

export default WebSocket
