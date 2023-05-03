import { auth } from "@/auth/firebaseApp";
import useAuth from "@/hooks/auth/useAuth";
import LogoIcon from "@/ui/globals/logoIcon";
import {
  Card,
  Text,
  Container,
  Input,
  Button,
  Spacer,
  Checkbox,
  Row,
  Link,
  Loading,
} from "@nextui-org/react";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const router = useRouter();
  const { signInAsync } = useAuth();

  const onSubmit = async (data: FieldValues) => {
    setIsLoading(true);
    const { email, password } = data;
    const { isError, message } = await signInAsync(email, password);
    isError && setErrorMessage(message);
    router.push("/");
    setIsLoading(false);
  };
  return (
    <Container
      aria-label="login-container"
      display="flex"
      alignItems="center"
      justify="center"
      css={{ minHeight: "100vh" }}
    >
      <Card css={{ maxWidth: "300px" }}>
        <Card.Header css={{ display: "flex", justifyContent: "center" }}>
          <LogoIcon />
          <Text>
            Welcome to <Text b>Finza</Text>
          </Text>
        </Card.Header>
        <Card.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              placeholder="Email"
              aria-label="email-input"
              bordered
              fullWidth
              color="default"
              {...register("email", { required: true })}
              status={errors.email ? "error" : "default"}
              helperColor={errors.email ? "error" : "default"}
              helperText={errors.email && "invalid email"}
              contentLeft={<i className="fi fi-rr-envelope"></i>}
            />
            <Spacer y={1.2} />
            <Input.Password
              aria-label="password-input"
              placeholder="Password"
              css={{ outlineColor: "$error" }}
              bordered
              fullWidth
              {...register("password", { required: true })}
              status={errors.password ? "error" : "default"}
              helperColor={errors.password ? "error" : "default"}
              helperText={errors.password && "invalid password"}
              contentLeft={<i className="fi fi-rr-lock"></i>}
            />{" "}
            <Spacer y={1} />
            <Row justify="space-between">
              <Checkbox size="sm">
                <Text size={12}>Remeber me</Text>
              </Checkbox>
              <Link css={{ fontSize: "$xs" }}>Forgot password?</Link>
            </Row>
            {errorMessage && (
              <Row justify="center" css={{ py: "$4" }}>
                <Text size={12} color="$error">
                  {errorMessage}
                </Text>
              </Row>
            )}
            <Spacer y={1} />
            <Row justify="center">
              <Button color="gradient" disabled={isLoading} type="submit">
                Sign up
                {isLoading && (
                  <Loading
                    color="currentColor"
                    size="sm"
                    type="spinner"
                    css={{ px: "$3" }}
                  />
                )}
              </Button>
            </Row>
          </form>
        </Card.Body>
      </Card>
    </Container>
  );
}
