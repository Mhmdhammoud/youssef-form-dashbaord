import {
  CollectionReference,
  doc,
  getDocs,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore'
import { storeCollections } from '../utils'
import { INotification } from '../types'

class NotificationService {
  private readonly collectionRef: CollectionReference
  constructor() {
    const { NotificationsRef } = storeCollections()
    this.collectionRef = NotificationsRef
  }

  async snapShotEvents(cb: (docs: INotification[]) => void) {
    const q = query(this.collectionRef, orderBy('createdAt'))
    onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((item) => {
        return {
          id: item.id,
          ...item.data(),
        } as INotification
      })
      cb(docs)
    })
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
