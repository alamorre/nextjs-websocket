import { FunctionPrimitive } from '@xenopomp/advanced-types'
import { ComponentProps } from 'react'

export type WebSocketProps = {
  /** The url the websocket connection is listening to. */
  url: string

  /** The callback called when data is received. Data is JSON.parse'd */
  onMessage: (data: string) => any

  /** The callback called when the connection is successfully opened. */
  onOpen?: FunctionPrimitive

  /** The callback called when error is appeared during WS cycle. */
  onError?: (error: Error) => any

  /** The callback called when the connection is closed either due to server disconnect or network error. */
  onClose?: FunctionPrimitive

  /**
   * Set to **true** to see console logging.
   * @default false
   */
  debug?: boolean

  /**
   * Set to **false** to disable reconnecting.
   * @default true
   */
  reconnect?: boolean
} & {
  reconnect: true
  reconnectIntervalInMilliSeconds: number
} & {
  reconnect: false
} & ComponentProps<'div'>
