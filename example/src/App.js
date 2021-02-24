import React, { Component } from 'react'

import { WebSocket } from 'nextjs-websocket';

export default class App extends Component {
    handleEvent(event) {
        const { props } = this
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
            props.onNewMessage && props.onNewMessage(eventJSON.data.id, eventJSON.data.message)

        } else if (eventJSON.action === 'edit_message') {
            props.onEditMessage && props.onEditMessage(eventJSON.data.id, eventJSON.data.message)

        } else if (eventJSON.action === 'delete_message') {
            props.onDeleteMessage && props.onDeleteMessage(eventJSON.data.id, eventJSON.data.message)

        }
    }

    onClose() {
        this.props.onFailAuth && this.props.onFailAuth(this.props)
    }

    render() {
        const project = '92131855-e0e7-4c2c-83c4-d4e48a3be35b'
        const username = 'adam'
        const secret = 'pass1234'

        return <WebSocket 
            url={`ws://127.0.0.1:8000/person/?publicKey=${project}&username=${username}&secret=${secret}`}
            onOpen={() => console.log('Open Socket!!!')}
            onClose={this.onClose.bind(this)}
            onMessage={this.handleEvent.bind(this)}
        />
    }
}
