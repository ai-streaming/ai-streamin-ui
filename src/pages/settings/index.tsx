import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Button,
  Divider,
  Switch,
  Badge
} from '@heroui/react';
import { Icon } from '@iconify/react';

export default function SettingsPage() {
  const [summarizationInterval, setSummarizationInterval] = React.useState("30");
  const [emailAlerts, setEmailAlerts] = React.useState(true);
  const [smsAlerts, setSmsAlerts] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);

  const handleSavePassword = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Settings</h1>
        {showSuccess && (
          <Badge color="success" variant="flat">
            Settings saved successfully
          </Badge>
        )}
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">Account Security</h2>
          <p className="text-sm text-default-500">Update your password and security settings</p>
        </CardHeader>
        <CardBody className="space-y-4">
          <Input
            type="password"
            label="Current Password"
            placeholder="Enter current password"
            startContent={<Icon icon="lucide:lock" className="text-default-400" />}
          />
          <Input
            type="password"
            label="New Password"
            placeholder="Enter new password"
            startContent={<Icon icon="lucide:key" className="text-default-400" />}
          />
          <Input
            type="password"
            label="Confirm New Password"
            placeholder="Confirm new password"
            startContent={<Icon icon="lucide:check-circle" className="text-default-400" />}
          />
          <Button 
            color="primary"
            onPress={handleSavePassword}
            isLoading={isSaving}
          >
            Update Password
          </Button>
        </CardBody>
      </Card>

      <Card>
        <CardHeader className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">Subscription</h2>
          <p className="text-sm text-default-500">Manage your subscription and billing</p>
        </CardHeader>
        <CardBody>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="font-semibold">Pro Plan</h3>
              <p className="text-default-500">$29/month</p>
              <p className="text-xs text-success">Active until March 1, 2024</p>
            </div>
            <div className="flex gap-2">
              <Button color="primary" variant="flat">
                Manage Plan
              </Button>
              <Button color="danger" variant="light">
                Cancel
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">Summarization Settings</h2>
          <p className="text-sm text-default-500">Configure AI analysis frequency and notifications</p>
        </CardHeader>
        <CardBody className="space-y-6">
          <Select
            label="Summarization Interval"
            selectedKeys={[summarizationInterval]}
            onSelectionChange={(keys) => setSummarizationInterval(Array.from(keys)[0] as string)}
            startContent={<Icon icon="lucide:clock" className="text-default-400" />}
          >
            <SelectItem key="15">Every 15 minutes</SelectItem>
            <SelectItem key="30">Every 30 minutes</SelectItem>
            <SelectItem key="60">Every hour</SelectItem>
          </Select>

          <Divider />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Notifications</h3>
              <Badge variant="flat" color="primary" size="sm">
                {emailAlerts || smsAlerts ? 'Enabled' : 'Disabled'}
              </Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <h4 className="font-medium">Email Alerts</h4>
                <p className="text-sm text-default-500">Receive event summaries via email</p>
              </div>
              <Switch 
                isSelected={emailAlerts}
                onValueChange={setEmailAlerts}
              />
            </div>

            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <h4 className="font-medium">SMS Alerts</h4>
                <p className="text-sm text-default-500">Receive important alerts via SMS</p>
              </div>
              <Switch 
                isSelected={smsAlerts}
                onValueChange={setSmsAlerts}
              />
            </div>

            {(emailAlerts || smsAlerts) && (
              <div className="pt-4">
                <Input
                  type="tel"
                  label="Phone Number"
                  placeholder="+1 (555) 000-0000"
                  description="Required for SMS alerts"
                />
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}