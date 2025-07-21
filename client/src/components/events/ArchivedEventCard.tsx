import type { IEvent } from '../../types/event.type'
import { Badge } from '../ui/badge'
import { format } from "date-fns"
import { Calendar, Clock, Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import { getCategoryColor } from '../utils/getCategorycolor'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
interface IProps {
    event: IEvent
    deleteEvent: (id: string) => void
}
export default function ArchivedEventCard({ event, deleteEvent }: IProps) {
    return (
        <Card key={event.id} className="opacity-75 bg-gray-50/80 backdrop-blur-sm border border-gray-200">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-semibold text-gray-600 line-clamp-2">{event.title}</CardTitle>
                    <div className="flex gap-1">
                        <Badge variant="secondary" className="text-xs">
                            Archived
                        </Badge>
                        <Badge className={`${getCategoryColor(event.category)} text-xs font-medium`}>
                            {event.category}
                        </Badge>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{format(new Date(event.date), "EEEE, MMMM d, yyyy")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{event.time}</span>
                    </div>
                </div>

                {event.notes && (
                    <div className="bg-gray-100 rounded-lg p-3">
                        <p className="text-sm text-gray-600 line-clamp-3">{event.notes}</p>
                    </div>
                )}

                <div className="pt-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteEvent(event.id)}
                        className="w-full border-red-200 text-red-700 hover:bg-red-50"
                    >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete Permanently
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
