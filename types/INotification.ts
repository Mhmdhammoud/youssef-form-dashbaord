import { Company, Order, PrintJob } from '../src/generated/graphql'
import { NotificationType } from './enums'

export interface INotification {
  id?: string
  message: string
  type: NotificationType
  createdAt: string
  isRead: boolean
  order_id?: string
  print_id?: string
  company_id: string
  company_title: string
  company?: Company | null
  order?: Order | null
  print?: PrintJob | null
}
const MARK_READ = 'MARK_READ'
const INITIALIZE_NOTIFICATIONS = 'INITIALIZE_NOTIFICATIONS'
export interface IMarkReadNotifications {
  type: typeof MARK_READ
}
export interface IInitializeNotifications {
  type: typeof INITIALIZE_NOTIFICATIONS
  payload: {
    notifications: INotification[]
    length: number
  }
}
export interface INotificationsState {
  notifications: INotification[]
  length: number
  loading: boolean
  initialize?: () => void
  markRead?: () => void
}
export type NotificationsActions =
  | IInitializeNotifications
  | IMarkReadNotifications
