import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"

export default function ValidateResetCode() {
    const router = useRouter()
    const [isValid, setIsValid] = useState(false)
    const { email } = router.query

    const validateResetCode = useMutation({
        mutationFn: async ({ email, resetCode }: any) =>
            await axios.post("/api/validateResetCode", {
                email,
                resetCode,
            }),
        onSuccess: () => {
            setIsValid(true)
        },
    })
    const resetPasswordMutation = useMutation({
        mutationFn: async ({ email, resetCode, newPassword }: any) =>
            await axios.post("/api/resetPassword", {
                email,
                resetCode,
                newPassword,
            }),
        onSuccess: () => {
            router.push("/login")
        },
    })

    const handleResetCode = (e: any) => {
        e.preventDefault()
        if (isValid === false) {
            validateResetCode.mutate({
                email,
                resetCode: e.currentTarget.resetCode.value,
            })
        } else {
            resetPasswordMutation.mutate({
                email,
                resetCode: e.currentTarget.resetCode.value,
                newPassword: e.currentTarget.password.value,
            })
        }
    }

    return (
        <div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
            <div className='bg-white p-8 rounded-xl shadow-md max-w-md w-full'>
                <form onSubmit={handleResetCode} className='space-y-4'>
                    <h2 className='text-center text-2xl font-semibold'>
                        Validate Code
                    </h2>
                    <div>
                        <label htmlFor='resetCode' className='block text-sm'>
                            Code
                        </label>
                        <input
                            type='resetCode'
                            id='resetCode'
                            name='resetCode'
                            className='mt-1 block w-full'
                        />
                    </div>
                    {isValid === true ? (
                        <>
                            <div>
                                <label
                                    htmlFor='password'
                                    className='block text-sm'
                                >
                                    Password
                                </label>
                                <input
                                    type='password'
                                    id='password'
                                    name='password'
                                    className='mt-1 block w-full'
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor='checkPasword'
                                    className='block text-sm'
                                >
                                    Check password
                                </label>
                                <input
                                    type='checkPasword'
                                    id='checkPasword'
                                    name='checkPasword'
                                    className='mt-1 block w-full'
                                />
                            </div>
                        </>
                    ) : null}
                    <button
                        type='submit'
                        className='w-full bg-indigo-600 text-white py-2'
                    >
                        {isValid === true ? "Change Password" : "Confirm Code"}
                    </button>
                </form>
            </div>
        </div>
    )
}
