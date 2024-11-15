import { z } from "zod";
import { useState } from "react";
import { Label } from "../components/Label";
import Button from "../components/Button";
import { Input } from "../components/Input";
const Forgotpsswrd = ({
  handleClick,
  handleDataChange,
  handleDataSubmit,
  formData,
  error,
}) => {
  const schema = z.object({
    email: z.string().email("Must be a valid email address"),
  });

  return (
    <div className="font-poppins">
      <p className="pt-2 px-6 text-sm text-center">
        Enter email address associated with your account and you will receive an
        email to reset your password.
      </p>

      <div className="p-6 pt-6">
        <form action="" onSubmit={handleDataSubmit}>
          <div className="flex flex-col space-y-1 ">
            <Label type="Email" />
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleDataChange}
              placeholder="Enter Email ID ..."
            />
            {error.email && (
              <p className="text-xs font-semibold text-red-600">
                {error.email._errors[0]}
              </p>
            )}
          </div>
          <div className="flex items-center justify-center">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
      <div className="font-medium text-center">
        <a href="#">
          <span className="text-blue-800 hover:underline" onClick={handleClick}>
            Return to login
          </span>
        </a>
      </div>
    </div>
  );
};
export default Forgotpsswrd;
