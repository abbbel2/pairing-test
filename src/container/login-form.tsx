import { ErrorMessage, PasswordInput } from "@/components";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib";
import { useAppDispatch, useTypedSelector, userActions } from "@/store";
import { LoginPayload } from "@/store/slices/user/user.util";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, HTMLAttributes, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";

type LoginFormProps = HTMLAttributes<HTMLFormElement>;

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Please enter your email" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(1, {
      message: "Please enter your password",
    })
    .min(4, {
      message: "Password must be at least 4 characters long",
    }),
});

type LoginFormValues = z.infer<typeof formSchema>;

export const LoginForm: FC<LoginFormProps> = ({ className, ...props }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { login } = useTypedSelector((state) => state.user);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = useCallback((data: LoginFormValues) => {
    dispatch(userActions.login(data as LoginPayload)).then(() => {
      toast("User logged in successfully");
      navigate("/");
    });
  }, []);

  return (
    <Form {...form}>
      {login.error && !login.loading && (
        <ErrorMessage
          title="Login failed"
          message="Email or password is not valid, please try again"
        />
      )}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("grid gap-3", className)}
        {...props}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="name@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-8" disabled={login.loading}>
          {login.loading ? "Loading ..." : "Login"}
        </Button>
      </form>
    </Form>
  );
};
