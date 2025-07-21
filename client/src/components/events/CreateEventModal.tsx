/* eslint-disable @typescript-eslint/no-explicit-any */


import { useState } from 'react'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form'
import axios from 'axios'
import { toast } from 'sonner'


const formSchema = z
    .object({
        title: z.string().min(1, 'Title is required'),
        date: z.string().min(1, 'Date is required'),
        time: z.string().min(1, 'Time is required'),
        notes: z.string().optional(),
    })
    .refine((data) => {
        const selectedDateTime = new Date(`${data.date}T${data.time}`)
        const now = new Date()
        return selectedDateTime > now
    }, {
        message: 'Date and time must be in the future',
        path: ['time'],
    })

type EventFormValues = z.infer<typeof formSchema>

export default function CreatEventModal({ refetch }: { refetch: () => void }) {
    const [openModal, setOpenModal] = useState(false)

    const form = useForm<EventFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            date: '',
            time: '',
            notes: '',
        },
    })
    const { formState: { isSubmitting } } = form


    const onSubmit = async (data: EventFormValues) => {
        console.log('Event submitted:', data)
        setOpenModal(true)
        try {
            const { data: result } = await axios.post(`${import.meta.env.VITE_API_URL}/events`, data)
            if (result.success) {
                refetch()
                toast.success('Event created successfully')
            } else {
                throw new Error(result?.message || 'Error creating event')
            }
        } catch (error: any) {
            toast.error(error?.message || 'Error creating event')
            console.log(error)
        } finally {
            setOpenModal(false)
            form.reset()
        }

    }

    return (
        <>
            <Button onClick={() => setOpenModal(true)}>
                <Plus className="w-5 h-5 mr-2" />
                Add New Event
            </Button>

            <div
                onClick={() => setOpenModal(false)}
                className={`fixed z-[100] w-screen ${openModal ? 'visible opacity-100' : 'invisible opacity-0'} inset-0 grid place-items-center bg-black/20 backdrop-blur-xs duration-100 dark:bg-transparent`}
            >
                <div
                    onClick={(e_) => e_.stopPropagation()}
                    className={`absolute max-w-md w-full rounded-lg bg-white p-6 drop-shadow-lg dark:bg-zinc-900 dark:text-white ${openModal ? 'opacity-100 duration-300' : 'scale-110 opacity-0 duration-150'}`}
                >
                    <svg
                        onClick={() => setOpenModal(false)}
                        className="absolute right-3 top-3 w-6 cursor-pointer fill-zinc-600 dark:fill-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"></path>
                    </svg>

                    <h2 className="text-2xl font-semibold mb-4">Add New Event</h2>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Meeting with client" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Date</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="time"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Time</FormLabel>
                                        <FormControl>
                                            <Input type="time" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="notes"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Notes</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Optional notes..." {...field} />
                                        </FormControl>
                                        <FormDescription>Any additional information</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-end pt-2">
                                <Button disabled={isSubmitting} type="submit">{isSubmitting ? 'Creating.....' : 'Create Event'}</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </>
    )
}
