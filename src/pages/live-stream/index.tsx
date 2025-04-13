import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Badge,
  Tooltip
} from '@heroui/react';
import { Icon } from '@iconify/react';
import ReactPlayer from 'react-player';

interface Detection {
  id: string;
  type: 'person' | 'vehicle' | 'object';
  confidence: number;
  timestamp: string;
}

export default function LiveStreamPage() {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [detections, setDetections] = React.useState<Detection[]>([
    {
      id: '1',
      type: 'person',
      confidence: 0.95,
      timestamp: new Date().toISOString()
    }
  ]);

  // Simulated camera data - in real app, fetch this from API
  const camera = {
    id,
    name: 'Front Door Camera',
    status: 'online',
    url: 'https://img.heroui.chat/image/dashboard?w=1280&h=720&u=1' // Placeholder for RTSP stream
  };

  const handleBack = () => {
    history.push('/app/cameras');
  };

  const handleSnapshot = () => {
    // Add snapshot logic here
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <Button
            variant="light"
            isIconOnly
            onPress={handleBack}
            className="hidden sm:flex"
          >
            <Icon icon="lucide:arrow-left" className="w-5 h-5" />
          </Button>
          <div className="w-full sm:w-auto">
            <h1 className="text-xl sm:text-2xl font-bold">{camera.name}</h1>
            <div className="flex items-center gap-2">
              <Badge 
                color={camera.status === 'online' ? 'success' : 'danger'}
                variant="flat"
                startContent={
                  <div className={`w-2 h-2 rounded-full ${
                    camera.status === 'online' ? 'bg-success' : 'bg-danger'
                  }`} 
                  />
                }
              >
                {camera.status}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            variant="flat"
            color="primary"
            fullWidth
            className="sm:hidden"
            onPress={handleBack}
          >
            Back
          </Button>
          <Button
            variant="flat"
            color="primary"
            fullWidth
            sm:isIconOnly
            onPress={handleSnapshot}
          >
            <Icon icon="lucide:camera" className="w-5 h-5" />
            <span className="sm:hidden ml-2">Snapshot</span>
          </Button>
          <Button
            variant="flat"
            color="primary"
            fullWidth
            sm:isIconOnly
            onPress={toggleFullscreen}
          >
            <Icon 
              icon={isFullscreen ? "lucide:minimize" : "lucide:maximize"} 
              className="w-5 h-5" 
            />
            <span className="sm:hidden ml-2">
              {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            </span>
          </Button>
        </div>
      </div>

      <div className={`grid gap-6 ${isFullscreen ? '' : 'lg:grid-cols-4'}`}>
        <Card className={isFullscreen ? 'col-span-full' : 'lg:col-span-3'}>
          <CardBody className="p-0 relative">
            <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
              <ReactPlayer
                url={camera.url}
                width="100%"
                height="100%"
                playing
                controls
                playsinline
              />
            </div>
          </CardBody>
        </Card>

        {!isFullscreen && (
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Live Detections</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {detections.map((detection) => (
                  <div
                    key={detection.id}
                    className="flex items-center justify-between p-2 bg-content2 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <Icon 
                        icon={
                          detection.type === 'person' 
                            ? 'lucide:user' 
                            : detection.type === 'vehicle' 
                            ? 'lucide:car' 
                            : 'lucide:box'
                        }
                        className="w-5 h-5 text-primary"
                      />
                      <div>
                        <p className="font-medium capitalize">{detection.type}</p>
                        <p className="text-sm text-default-500">
                          {Math.round(detection.confidence * 100)}% confidence
                        </p>
                      </div>
                    </div>
                    <time className="text-sm text-default-500">
                      {new Date(detection.timestamp).toLocaleTimeString()}
                    </time>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  );
}