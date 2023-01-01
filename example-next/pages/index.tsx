import { useState } from 'react'
import { WebSocketNext } from 'nextjs-websocket'

const App = (props: any) => {
  const [count, setCount] = useState(3000)
  const handleEvent = (event: any) => {
    console.log('event.data', event.data)
    const eventJSON = JSON.parse(event.data)

    if (eventJSON.action === 'login_error') {
      console.log(
        `Your login credentials were not correct: \n
              Project ID: ${props.projectID} \n
              Username: ${props.userName} \n
              User Secret: ${props.userSecret}\n
              Double check these credentials to make sure they're correct.\n
              If all three are correct, try resetting the username and secret in the Online Dashboard or Private API.`
      )
    } else if (eventJSON.action === 'is_typing') {
      props.onTyping && props.onTyping(eventJSON.data.id, eventJSON.data.person)
    } else if (eventJSON.action === 'new_chat') {
      props.onNewChat && props.onNewChat(eventJSON.data)
    } else if (eventJSON.action === 'edit_chat') {
      props.onEditChat && props.onEditChat(eventJSON.data)
    } else if (eventJSON.action === 'delete_chat') {
      props.onDeleteChat && props.onDeleteChat(eventJSON.data)
    } else if (eventJSON.action === 'add_person') {
      props.onAddPerson && props.onAddPerson(eventJSON.data)
    } else if (eventJSON.action === 'remove_person') {
      props.onRemovePerson && props.onRemovePerson(eventJSON.data)
    } else if (eventJSON.action === 'new_message') {
      props.onNewMessage &&
        props.onNewMessage(eventJSON.data.id, eventJSON.data.message)
    } else if (eventJSON.action === 'edit_message') {
      props.onEditMessage &&
        props.onEditMessage(eventJSON.data.id, eventJSON.data.message)
    } else if (eventJSON.action === 'delete_message') {
      props.onDeleteMessage &&
        props.onDeleteMessage(eventJSON.data.id, eventJSON.data.message)
    }
  }

  const onClose = () => {
    console.log('Closed socket.')
    props.onFailAuth && props.onFailAuth(props)
  }

  const sessionToken = 'st-6e973176-cffd-4d54-8d3c-3a6372867929'

  return (
    <>
      <button onClick={() => setCount(count + 1)}>Toggle socket</button>

      <WebSocketNext
        reconnect={true}
        reconnectIntervalInMilliSeconds={count}
        url={`wss://api.chatengine.io/person_v4/?session_token=${sessionToken}`}
        onOpen={() => console.log('Open socket ', count)}
        onClose={onClose.bind(this)}
        onMessage={handleEvent.bind(this)}
      />
    </>
  )
}

export default App
