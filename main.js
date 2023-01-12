const input = document.querySelector('#searchInput')
const userList = document.querySelector('#users')

let users = []

window.addEventListener('DOMContentLoaded', async () => {
  userList.innerHTML = `Loading...`
  const data = await loadUsers()
  users = data.data
  renderUsers(users)
})

async function loadUsers() {
  const response = await fetch('https://fakerapi.it/api/v1/users?_quantity=10')
  return await response.json()
}

input.addEventListener('keyup', e => {
  const newUsers = users.filter(user =>
    `${user.firstname.toLowerCase()} ${user.lastname.toLowerCase()}`.includes(
      input.value.toLowerCase()
    )
  )
  renderUsers(newUsers)
})

const createUsersItems = users =>
  users
    .map(
      user => `
    <li class='bg-zinc-800 hover:bg-zinc-700 hover:cursor-pointer py-2'>${user.firstname} ${user.lastname}</li>
`
    )
    .join(' ')

function renderUsers(users) {
  const itemsString = createUsersItems(users)
  userList.innerHTML = itemsString
}
