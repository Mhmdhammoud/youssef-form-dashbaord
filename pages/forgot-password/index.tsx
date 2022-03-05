import {LockClosedIcon} from '@heroicons/react/solid'
import {ErrorToast, Footer, Header, Notification, Wrapper} from '../../components'
import React, {useCallback, useEffect, useState} from 'react'
import Link from 'next/link'
import {useForgotPasswordMutation} from '../../src/generated/graphql'
import {useSelector} from 'react-redux'
import {AppState} from '../../reducers'
import {useRouter} from 'next/router'

const Index = () => {
	const router = useRouter()
	const [email, setEmail] = useState<string>('')
	const {isAuthenticated} = useSelector((state: AppState) => state.auth)
	useEffect(() => {
		if (isAuthenticated) {
			router.push('/')
		}
	}, [isAuthenticated, router])
	const handleChangeEmail = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value)
	}, [])
	const [showToast, setShowToast] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(false)
	const [showErrorToast, setShowErrorToast] = useState<boolean>(false)
	const [errorMessage, setErrorMessage] = useState<string>('')
	const [submitReset, {}] = useForgotPasswordMutation()

	const handleSubmit = useCallback((event: React.FormEvent) => {
		event.preventDefault()
		setLoading(true)
		submitReset({
			variables: {
				email: email,
			},
		}).then((res) => {
			//@ts-ignore
			if (res.data?.forgotPassword.errors) {
				setLoading(false)
				setErrorMessage(res.data?.forgotPassword.errors[0].message)
				setShowErrorToast(true)
			} else {
				setLoading(false)
				setShowToast(true)
			}
		}).catch(err => {
			console.log(err)
		})
	}, [email, submitReset])
	return (
		<>
			<Header />
			<div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-md w-full space-y-8'>
					<div>
						<img
							className='mx-auto h-12 w-auto'
							src='https://hassans.s3.eu-central-1.amazonaws.com/youssef/assets/logo.png'
							alt='Remote digital'
						/>
						<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Reset your password</h2>
					</div>
					<form className='mt-8 space-y-6' onSubmit={handleSubmit}>
						<input type='hidden' name='remember' defaultValue='true' />
						<div className='rounded-md shadow-sm -space-y-px'>
							<div>
								<label htmlFor='email-address' className='sr-only'>
									Email address
								</label>
								<input
									id='email-address'
									name='email'
									type='email'
									autoComplete='new-password'
									required
									onChange={handleChangeEmail}
									value={email}
									className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
									placeholder='Email address'
								/>
							</div>
						</div>

						<div className='flex items-center justify-between'>
							<div className='flex items-center'>
								<Link href='/sign-in'>
									<a className='font-medium text-indigo-600 hover:text-indigo-500'>
										Sign in instead.
									</a>
								</Link>
							</div>

							<div className='text-sm'>
								<Link href='/about-us'>
									<a className='font-medium text-indigo-600 hover:text-indigo-500'>
										Learn more about us here.
									</a>
								</Link>
							</div>
						</div>

						<div>
							<Wrapper loading={loading} full={false}>
								<button
									type='submit'
									className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
								>
                <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                  <LockClosedIcon className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400' aria-hidden='true' />
                </span>
									Reset password
								</button>
							</Wrapper>
						</div>
					</form>
				</div>
				<Notification setOpen={setShowToast} open={showToast} title={'Email sent!'}
											message={`An email with the reset password instructions was sent to ${email}, Please check your Junk/Spam folder in case you didn't find our email.`} />
				<ErrorToast show={showErrorToast} setShow={setShowErrorToast} message={errorMessage}
										title={'Forgot password'} />
			</div>
			<Footer />
		</>
	)
}

export default Index
