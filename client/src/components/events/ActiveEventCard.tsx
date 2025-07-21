import type { IEvent } from '../../types/event.type'
import { Badge } from '../ui/badge'
import { format } from "date-fns"
import { Archive, Calendar, Clock, Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import { getCategoryColor } from '../utils/getCategorycolor'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

interface IProps {
    event: IEvent
    archiveEvent: (id: string) => void
    deleteEvent: (id: string) => void


}
export default function ActiveEventCard({ event, archiveEvent, deleteEvent }: IProps) {
    return (
        <Card
            key={event.id}
            className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/80 backdrop-blur-sm border shadow-lg"
        >
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-semibold text-gray-800 line-clamp-2">{event.title}</CardTitle>
                    <Badge className={`${getCategoryColor(event.category)} text-xs font-medium`}>
                        {event.category}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-medium">
                            {format(new Date(event.date), "EEEE, MMMM d, yyyy")}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-medium">{event.time}</span>
                    </div>
                </div>

                {event.notes && (
                    <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm text-gray-700 line-clamp-3">{event.notes}</p>
                    </div>
                )}

                <div className="flex gap-2 pt-2">
                    <Button

                        variant="outline"
                        size="sm"
                        onClick={() => archiveEvent(event.id)}
                        className="flex-1 disabled:cursor-not-allowed disabled:opacity-70 border-orange-200 text-orange-700 hover:bg-orange-50"
                    >
                        <Archive className="w-4 h-4 mr-1" />

                        Archive
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteEvent(event.id)}
                        className="flex-1 disabled:cursor-not-allowed disabled:opacity-70 border-red-200 text-red-700 hover:bg-red-50"
                    >

                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                    </Button>


                </div>
            </CardContent>
        </Card>
    )
}
