import {
  CollectionReference,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore'
import { storeCollections } from '../utils'
import { INotification } from '../types'

class NotificationService {
  private readonly collectionRef: CollectionReference
  constructor() {
    const { NotificationsRef } = storeCollections()
    this.collectionRef = NotificationsRef
  }

  async getAll(): Promise<INotification[]> {
    const docs = (await getDocs(this.collectionRef)).docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }))

    return docs as unknown as INotification[]
  }

  async clearNotifications(payload: INotification[]): Promise<void[]> {
    return Promise.all(
      payload.map(async (item) => {
        const docRef = doc(this.collectionRef, item.id)
        return await updateDoc(docRef, {
          isRead: true,
        })
      })
    )
  }
}
const notificationsService = new NotificationService()
export default notificationsService
