import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/router"

export default function Home() {
    const router = useRouter()
    const me = useQuery({
        queryKey: ["me"],
        queryFn: async () => await axios.get("/api/me"),
    })

    const logoutMutation = useMutation({
        mutationFn: async () => await axios.post("/api/logout"),
        onSuccess: () => {
            me.refetch()
            window.location.reload()
        },
    })
    const loginMutation = useMutation({
        mutationFn: async ({ nickname, password }: any) =>
            await axios.post("/api/login", {
                nickname,
                password,
            }),
        onSuccess: () => {
            me.refetch()
            router.push("/posts")
        },
    })
    const signUpMutation = useMutation({
        mutationFn: async ({ nickname, password }: any) =>
            await axios.post("/api/signUp", {
                nickname,
                password,
            }),
        onSuccess: () => me.refetch(),
    })

    const login = (e: any) => {
        e.preventDefault()
        loginMutation.mutate({
            nickname: e.currentTarget.nickname.value,
            password: e.currentTarget.password.value,
        })
    }
    const signUp = (e: any) => {
        e.preventDefault()
        signUpMutation.mutate({
            nickname: e.currentTarget.nickname.value,
            password: e.currentTarget.password.value,
        })
    }
    const logout = () => logoutMutation.mutate()
    return (
        <div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
            <div className='bg-white p-8 rounded-xl shadow-md max-w-md w-full'>
                <p className='text-center text-2xl font-semibold mb-6 text-gray-800'>
                    Welcome Back!
                </p>
                {me.data?.data ? (
                    <div>
                        <p className='text-center text-lg mb-4 text-gray-600'>
                            Logged in as:{" "}
                            <strong>{me.data?.data.nickname}</strong>
                        </p>
                        <div className='mt-4'>
                            <button
                                onClick={logout}
                                className='w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <form onSubmit={login} className='space-y-4'>
                            <div>
                                <label
                                    htmlFor='nickname'
                                    className='block text-sm font-medium text-gray-700'
                                >
                                    Nickname
                                </label>
                                <input
                                    type='text'
                                    id='nickname'
                                    name='nickname'
                                    placeholder='Enter your nickname'
                                    className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor='password'
                                    className='block text-sm font-medium text-gray-700'
                                >
                                    Password
                                </label>
                                <input
                                    type='password'
                                    id='password'
                                    name='password'
                                    placeholder='Enter your password'
                                    className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                />
                            </div>
                            <button
                                type='submit'
                                className='w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                            >
                                Log In
                            </button>
                        </form>
                        <div className='mt-8 text-center text-gray-600'>
                            <p>Don't have an account? Sign up below!</p>
                        </div>
                        <form onSubmit={signUp} className='mt-4 space-y-4'>
                            <div>
                                <label
                                    htmlFor='nickname'
                                    className='block text-sm font-medium text-gray-700'
                                >
                                    Nickname
                                </label>
                                <input
                                    type='text'
                                    id='nickname'
                                    name='nickname'
                                    placeholder='Choose a nickname'
                                    className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor='password'
                                    className='block text-sm font-medium text-gray-700'
                                >
                                    Password
                                </label>
                                <input
                                    type='password'
                                    id='password'
                                    name='password'
                                    placeholder='Choose a password'
                                    className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                />
                            </div>
                            <button
                                type='submit'
                                className='w-full bg-green-500 text-white py-2 px-4 rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                            >
                                Sign Up
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    )
}
