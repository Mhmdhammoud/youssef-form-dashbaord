import React, { createContext, useCallback, useEffect, useReducer } from 'react'
import { NotificationsService } from '../services'
import { NotificationsActions, INotificationsState } from '../types'

const initialState: INotificationsState = {
  notifications: [],
  length: 0,
  loading: true,
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
        loading: false,
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
  const initializeNotifications = useCallback(() => {
    NotificationsService.getAll().then((notifications) => {
      const totalUnRead = notifications.reduce(
        (totalValue, currentItem) =>
          !currentItem.isRead
            ? (totalValue = totalValue + 1)
            : (totalValue += 0),
        0
      )
      dispatch({
        type: 'INITIALIZE_NOTIFICATIONS',
        payload: {
          notifications: notifications,
          length: totalUnRead,
        },
      })
    })
  }, [])

  useEffect(() => {
    initializeNotifications()
    return () => initializeNotifications()
  }, [initializeNotifications])
  const markRead = async () => {
    await NotificationsService.clearNotifications(state.notifications)
    dispatch({
      type: 'MARK_READ',
    })
  }

  const value: INotificationsState = {
    notifications: state.notifications,
    length: state.length,
    loading: state.loading,
    initialize: initializeNotifications,
    markRead,
  }

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  )
}
