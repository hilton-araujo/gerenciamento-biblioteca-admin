"use client";
import React, { useState } from 'react';
import { Mail, Lock, EyeOff, Eye } from 'lucide-react';
import { API_ENDPOINTS } from '@/data/client/endpoint';
import { usePost } from '@/data/hooks';
import { jwtDecode } from 'jwt-decode';
import { setAuthToken } from '@/data/client/token.utils';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';

type DecodedToken = {
  sub: string;
  exp: number;
  role: string;
};

type LoginInput = {
  login: string;
  password: string;
};

const Home = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useRouter()

  const handleSuccess = (data: any) => {
    const token = data?.data?.token;
    setAuthToken(token);
    const decoded: DecodedToken = jwtDecode(token);
    navigate.push(`/admin`);

    toast({
      title: "Sucesso",
      description: data?.message,
      variant: "default",
    });

    formik.setSubmitting(false)
    formik.resetForm();
  };

  const handleError = () => {
    toast({
      title: "Ocorreu um erro",
      description: "Por favor verifique as suas credênciais!",
      variant: "destructive",
    });
    formik.setSubmitting(false)
  }

  const { post } = usePost({
    endpoint: API_ENDPOINTS.LOGIN,
    successAction: (data: any) => {
      handleSuccess(data);
    },
    errorAction: (error: any) => {
      handleError();
    },
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('O email é obrigatório'),
      password: Yup.string().required('A senha é obrigatória'),
    }),
    onSubmit: (values) => {
      post(values)
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-700 to-purple-800 text-white p-6 text-center">
            <h2 className="text-3xl font-bold">Bem-vindo</h2>
            <p className="mt-2 text-indigo-100">Faça login para acessar sua biblioteca</p>
          </div>

          <form onSubmit={formik.handleSubmit} className="p-8 space-y-6">
            <div className="relative">
              <label className="block mb-2 text-gray-600">Email</label>
              <div className="flex items-center border rounded-lg">
                <Mail className="ml-3 text-gray-500" />
                <input
                  type="email"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  name="username"
                  placeholder="Digite seu email"
                  required
                  className="w-full p-3 pl-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="relative">
              <label className="block mb-2 text-gray-600">Senha</label>
              <div className="flex items-center border rounded-lg">
                <Lock className="ml-3 text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  name="password"
                  placeholder="Digite sua senha"
                  required
                  className="w-full p-3 pl-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="mr-3 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="text-gray-500" /> : <Eye className="text-gray-500" />}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="mr-2 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="text-gray-600">Lembrar-me</label>
              </div>
              <a href="#forgot-password" className="text-indigo-600 hover:text-indigo-800">
                Esqueceu a senha?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home; 