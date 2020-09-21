import apiUrl from '../apiConfig'
import axios from 'axios'

export const menuCreate = (menu, user) => {
  return axios({
    headers: {
      'Authorization': `Token ${user.token}`
    },
    url: apiUrl + '/menus/',
    method: 'POST',
    data: {
      menu: {
        date: menu.date,
        breakfast: menu.breakfast,
        lunch: menu.lunch,
        snack: menu.snack,
        dinner: menu.dinner
      }
    }
  })
}
export const index = (menu, user) => {
  return axios({
    headers: {
      'Authorization': `Token ${user.token}`
    },
    url: apiUrl + '/menus/',
    method: 'GET',
    data: {
      menu: {
        date: menu.date,
        breakfast: menu.breakfast,
        lunch: menu.lunch,
        snack: menu.snack,
        dinner: menu.dinner
      }
    }
  })
}
export const show = (id, user) => {
  return axios({
    headers: {
      'Authorization': `Token ${user.token}`
    },
    url: apiUrl + '/menus/' + id + '/',
    method: 'GET'
  })
}
export const menuDelete = (id, user) => {
  return axios({
    headers: {
      'Authorization': `Token ${user.token}`
    },
    url: apiUrl + '/menus/' + id + '/',
    method: 'DELETE'
  })
}
export const menuEdit = (id, user, data) => {
  return axios({
    headers: {
      'Authorization': `Token ${user.token}`
    },
    url: apiUrl + '/menus/' + id + '/',
    method: 'PATCH',
    data: {
      menu: {
        date: data.menu.date,
        breakfast: data.menu.breakfast,
        lunch: data.menu.lunch,
        snack: data.menu.snack,
        dinner: data.menu.dinner
      }
    }
  })
}
