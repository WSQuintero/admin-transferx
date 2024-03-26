export const handleFilterAndOrder = (
  event,
  setOrderUsers,
  list,
  filterOption
) => {
  const searchText = event.target.value.toLowerCase()

  const filterFunctions = {
    name: (user) =>
      user.firstname.toLowerCase().includes(searchText) ||
      user.lastname.toLowerCase().includes(searchText),
    id: (user) => Number(user.id) === Number(searchText),
    tel: (user) => user.cellphone.includes(searchText),
    email: (user) => user.email.toLowerCase().includes(searchText),
    role: (user) => {
      const optionSelected = event.target.value
      if (optionSelected !== "optionSelected") {
        if (optionSelected !== "all") {
          return (
            user.role ===
            (optionSelected === "Usuario"
              ? 0
              : optionSelected === "Administrador"
              ? 1
              : 2)
          )
        } else {
          return true
        }
      }
    }
  }

  const filterFunction = filterFunctions[filterOption] || (() => true)
  const filteredUsers = list.filter(filterFunction)

  setOrderUsers(filteredUsers)
}

export const getMappedUsers = (orederUsers, list) => {
  return list?.length === orederUsers?.length ||
    orederUsers?.length === 0 ||
    orederUsers?.length === undefined ||
    orederUsers?.length === null
    ? list
    : orederUsers
}
