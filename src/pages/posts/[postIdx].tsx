import { useQuery, useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/router"

export default function PostDetail() {
    const router = useRouter()
    const { postIdx } = router.query

    const { data: post, refetch } = useQuery({
        queryKey: ["post", postIdx],
        queryFn: async () => {
            const { data } = await axios.get(`/api/posts/${postIdx}`)
            return data
        },
        enabled: !!postIdx,
    })
    const deletePostMutation = useMutation({
        mutationFn: async (postIdx: number) =>
            await axios.delete(`/api/posts/${postIdx}`),
        onSuccess: () => refetch(),
    })
    const updatePostMutation = useMutation({
        mutationFn: async (postIdx: number) =>
            await axios.put(`/api/posts/${postIdx}`),
        onSuccess: () => refetch(),
    })
    const createCommentMutation = useMutation({
        mutationFn: async (newComment: { content: string }) =>
            await axios.post(`/api/posts/${postIdx}/comments`, newComment),
        onSuccess: () => refetch(),
    })

    const deleteCommentMutation = useMutation({
        mutationFn: async (commentIdx: number) =>
            await axios.delete(`/api/comments/${commentIdx}`),
        onSuccess: () => refetch(),
    })

    return (
        <div className='container mx-auto p-4'>
            <h1 className='text-2xl font-bold mb-4'>{post?.title}</h1>
            <p>{post?.content}</p>
            <button
                onClick={(e) => {
                    e.stopPropagation()
                    deletePostMutation.mutate(post.idx)
                }}
                className='bg-red-500 text-white py-1 px-2 rounded mt-2'
            >
                Delete
            </button>
            <button
                onClick={(e) => {
                    e.stopPropagation()
                    updatePostMutation.mutate(post.idx)
                }}
                className='bg-yellow-500 text-white py-1 px-2 rounded mt-2 ml-2'
            >
                Edit
            </button>
            <div className='mt-6'>
                <h2 className='text-xl font-semibold'>Comments</h2>
                <div className='space-y-4 mt-4'>
                    {post?.comments.map((comment: any) => (
                        <div key={comment.idx} className='border p-2 rounded'>
                            <p>{comment.content}</p>
                            <button
                                onClick={() =>
                                    deleteCommentMutation.mutate(comment.idx)
                                }
                                className='bg-red-500 text-white py-1 px-2 rounded mt-2'
                            >
                                Delete Comment
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className='mt-4'>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        createCommentMutation.mutate({
                            content: e.currentTarget.comment.value,
                        })
                        e.currentTarget.comment.value = ""
                    }}
                >
                    <textarea
                        name='comment'
                        className='border rounded w-full p-2 mb-2'
                        placeholder='Write a comment...'
                    />
                    <button
                        type='submit'
                        className='bg-blue-500 text-white py-2 px-4 rounded-md'
                    >
                        Post Comment
                    </button>
                </form>
            </div>
        </div>
    )
}
