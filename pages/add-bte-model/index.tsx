import React, { useState, useCallback } from 'react'
import { withRouter } from '../../hoc'
import {
  Header,
  Footer,
  Wrapper,
  Notification,
  OrderLayout,
  Select,
  Uploader,
} from '../../components'
import {
  CreateBteInput,
  useCreateBteModelMutation,
} from '../../src/generated/graphql'
import { INotification, IToast } from '../../types'
import { AllColors, soundTubeColor } from '../../data'
import { useUpload } from '../../hooks'
import Image from 'next/image'
import classNames from 'classnames'
import { XIcon } from '@heroicons/react/outline'

const Index = () => {
  const [bteModel, setBteModel] = useState<CreateBteInput>({
    title: '',
    sound_tube_color: '',
    mould_colour: '',
    image: '',
    //@ts-ignore
    material: '',
    //@ts-ignore
    bioporShore: '',
  })

  const [notificationOpen, setNotificationOpen] = useState<boolean>(false)
  const [notificationData, setNotificationData] = useState<IToast>({
    message: '',
    variant: 'success',
    title: '',
  })

  const { handleUpload } = useUpload()

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { id, value } = event.target
      setBteModel((prevState) => ({
        ...prevState,
        [id]: value,
      }))
    },
    []
  )

  const isDisabled = Boolean(
    bteModel?.title === '' ||
      bteModel?.sound_tube_color === '' ||
      bteModel?.mould_colour === '' ||
      bteModel?.image === ''
  )

  const handleReset = useCallback(() => {
    setBteModel({
      title: '',
      sound_tube_color: '',
      mould_colour: '',
      image: '',
      //@ts-ignore
      material: '',
      //@ts-ignore
      bioporShore: '',
    })
  }, [])

  const [submit, { loading }] = useCreateBteModelMutation()

  const handleSubmit = useCallback(() => {
    submit({
      variables: {
        input: {
          title: bteModel.title,
          sound_tube_color: bteModel.sound_tube_color,
          mould_colour: bteModel.mould_colour,
          image: bteModel.image,
        },
      },
    })
      .then((res) => {
        console.log(res)
        if (
          res?.data?.createBteModel?.errors &&
          res?.data?.createBteModel?.errors?.length > 0
        ) {
          setNotificationData({
            message: 'Something went wrong',
            variant: 'error',
            title: 'Error',
          })
          setNotificationOpen(true)
        } else {
          setNotificationData({
            message: 'BTE Model created successfully',
            variant: 'success',
            title: 'Success',
          })
          setNotificationOpen(true)
        }
      })
      .catch((err) => {
        console.log(err)
        setNotificationData({
          message: 'Something went wrong',
          variant: 'error',
          title: 'Error',
        })
        setNotificationOpen(true)
      })
      .finally(() => {
        setNotificationOpen(false)
        handleReset()
      })
  }, [bteModel, submit, handleReset])

  return (
    <React.Fragment>
      <Header />
      <Wrapper classes="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl pb-20 lg:max-w-5xl">
        <form
          className="space-y-8 divide-y divide-gray-200"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="space-y-8 divide-y divide-gray-200">
            <div className="pt-8">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  BTE Model Information
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Use this form to add a new BTE Model.
                </p>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      autoComplete="title"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      value={bteModel.title}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="col-span-3" />

                <div className="col-span-6">
                  {/*Material starts here*/}
                  <label
                    htmlFor="material"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Material
                  </label>

                  <Select
                    id="material"
                    direction="binaural"
                    options={['biopor', 'fototec']}
                    onChange={handleChange}
                    //@ts-ignore
                    value={bteModel?.material}
                  />

                  {/* @ts-ignore */}
                  {bteModel.material === 'biopor' && (
                    <div className="mt-3">
                      <label
                        htmlFor="color"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Biopor Shore
                      </label>
                      <Select
                        id="bioporShore"
                        direction="binaural"
                        options={['25 Shore A', '40 Shore A', '60 Shore A']}
                        onChange={handleChange}
                        //@ts-ignore
                        value={bteModel?.bioporShore}
                      />
                    </div>
                  )}

                  {/*Material ends here*/}
                </div>

                <div className="sm:col-span-3">
                  {/* @ts-ignore */}
                  {bteModel?.material !== '' && (
                    <label
                      htmlFor="mould_colour"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Color
                    </label>
                  )}
                  <div className="mt-1">
                    {/* @ts-ignore */}
                    {bteModel.material === 'fototec' && (
                      <select
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none sm:text-sm "
                        id={'mould_colour'}
                        onChange={handleChange}
                        style={{
                          backgroundColor:
                            AllColors.fototec.find(
                              (item) => item.label === bteModel?.mould_colour
                            ) &&
                            AllColors.fototec.find(
                              (item) => item.label === bteModel?.mould_colour
                            )?.color,
                        }}
                      >
                        <React.Fragment>
                          <option selected hidden>
                            Select an option
                          </option>
                          {AllColors.fototec.map((item, index) => (
                            <option
                              value={item?.label}
                              key={index}
                              style={{
                                backgroundColor: item?.color,
                              }}
                              className={'text-white'}
                            >
                              {item?.label}
                            </option>
                          ))}
                        </React.Fragment>
                      </select>
                    )}
                    {/* @ts-ignore */}
                    {bteModel.material === 'biopor' && (
                      <>
                        {/* @ts-ignore */}
                        {bteModel.bioporShore === '25 Shore A' && (
                          <select
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none sm:text-sm "
                            id={'mould_colour'}
                            onChange={handleChange}
                            style={{
                              backgroundColor:
                                AllColors.biopor[0]['25shore'].find(
                                  (item) =>
                                    item.label === bteModel?.mould_colour
                                ) &&
                                AllColors.biopor[0]['25shore'].find(
                                  (item) =>
                                    item.label === bteModel?.mould_colour
                                )?.color,
                            }}
                          >
                            <option selected hidden>
                              Select an option
                            </option>
                            {AllColors.biopor[0]['25shore'].map(
                              (item, index) => (
                                <option
                                  value={item?.label}
                                  key={index}
                                  style={{
                                    backgroundColor: item?.color,
                                  }}
                                >
                                  {item?.label}
                                </option>
                              )
                            )}
                          </select>
                        )}
                        {/* @ts-ignore */}
                        {bteModel.bioporShore === '40 Shore A' && (
                          <select
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none sm:text-sm "
                            id={'mould_colour'}
                            onChange={handleChange}
                            style={{
                              backgroundColor:
                                AllColors.biopor[1]['40shore'].find(
                                  (item) =>
                                    item.label === bteModel?.mould_colour
                                ) &&
                                AllColors.biopor[1]['40shore'].find(
                                  (item) =>
                                    item.label === bteModel?.mould_colour
                                )?.color,
                            }}
                          >
                            <option selected hidden>
                              Select an option
                            </option>
                            {AllColors.biopor[1]['40shore'].map(
                              (item, index) => (
                                <option
                                  value={item?.label}
                                  key={index}
                                  style={{
                                    backgroundColor: item?.color,
                                  }}
                                >
                                  {item?.label}
                                </option>
                              )
                            )}
                          </select>
                        )}
                        {/* @ts-ignore */}
                        {bteModel.bioporShore === '60 Shore A' && (
                          <select
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none sm:text-sm "
                            id={'mould_colour'}
                            onChange={handleChange}
                            style={{
                              //@ts-ignore
                              backgroundColor:
                                AllColors.biopor[2]['60shore'].find(
                                  (item) =>
                                    item.label === bteModel?.mould_colour
                                ) &&
                                AllColors.biopor[2]['60shore'].find(
                                  (item) =>
                                    item.label === bteModel?.mould_colour
                                )?.color,
                            }}
                          >
                            <option selected hidden>
                              Select an option
                            </option>
                            {AllColors.biopor[2]['60shore'].map(
                              (item, index) => (
                                <option
                                  value={item?.label}
                                  key={index}
                                  style={{
                                    backgroundColor: item?.color,
                                  }}
                                >
                                  {item?.label}
                                </option>
                              )
                            )}
                          </select>
                        )}
                      </>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="sound_tube_color"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Sound Tube Color
                  </label>
                  <div className="mt-1">
                    <Select
                      id="sound_tube_color"
                      onChange={handleChange}
                      options={soundTubeColor.map((item) => item.label)}
                      value={bteModel?.sound_tube_color}
                      optionBackgrounds={soundTubeColor}
                      selectStyles={{
                        backgroundColor:
                          soundTubeColor.find(
                            (item) => item.label === bteModel?.sound_tube_color
                          ) &&
                          soundTubeColor.find(
                            (item) => item.label === bteModel?.sound_tube_color
                          )?.color,
                      }}
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Image
                  </label>
                  <div className="mt-1">
                    <Uploader
                      onChange={(e) =>
                        //@ts-ignore
                        handleUpload(e)
                          .then((file) => {
                            setBteModel((prevState) => ({
                              ...prevState,
                              image: file!,
                            }))
                          })
                          .catch((err) => {
                            if (err.response) console.log(err.response.data)
                            else console.log(err)
                          })
                      }
                      id="image"
                      variant="svg"
                      accept="image"
                      text="Upload Image"
                    />
                  </div>
                </div>

                <div className="col-span-6 flex justify-end">
                  {bteModel?.image !== '' && (
                    <div className="relative">
                      <div className="absolute top-0 right-0">
                        <XIcon
                          className="text-white bg-indigo-500 h-6 w-6 rounded-md cursor-pointer"
                          onClick={() =>
                            setBteModel((prevState) => ({
                              ...prevState,
                              image: '',
                            }))
                          }
                        />
                      </div>
                      <img
                        src={bteModel?.image}
                        width={200}
                        height={200}
                        alt="BTE Image"
                        className="rounded-md border border-indigo-500"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleReset}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="button"
                className={classNames(
                  'ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2',
                  isDisabled
                    ? 'bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 cursor-pointer'
                )}
                disabled={isDisabled}
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </form>
        <Notification
          open={notificationOpen}
          setOpen={setNotificationOpen}
          message={notificationData.message}
          title={notificationData.title}
          variant={notificationData.variant}
        />
      </Wrapper>
      <Footer />
    </React.Fragment>
  )
}

export default withRouter(Index)
