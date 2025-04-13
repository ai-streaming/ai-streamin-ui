import React from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
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

export const LoginPage = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const history = useHistory();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Add login logic here
    history.push('/app/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
            <Icon icon="lucide:video" className="text-primary" />
            AI Video Insights
          </h1>
          <p className="text-default-500">Sign in to your account</p>
        </div>

        <Card className="w-full">
          <CardHeader className="space-y-1">
            <h2 className="text-xl font-semibold">Sign In</h2>
            <p className="text-sm text-default-500">
              Enter your email and password to access your account
            </p>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleLogin} className="space-y-4">
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
              <Input
                type="password"
                label="Password"
                placeholder="Enter your password"
                value={password}
                onValueChange={setPassword}
                startContent={
                  <Icon icon="lucide:lock" className="text-default-400" />
                }
              />
              <Button type="submit" color="primary" fullWidth>
                Sign In
              </Button>
            </form>
          </CardBody>
          <CardFooter className="flex flex-col gap-2">
            <div className="flex items-center justify-between w-full">
              <Link as={RouterLink} to="/forgot-password" color="primary">
                Forgot password?
              </Link>
              <Link as={RouterLink} to="/signup" color="primary">
                Create account
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};