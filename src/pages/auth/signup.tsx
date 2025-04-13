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

export const SignupPage = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const history = useHistory();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Add signup logic here
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
          <p className="text-default-500">Create your account</p>
        </div>

        <Card className="w-full">
          <CardHeader className="space-y-1">
            <h2 className="text-xl font-semibold">Sign Up</h2>
            <p className="text-sm text-default-500">
              Enter your details to create an account
            </p>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSignup} className="space-y-4">
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
                placeholder="Create a password"
                value={password}
                onValueChange={setPassword}
                startContent={
                  <Icon icon="lucide:lock" className="text-default-400" />
                }
              />
              <Input
                type="password"
                label="Confirm Password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onValueChange={setConfirmPassword}
                startContent={
                  <Icon icon="lucide:lock" className="text-default-400" />
                }
              />
              <Button type="submit" color="primary" fullWidth>
                Create Account
              </Button>
            </form>
          </CardBody>
          <CardFooter>
            <p className="text-center w-full">
              Already have an account?{' '}
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