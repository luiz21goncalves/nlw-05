let socket_admin_id = null
let socket = null
let userEmail = null

document.querySelector('#start_chat').addEventListener('click', (event) => {
  socket = io()

  const chat_help = document.getElementById('chat_help')
  chat_help.style.display = 'none'

  const chat_in_support = document.getElementById('chat_in_support')
  chat_in_support.style.display = 'block'

  socket.on('connect', () => {
    const email = document.getElementById('email').value
    const text = document.getElementById('txt_help').value
    const params = { email, text }

    userEmail = email

    socket.emit('client_first_access', params, (call, err) => {
      if (err) {
        console.error('error', err)
      } else {
        console.log('call', call)
      }
    })

    socket.on('client_list_all_messages', messages => {
      const template_client = document.getElementById('message-user-template').innerHTML
      const template_admin = document.getElementById('admin-template').innerHTML

      messages.forEach(({ admin_id, text, user }) => {
        if (admin_id === null) {
          const rendered = Mustache.render(template_client, {
            message: text,
            email: user.email
          })

          document.getElementById('messages').innerHTML += rendered
        } else {
          const rendered = Mustache.render(template_admin, {
            message_admin: text
          })

          document.getElementById('messages').innerHTML += rendered
        }
      })
    })

    socket.on('admin_send_to_client', message => {
      socket_admin_id = message.socket_id
      const template_admin = document.getElementById('admin-template').innerHTML

      const rendered = Mustache.render(template_admin, {
        message_admin: message.text
      })

      document.getElementById('messages').innerHTML += rendered
    })
  })
})

document.querySelector('#send_message_button').addEventListener('click', () => {
  const text = document.getElementById('message_user')

  const params = {
    text: text.value,
    socket_admin_id
  }

  socket.emit('client_send_to_message', params)

  const template_client = document.getElementById('message-user-template').innerHTML

  const rendered = Mustache.render(template_client, {
    message: text.value,
    email: userEmail
  })

  document.getElementById('messages').innerHTML += rendered

  text.value = ''
})
