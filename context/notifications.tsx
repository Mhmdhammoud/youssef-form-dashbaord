import React, { createContext, useReducer } from 'react'
import { NotificationsActions, INotificationsState } from '../types'

const initialState: INotificationsState = {
  notifications: [],
  length: 0,
}

export const NotificationsContext =
  createContext<INotificationsState>(initialState)

const notificationsReducer = (
  state = initialState,
  action: NotificationsActions
): INotificationsState => {
  switch (action.type) {
    case 'INITIALIZE_NOTIFICATIONS':
      return {
        ...state,
        notifications: action.payload.notifications,
        length: action.payload.length,
      }
    case 'MARK_READ':
      return {
        ...state,
        length: 0,
      }
    default:
      return state
  }
}

export const NotificationsProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [state, dispatch] = useReducer(notificationsReducer, initialState)
  // TODO:
  // Add firebase here
  const initializeNotifications = (): void => {
    dispatch({
      type: 'INITIALIZE_NOTIFICATIONS',
      payload: {
        notifications: [],
        length: 0,
      },
    })
  }
  const markRead = (): void => {
    dispatch({
      type: 'MARK_READ',
    })
  }

  const value: INotificationsState = {
    notifications: state.notifications,
    length: state.length,
    initialize: initializeNotifications,
    markRead,
  }

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  )
}
