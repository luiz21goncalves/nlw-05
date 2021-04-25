const socket = io()
let connectionsUser = []

socket.on('admin_list_all_users', connections => {
  console.log('receive_admin_list_all_users', connections)
  connectionsUser = connections

  const template = document.getElementById('template').innerHTML

  connections.forEach((connection) => {
    const rendered = Mustache.render(template, {
      email: connection.user.email,
      id: connection.socket_id
    })

    document.getElementById('list_users').innerHTML += rendered
  })
})

function call (id) {
  const { user, user_id } = connectionsUser.find(findConnection => findConnection.socket_id === id)

  const template = document.getElementById('admin_template').innerHTML

  const rendered = Mustache.render(template, {
    email: user.email,
    id: user_id
  })

  document.getElementById('supports').innerHTML += rendered

  const params = { user_id }

  socket.emit('admin_user_in_support', params)

  socket.emit('admin_list_messages_by_user', params, (messages) => {
    const divMessages = document.getElementById(`allMessages${user_id}`)

    messages.forEach((message) => {
      const createDiv = document.createElement('div')

      if (message.admin_id === null) {
        createDiv.className = 'admin_message_client'

        createDiv.innerHTML = `<span>${user.email} </span>`
        createDiv.innerHTML += `<span>${message.text}</span>`
        createDiv.innerHTML += `
          <span class="admin_date">
            ${dayjs(message.created_at).format('DD/MM/YYYY HH:mm:ss')}
          </span>
        `
      } else {
        createDiv.className = 'admin_message_admin'

        createDiv.innerHTML = `Atendente: <span>${message.text}</span>`
        createDiv.innerHTML += `
          <span class="admin_date">
            ${dayjs(message.created_at).format('DD/MM/YYYY HH:mm:ss')}
          </span>
        `
      }

      divMessages.appendChild(createDiv)
    })
  })
}

function sendMessage (user_id) {
  const text = document.getElementById(`send_message_${user_id}`)

  const params = {
    text: text.value,
    user_id
  }

  socket.emit('admin_send_message', params)

  const divMessages = document.getElementById(`allMessages${user_id}`)

  const createDiv = document.createElement('div')
  createDiv.className = 'admin_message_admin'
  createDiv.innerHTML = `Atendente: <span>${params.text}</span>`
  createDiv.innerHTML += `
    <span class="admin_date">
      ${dayjs().format('DD/MM/YYYY HH:mm:ss')}
    </span>
  `

  divMessages.appendChild(createDiv)

  text.value = ''
}

socket.on('admin-receive-message', ({ message, user_id, email }) => {
  const divMessages = document.getElementById(`allMessages${user_id}`)
  const createDiv = document.createElement('div')
  createDiv.className = 'admin_message_client'

  createDiv.innerHTML = `<span>${email} </span>`
  createDiv.innerHTML += `<span>${message.text}</span>`
  createDiv.innerHTML += `
    <span class="admin_date">
      ${dayjs(message.created_at).format('DD/MM/YYYY HH:mm:ss')}
    </span>
  `
  divMessages.appendChild(createDiv)
})
