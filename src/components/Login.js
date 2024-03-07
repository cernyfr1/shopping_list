import { Button, Flex, Input, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useFormik } from "formik";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useNavigate } from "react-router-dom";
import { login } from "../services/restServices";

function Login() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();
  const signIn = useSignIn();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const loggedUser = await login(values);

        signIn({
          auth: {
            token: loggedUser.accessToken,
            type: "Bearer",
          },
          userState: {
            name: loggedUser.username,
            uid: 123456,
          },
        });

        navigate("/");
      } catch (e) {
        // Redirect or do-something
        console.log(e);
      }
    },
  });

  return (
    <VStack>
      <form onSubmit={formik.handleSubmit}>
        <Input
          placeholder={"Username"}
          name={"username"}
          value={formik.values.username}
          onChange={formik.handleChange}
        />
        <Flex>
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder={"Enter password"}
            name={"password"}
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <Button onClick={handleClick}>{show ? "Hide" : "Show"}</Button>
        </Flex>
        <Button type={"submit"}>{"Login"}</Button>
      </form>
    </VStack>
  );
}

export default Login;
