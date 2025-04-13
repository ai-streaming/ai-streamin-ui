import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Card,
  CardBody,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Badge,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  useDisclosure
} from '@heroui/react';
import { Icon } from '@iconify/react';

interface Camera {
  id: string;
  name: string;
  url: string;
  status: 'online' | 'offline';
  username?: string;
  password?: string;
}

export default function CamerasPage() {
  const history = useHistory();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [cameras, setCameras] = React.useState<Camera[]>([
    { id: '1', name: 'Front Door', url: 'rtsp://example.com/camera1', status: 'online' },
    { id: '2', name: 'Parking Lot', url: 'rtsp://example.com/camera2', status: 'offline' },
    { id: '3', name: 'Warehouse', url: 'rtsp://example.com/camera3', status: 'online' },
  ]);

  const [newCamera, setNewCamera] = React.useState({
    name: '',
    url: '',
    username: '',
    password: ''
  });

  const handleViewLive = (id: string) => {
    history.push(`/app/cameras/${id}`);
  };

  const handleAddCamera = () => {
    // Add validation and API call here
    const id = (cameras.length + 1).toString();
    setCameras([...cameras, { ...newCamera, id, status: 'offline' }]);
    onOpenChange(false);
    setNewCamera({ name: '', url: '', username: '', password: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">My Cameras</h1>
        <Button 
          color="primary" 
          onPress={onOpen}
          startContent={<Icon icon="lucide:plus" />}
          className="w-full sm:w-auto"
        >
          Add New Camera
        </Button>
      </div>

      <div className="grid gap-4 sm:hidden">
        {cameras.map((camera) => (
          <Card key={camera.id}>
            <CardBody>
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{camera.name}</h3>
                    <Badge 
                      color={camera.status === 'online' ? 'success' : 'danger'}
                      variant="flat"
                      size="sm"
                      className="mt-1"
                    >
                      {camera.status}
                    </Badge>
                  </div>
                  <Button 
                    size="sm"
                    color="danger"
                    variant="light"
                    isIconOnly
                  >
                    <Icon icon="lucide:trash-2" className="w-4 h-4" />
                  </Button>
                </div>
                <code className="text-sm bg-content2 px-2 py-1 rounded block overflow-x-auto">
                  {camera.url}
                </code>
                <Button 
                  size="sm" 
                  color="primary"
                  variant="flat"
                  onPress={() => handleViewLive(camera.id)}
                  fullWidth
                >
                  View Live
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <Card className="hidden sm:block">
        <CardBody>
          <Table aria-label="Cameras list">
            <TableHeader>
              <TableColumn>NAME</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>RTSP URL</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {cameras.map((camera) => (
                <TableRow key={camera.id}>
                  <TableCell>{camera.name}</TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell>
                    <code className="text-sm bg-content2 px-2 py-1 rounded">
                      {camera.url}
                    </code>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        color="primary"
                        variant="flat"
                        onPress={() => handleViewLive(camera.id)}
                      >
                        View Live
                      </Button>
                      <Button 
                        size="sm"
                        color="danger"
                        variant="light"
                      >
                        Remove
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Add New Camera</ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <Input
                    label="Camera Name"
                    placeholder="e.g., Front Door Camera"
                    value={newCamera.name}
                    onValueChange={(value) => setNewCamera({...newCamera, name: value})}
                  />
                  <Input
                    label="RTSP URL"
                    placeholder="rtsp://camera-ip:554/stream"
                    value={newCamera.url}
                    onValueChange={(value) => setNewCamera({...newCamera, url: value})}
                  />
                  <Input
                    label="Username (Optional)"
                    placeholder="Camera username"
                    value={newCamera.username}
                    onValueChange={(value) => setNewCamera({...newCamera, username: value})}
                  />
                  <Input
                    label="Password (Optional)"
                    type="password"
                    placeholder="Camera password"
                    value={newCamera.password}
                    onValueChange={(value) => setNewCamera({...newCamera, password: value})}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={handleAddCamera}>
                  Add Camera
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}