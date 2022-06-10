import {
  collection,
  CollectionReference,
  DocumentData,
} from 'firebase/firestore'
import { FireStore } from '../lib'
import { Collections } from '../types'

const storeCollections = (): Record<
  Collections,
  CollectionReference<DocumentData>
> => {
  const NotificationsRef = collection(FireStore, 'Notifications')
  return {
    NotificationsRef: NotificationsRef,
  }
}
export default storeCollections
