const updateButton = document.querySelector('#update-button')
updateButton.addEventListener('click', _ => {
  // Send PUT Request here
  fetch('/users', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'tmtuan',
      password: 'tuan thai'
    })
  })
})

const deleteButton = document.querySelector('#delete-button')
deleteButton.addEventListener('click', _ => {
    fetch('/users', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'tmtuan'
      })
    })
      .then(res => {
        if (res.ok) return res.json()
      })
      .then(data => {
        window.location.reload()
      })
  })