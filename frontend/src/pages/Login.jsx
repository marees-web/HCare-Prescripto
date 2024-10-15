import React, { useState,useContext,useEffect } from "react";
import { AppContext } from "../context/AppContext";
import axios from 'axios'
import {toast} from 'react-toastify'
import { useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";

const Login = () => {
  const {backendUrl,token,setToken}=useContext(AppContext)

  const navigate=useNavigate()

  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if(state === 'Sign Up'){
        const {data}=await axios.post(backendUrl + '/api/user/register',{name,email,password})
        if(data.success){
          localStorage.setItem('token',data.token)
          setToken(data.token)
        }else{
          toast.error(data.message)
        }
      }else{
        const {data}=await axios.post(backendUrl + '/api/user/login',{email,password})
        if(data.success){
          localStorage.setItem('token',data.token)
          setToken(data.token)
        }else{
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  };
  useEffect(() => {
    if(token){
      navigate('/')
    }
  }, [token])
  return (
    
    <div >
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] bg-pattern relative bg-no-repeat bg-cover backdrop:opacity-5 flex items-center rounded shadow-[0_35px_60px_-15px_rgba(0,0,0,0.8)] ">
      <div className="flex flex-col gap-3 m-20  items-start p-8 min-w-[340px] bg-white/80 sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "Sign Up" ? "sign up" : "log in"} to book
          appointment
        </p>
        {state === "Sign Up" && (
          <div className="w-full relative">
            <p>Full Name</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
            <FaUserAlt className="absolute top-[35px] right-0 h-5  w-20 rounded-full" />
          </div>
        )}

        <div className="w-full relative">
          <p>Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <MdEmail className="absolute top-[35px] right-0 w-20 h-5 rounded-full" />
        </div>
        <div className="w-full relative">
          <p>Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <FaLock className="absolute top-[35px] right-0 w-20 h-5 rounded-full" />
        </div>
        <button type="submit" className="bg-primary text-white rounded-lg w-full py-2 text-base hover:scale-105 transition-all duration-300">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>
        {state === "Sign Up" ? (
          <p>
            Already Have an Account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-primary underline cursor-pointer"
            >
              Login here
            </span>{" "}
          </p>
        ) : (
          <p>
            Create an new Account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-primary underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
    </div>
    
  );
};

export default Login;
