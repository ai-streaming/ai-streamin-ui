import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Input,
  Button,
  Link,
} from '@heroui/react';
import { Icon } from '@iconify/react';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add password reset logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
            <Icon icon="lucide:video" className="text-primary" />
            AI Video Insights
          </h1>
          <p className="text-default-500">Reset your password</p>
        </div>

        <Card className="w-full">
          <CardHeader className="space-y-1">
            <h2 className="text-xl font-semibold">Forgot Password</h2>
            <p className="text-sm text-default-500">
              Enter your email to receive a password reset link
            </p>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                label="Email"
                placeholder="Enter your email"
                value={email}
                onValueChange={setEmail}
                startContent={
                  <Icon icon="lucide:mail" className="text-default-400" />
                }
              />
              <Button type="submit" color="primary" fullWidth>
                Send Reset Link
              </Button>
            </form>
          </CardBody>
          <CardFooter>
            <p className="text-center w-full">
              Remember your password?{' '}
              <Link as={RouterLink} to="/login" color="primary">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}