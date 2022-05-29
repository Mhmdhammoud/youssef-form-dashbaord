import { useRouter } from 'next/router'
import React from 'react'
import { withRouter } from '../../hoc'
import { Wrapper, Header, Footer } from '../../components'
import { PaperClipIcon, DownloadIcon } from '@heroicons/react/solid'
import { useGetPrintJobQuery } from '../../src/generated/graphql'
import STLViewer from 'meritt-stl-viewer'
import Link from 'next/link'

const Index = () => {
  const router = useRouter()
  const { print_id } = router.query

  const { data, loading, error } = useGetPrintJobQuery({
    variables: {
      print_id: print_id as string,
    },
  })
  const printJob = data?.getPrintJob?.print_job
  return (
    <React.Fragment>
      <Header />
      <Wrapper loading={loading} classes="min-h-screen max-w-6xl mx-auto mt-6">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {printJob?.printId}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Print Job details and Information.
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Company</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {printJob?.company?.title}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Creator</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {printJob?.creator?.fullName}
                </dd>
              </div>

              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Print Title
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {printJob?.title}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Printer</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {printJob?.printer}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Print STL</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div className="relative">
                    <a
                      download={printJob?.print_stl}
                      href={printJob?.print_stl as string}
                      className="absolute top-0 right-0"
                    >
                      <DownloadIcon className=" h-5 w-5 text-gray-700" />
                    </a>
                    <STLViewer
                      url={printJob?.print_stl}
                      modelColor="rgb(115, 194, 251)"
                      backgroundColor={'#fff'}
                      rotate={true}
                      orbitControls={true}
                      model={printJob?.print_stl}
                    />
                  </div>
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Print Image
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div className="relative">
                    {printJob?.print_image && printJob?.print_image !== '' && (
                      <a
                        download={printJob?.print_image}
                        href={printJob?.print_image as string}
                        className="absolute top-0 right-0"
                      >
                        <DownloadIcon className=" h-5 w-5 text-gray-700" />
                      </a>
                    )}
                    <img
                      src={printJob?.print_image as string}
                      alt={`print Image ${print_id}`}
                      width={'200px'}
                      height={'200px'}
                    />
                  </div>
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Print File
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div className="relative">
                    {printJob?.print_file && printJob?.print_file !== '' && (
                      <div className="flex items-center justify-between  ">
                        <span>{printJob?.print_file.split('assets/')[1]}</span>
                        <a
                          download={printJob?.print_file}
                          href={printJob?.print_file as string}
                          className="absolute top-0 right-0"
                        >
                          <DownloadIcon className=" h-5 w-5 text-gray-700 cursor-pointer" />
                        </a>
                      </div>
                    )}
                  </div>
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Orders</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <ul
                    role="list"
                    className="border border-gray-200 rounded-md divide-y divide-gray-200"
                  >
                    {printJob?.orders?.map((item, index) => {
                      return (
                        <React.Fragment key={index}>
                          <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                            <div className="w-0 flex-1 flex items-center">
                              <span
                                className="ml-2 flex-1 w-0 truncate"
                                key={index}
                              >
                                <b>Color</b> :{' '}
                                {
                                  item?.order?.product[item?.ear.toLowerCase()]
                                    .color
                                }
                                <br />
                                <b>Shell ID</b> :{' '}
                                {
                                  item?.order?.product[item?.ear.toLowerCase()]
                                    .shellId
                                }
                              </span>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                              <Link
                                href={`/order?id=${
                                  item?.order?.orderId.split('_')[1]
                                }`}
                              >
                                <a className="font-medium text-indigo-600 hover:text-indigo-500">
                                  View Order
                                </a>
                              </Link>
                            </div>
                          </li>
                        </React.Fragment>
                      )
                    })}
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </Wrapper>
      <Footer />
    </React.Fragment>
  )
}

export default withRouter(Index)
