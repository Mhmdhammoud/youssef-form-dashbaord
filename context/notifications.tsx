import React, { createContext, useCallback, useEffect, useReducer } from 'react'
import { NotificationsService } from '../services'
import notificationsService from '../services/store.service'
import {
  INotification,
  INotificationsState,
  NotificationsActions,
} from '../types'

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

  const cb = (docs: INotification[]) => {
    const totalUnRead = docs.reduce(
      (totalValue, currentItem) =>
        !currentItem.isRead ? (totalValue = totalValue + 1) : (totalValue += 0),
      0
    )
    dispatch({
      type: 'INITIALIZE_NOTIFICATIONS',
      payload: {
        notifications: docs,
        length: totalUnRead,
      },
    })
  }
  useEffect(() => {
    notificationsService.snapShotEvents(cb)
  }, [])

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
    markRead,
  }

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  )
}
