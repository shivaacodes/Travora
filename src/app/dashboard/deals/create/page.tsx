"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormFields = z.infer<typeof schema>;

const App = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      email: "test@gmail.com",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log(data);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      throw new Error(); // Simulate an error
    } catch (error) {
      console.error(error);
      setError("root", {
        message: "This email is already taken",
      });
    }
  };

  return (
    <form className="tutorial gap-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="input-field"
        />
        {errors.email && <p className="text-red-600">{errors.email.message}</p>}
      </div>

      <div className="form-group">
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="input-field"
        />
        {errors.password && (
          <p className="text-red-600">{errors.password.message}</p>
        )}
      </div>

      <button type="submit" className="submit-button" disabled={isSubmitting}>
        {isSubmitting ? "Loading..." : "Submit"}
      </button>
    </form>
  );
};

export default App;
