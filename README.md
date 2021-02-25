# nextjs-websocket

`nextjs-websocket` is a easy-to-use NextJS component for websocket communications.

## Notes

If you need me to build something, just raise an issue:)

This was a fork from react-websocket so s/o to the devs there :)

### Installing

```
npm install --save nextjs-websocket
```

### Usage

```js
import React from 'react'
import { Websocket } from 'nextjs-websocket'

class ProductDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 90
    }
  }

  handleData(data) {
    let result = JSON.parse(data)
    this.setState({ count: this.state.count + result.movement })
  }

  render() {
    return (
      <div>
        Count: <strong>{this.state.count}</strong>
        <Websocket
          url='ws://localhost:8888/live/product/12345/'
          onMessage={this.handleData.bind(this)}
        />
      </div>
    )
  }
}

export default ProductDetail
```

### Properties

#### url

**required**
The url the websocket connection is listening to.

#### onMessage

**required**
The callback called when data is received. Data is `JSON.parse`'d

#### onOpen

The callback called when the connection is successfully opened.

#### onClose

The callback called when the connection is closed either due to server disconnect or network error.

#### debug

default: **false**
Set to **true** to see console logging

#### reconnect

default: **true**

accelerated reconnection time

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fmehmetkose%2Fnextjs-websocket.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fmehmetkose%2Fnextjs-websocket?ref=badge_large)
