import { BriefcaseIcon } from '@heroicons/react/outline'
import React, { useContext, useEffect } from 'react'
import { Wrapper, Footer, Header } from '../../components'
import { NotificationsContext } from '../../context'
import notificationsService from '../../services/store.service'
const Index = () => {
  const people = [
    {
      name: 'Lindsay Walton',
      imageUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80',
    },
    {
      name: 'Lindsay Walton',
      imageUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80',
    },
    {
      name: 'Lindsay Walton',
      imageUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80',
    },
    // More people...
  ]
  const activityItems = [
    {
      id: 1,
      person: people[0],
      project: 'Workcation',
      commit: '2d89f0c8',
      environment: 'production',
      time: '1h',
    },
    {
      id: 2,
      person: people[0],
      project: 'Workcation',
      commit: '2d89f0c8',
      environment: 'production',
      time: '1h',
    },
    {
      id: 3,
      person: people[0],
      project: 'Workcation',
      commit: '2d89f0c8',
      environment: 'production',
      time: '1h',
    },
    {
      id: 3,
      person: people[0],
      project: 'Workcation',
      commit: '2d89f0c8',
      environment: 'production',
      time: '1h',
    },
    {
      id: 3,
      person: people[0],
      project: 'Workcation',
      commit: '2d89f0c8',
      environment: 'production',
      time: '1h',
    },
    {
      id: 3,
      person: people[0],
      project: 'Workcation',
      commit: '2d89f0c8',
      environment: 'production',
      time: '1h',
    },
    {
      id: 3,
      person: people[0],
      project: 'Workcation',
      commit: '2d89f0c8',
      environment: 'production',
      time: '1h',
    },
    {
      id: 3,
      person: people[0],
      project: 'Workcation',
      commit: '2d89f0c8',
      environment: 'production',
      time: '1h',
    },
    {
      id: 3,
      person: people[0],
      project: 'Workcation',
      commit: '2d89f0c8',
      environment: 'production',
      time: '1h',
    },
    {
      id: 3,
      person: people[0],
      project: 'Workcation',
      commit: '2d89f0c8',
      environment: 'production',
      time: '1h',
    },
    {
      id: 3,
      person: people[0],
      project: 'Workcation',
      commit: '2d89f0c8',
      environment: 'production',
      time: '1h',
    },
    {
      id: 3,
      person: people[0],
      project: 'Workcation',
      commit: '2d89f0c8',
      environment: 'production',
      time: '1h',
    },
    {
      id: 3,
      person: people[0],
      project: 'Workcation',
      commit: '2d89f0c8',
      environment: 'production',
      time: '1h',
    },
    {
      id: 3,
      person: people[0],
      project: 'Workcation',
      commit: '2d89f0c8',
      environment: 'production',
      time: '1h',
    },
    {
      id: 3,
      person: people[0],
      project: 'Workcation',
      commit: '2d89f0c8',
      environment: 'production',
      time: '1h',
    },
    {
      id: 3,
      person: people[0],
      project: 'Workcation',
      commit: '2d89f0c8',
      environment: 'production',
      time: '1h',
    },
    {
      id: 3,
      person: people[0],
      project: 'Workcation',
      commit: '2d89f0c8',
      environment: 'production',
      time: '1h',
    },
    {
      id: 3,
      person: people[0],
      project: 'Workcation',
      commit: '2d89f0c8',
      environment: 'production',
      time: '1h',
    },
    {
      id: 3,
      person: people[0],
      project: 'Workcation',
      commit: '2d89f0c8',
      environment: 'production',
      time: '1h',
    },
    {
      id: 3,
      person: people[0],
      project: 'Workcation',
      commit: '2d89f0c8',
      environment: 'production',
      time: '1h',
    },
    // More items...
  ]
  const { notifications, loading } = useContext(NotificationsContext)
  useEffect(() => {
    notificationsService.clearNotifications(notifications)
    return () => {
      notificationsService.clearNotifications(notifications)
    }
  }, [notifications])
  return (
    <React.Fragment>
      <Header />
      <Wrapper
        classes="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl pb-20 lg:max-w-4xl"
        loading={loading}
      >
        <div className="max-h-96 overflow-auto">
          <div className="shadow-inner h-2 w-full" />

          <ul role="list" className="divide-y divide-gray-200 px-4">
            {activityItems.map((activityItem) => (
              <li key={activityItem.id} className="py-4">
                <div className="flex space-x-3">
                  {/* <img
                    className="h-6 w-6 rounded-full"
                    src={activityItem.person.imageUrl}
                    alt=""
                  /> */}
                  <BriefcaseIcon className="w-6 h-6 text-gray-700" />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">
                        {activityItem.person.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {activityItem.time}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">
                      Deployed {activityItem.project} ({activityItem.commit} in
                      master) to {activityItem.environment}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Wrapper>
      <Footer />
    </React.Fragment>
  )
}

export default Index
