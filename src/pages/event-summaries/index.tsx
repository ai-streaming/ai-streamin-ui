import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Select,
  SelectItem,
  Input,
  Button,
  Badge
} from '@heroui/react';
import { Icon } from '@iconify/react';

interface Event {
  id: string;
  cameraName: string;
  timestamp: string;
  summary: string;
  thumbnail?: string;
}

export default function EventSummariesPage() {
  const [selectedCamera, setSelectedCamera] = React.useState<string>("all");
  const [selectedDate, setSelectedDate] = React.useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [isLoading, setIsLoading] = React.useState(false);
  const [events] = React.useState<Event[]>([
    {
      id: '1',
      cameraName: 'Front Door',
      timestamp: '2024-02-20T09:30:00',
      summary: 'Between 9:00 and 9:30 AM, a person entered, and a delivery van parked.',
      thumbnail: 'https://img.heroui.chat/image/dashboard?w=400&h=300&u=1'
    },
    {
      id: '2',
      cameraName: 'Parking Lot',
      timestamp: '2024-02-20T10:15:00',
      summary: 'Between 10:00 and 10:15 AM, 3 vehicles entered the parking area.',
      thumbnail: 'https://img.heroui.chat/image/dashboard?w=400&h=300&u=2'
    },
    {
      id: '3',
      cameraName: 'Warehouse',
      timestamp: '2024-02-20T11:00:00',
      summary: 'Between 10:45 and 11:00 AM, 2 employees accessed the storage area.',
      thumbnail: 'https://img.heroui.chat/image/dashboard?w=400&h=300&u=3'
    }
  ]);

  const handleFilter = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Event Summaries</h1>
          <Badge color="primary" variant="flat" size="sm">
            {events.length} Events
          </Badge>
        </div>

        <Card className="mb-6">
          <CardBody>
            <div className="grid gap-4 sm:flex sm:flex-wrap items-end">
              <Select 
                label="Camera"
                placeholder="Select camera"
                className="w-full sm:max-w-xs"
                selectedKeys={[selectedCamera]}
                onSelectionChange={(keys) => setSelectedCamera(Array.from(keys)[0] as string)}
                startContent={<Icon icon="lucide:video" className="text-default-400" />}
              >
                <SelectItem key="all" value="all">All Cameras</SelectItem>
                <SelectItem key="front-door">Front Door</SelectItem>
                <SelectItem key="parking-lot">Parking Lot</SelectItem>
                <SelectItem key="warehouse">Warehouse</SelectItem>
              </Select>
              
              <Input
                type="date"
                label="Date"
                className="w-full sm:max-w-xs"
                value={selectedDate}
                onValueChange={setSelectedDate}
                startContent={<Icon icon="lucide:calendar" className="text-default-400" />}
              />
              
              <Button 
                color="primary"
                className="w-full sm:w-auto"
                startContent={<Icon icon="lucide:filter" />}
                onPress={handleFilter}
                isLoading={isLoading}
              >
                Apply Filters
              </Button>
            </div>
          </CardBody>
        </Card>

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="w-full">
                <CardBody>
                  <div className="space-y-3 animate-pulse">
                    <div className="w-full h-48 bg-default-200 rounded-lg" />
                    <div className="h-4 bg-default-200 rounded w-3/4" />
                    <div className="h-4 bg-default-200 rounded w-1/2" />
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Card key={event.id} isPressable className="overflow-hidden">
                {event.thumbnail && (
                  <img
                    src={event.thumbnail}
                    alt={`Event from ${event.cameraName}`}
                    className="w-full h-48 object-cover"
                  />
                )}
                <CardHeader className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon icon="lucide:video" className="text-primary" />
                      <span className="font-semibold">{event.cameraName}</span>
                    </div>
                    <Badge variant="flat" size="sm">
                      {new Date(event.timestamp).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </Badge>
                  </div>
                </CardHeader>
                <CardBody>
                  <p className="text-default-600">{event.summary}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}