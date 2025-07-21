/* eslint-disable @typescript-eslint/no-explicit-any */
import { Calendar, Archive, CalendarDays } from "lucide-react"

import CreatEventModal from "./components/events/CreateEventModal"
import type { IEvent } from "./types/event.type"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Card, CardContent } from "./components/ui/card"
import ActiveEventCard from "./components/events/ActiveEventCard"
import ArchivedEventCard from "./components/events/ArchivedEventCard"
import { toast } from "sonner"
import ActiveEventCardSkeleton from "./components/events/CardSkeleton"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./components/ui/select"
import { useState } from "react"

export default function App() {
  const [category, setCategory] = useState<string | null>("All")
  const { data: events = [], isLoading, refetch } = useQuery({
    queryKey: ["events", category],
    queryFn: async () => {
      const res = await axios(`${import.meta.env.VITE_API_URL}/events?type=${category === "All" ? "" : category}`)
      return res?.data?.data
    },
  })





  const deleteEvent = async (id: string) => {
    console.log('Delete event:', id)
    const toastId = toast.loading('Deleting event...')
    try {
      const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/events/${id}`)
      if (data.success) {
        refetch()
        toast.success('Event deleted successfully', { id: toastId })
      } else {
        throw new Error(data?.message || 'Error deleting event')
      }
      console.log(data)
    } catch (error: any) {
      toast.error(error?.message || 'Error deleting event', { id: toastId })
    }

  }

  const archiveEvent = async (id: string) => {
    const toastId = toast.loading('Archiving event...')
    try {
      const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/events/${id}`, {
        archived: true,
      })
      if (data.success) {
        refetch()
        toast.success('Event archived successfully', { id: toastId })
      } else {
        throw new Error(data?.message || 'Error archiving event')
      }
      console.log(data)
    } catch (error: any) {
      toast.error(error?.message || 'Error archiving event', { id: toastId })

    }

  }
  const activeEvents = events.filter((event: IEvent) => !event.archived)
  const archivedEvents = events.filter((event: IEvent) => event.archived)


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
            <CalendarDays className="w-10 h-10 text-blue-600" />
            Event Scheduler
          </h1>
          <p className="text-gray-600 text-lg">Organize your events with smart categorization</p>
        </div>

        {/* Add Event Button */}
        <div className="flex justify-center mb-8">
          <CreatEventModal refetch={refetch} />
        </div>



        {/* Active Events */}
        <div className="mb-8 ">
          <div className="flex justify-between items-center">

            <h2 className="text-2xl font-semibold text-gray-800 mb-10 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-blue-600" />
              Upcoming Events ({activeEvents.length})
            </h2>
            <div>
              <Select value={category!} onValueChange={setCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="cursor-pointer">
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Work">Work</SelectItem>
                  <SelectItem value="Personal">Personal</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            {/* Show skeletons when loading */}
            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <ActiveEventCardSkeleton key={i} />
                ))}
              </div>
            )}

            {/* Show "No upcoming events" if not loading and no events */}
            {!isLoading && activeEvents.length === 0 && (
              <Card className="text-center py-12 bg-white/60 backdrop-blur-sm border-dashed border-2 border-gray-300">
                <CardContent>
                  <CalendarDays className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No upcoming events</p>
                  <p className="text-gray-400">Create your first event to get started!</p>
                </CardContent>
              </Card>
            )}

            {/* Show event cards if not loading and events exist */}
            {!isLoading && activeEvents.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeEvents.map((event: IEvent) => (
                  <ActiveEventCard
                    key={event.id}
                    event={event}
                    archiveEvent={archiveEvent}
                    deleteEvent={deleteEvent}

                  />
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Archived Events */}
        {archivedEvents.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <Archive className="w-6 h-6 text-gray-600" />
              Archived Events ({archivedEvents.length})
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {archivedEvents.map((event: IEvent) => (
                <ArchivedEventCard key={event.id} event={event} deleteEvent={deleteEvent} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
