import React, { useState } from "react";
import {
  Button,
  Card,
  FormControl,
  InputPassword,
  InputText,
  LayoutOne,
} from "upkit";
import { Link } from "react-router-dom";
import StoreLogo from "../../components/StoreLogo";
import { useForm } from "react-hook-form";
import { rules } from "./validation";
import { registerUser } from "../../app/api/auth";
import { useHistory } from "react-router-dom";

const statusList = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

export default function Register() {
  const history = useHistory();
  const [status, setStatus] = useState(statusList.idle);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async (fromData) => {
    const { password, password_confirm } = fromData;
    if (password !== password_confirm) {
      return setError("password_confirm", {
        type: "equality",
        message: "Password konfirmasi tidak sama",
      });
    }
    setStatus(statusList.process);
    const { data } = await registerUser(fromData);
    if (data.error) {
      let fields = Object.keys(data.fields);
      fields.forEach((fields) => {
        setError(fields, {
          type: "server",
          message: data.fields[fields]?.properties?.message,
        });
      });
      setStatus(statusList.error);
      return;
    }
    setStatus(statusList.success);
    history.push("/register-success");
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <LayoutOne size="small">
        <Card color="white">
          <div className="text-center mb-5">
            <StoreLogo />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl errorMessage={errors.full_name?.message}>
              <InputText
                {...register("full_name", rules.full_name)}
                placeholder="Nama Lengkap"
                fitContainer
              />
            </FormControl>
            <FormControl errorMessage={errors.email?.message}>
              <InputText
                {...register("email", rules.email)}
                placeholder="Email"
                fitContainer
              />
            </FormControl>
            <FormControl errorMessage={errors.password?.message}>
              <InputPassword
                {...register("password", rules.password)}
                placeholder="Password"
                fitContainer
              />
            </FormControl>
            <FormControl errorMessage={errors.password_confirm?.message}>
              <InputPassword
                {...register("password_confirm", rules.password_confirm)}
                placeholder="Konfirmasi Password"
                fitContainer
              />
            </FormControl>
            <Button
              size="large"
              fitContainer
              disabled={status === statusList.process}
            >
              {status === statusList.process
                ? "Sedang memproses..."
                : "Mendaftar"}
            </Button>
          </form>
          <div className="text-center mt-2">
            Sudah punya akun?{" "}
            <Link to="/login">
              {" "}
              <b style={{ textDecoration: "underline" }}>
                {" "}
                Masuk Sekarang.{" "}
              </b>{" "}
            </Link>
          </div>
        </Card>
      </LayoutOne>
    </div>
  );
}
