"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CustomerInputForm, customerInputJsonValidation, IfCustomerExistsInoputForm } from '@/validations/customerInputValidations'
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { QueryClient, QueryClientProvider, useMutation, useQuery } from '@tanstack/react-query'
import { createCustomerData, ifSignInSuccessfullRedirectToMainpage } from '@/app/api/http/api'
import { toast, useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import  {  AxiosError } from 'axios'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

function AlreadyAccountSignIn() {
  const [togglePassword,setTogglePassword]=useState<boolean>(false);
  const route=useRouter()
  const form=useForm<IfCustomerExistsInoputForm>({
    defaultValues:{
      email:"",
      confirmPassword:""
    }
  })

  const {mutate}=useMutation({
    mutationKey:["customer","ifAccountSignIn"],
    mutationFn:(data:IfCustomerExistsInoputForm)=>ifSignInSuccessfullRedirectToMainpage(data),
    onSuccess:()=>{
      toast({
        description:"Redirecting to product's page..",
        duration:1000
      })
      setTimeout(() => {
        route.push("/")
      }, 1000);
    },
    onError:(err)=>{
      if(err instanceof AxiosError){
        toast({
          description:err.status===401 ? "You dont have account , please Create new one":"",
          variant:"destructive",
          duration:1000
        })
        setTimeout(() => {
          route.push("/createCustomer")
        }, 1000);
      }
    }
  })

  //const queryKey = ['fetchData', `?name=${formData.name}&age=${formData.age}`]; // Construct query key with data
  const checkIfAccountPresent=(data:IfCustomerExistsInoputForm)=>{
    console.log(data);
    mutate(data)
  }

  // const {data}=useQuery<IfCustomerExistsInoputForm[]>({
  //   queryKey:["customer","ifAccountSignIn",{email:data.}],
  //   queryFn:(data:any)=>Promise.resolve(data)
  // })
  
   
  return (
    <>
      <Card className="mx-auto w-[350px]">
      <CardHeader>
        <CardTitle>Sign In to Mystore</CardTitle>
      </CardHeader>
      <CardContent>
      <form className="space-y-4" onSubmit={form.handleSubmit(checkIfAccountPresent)}>

      <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...form.register("email")} />
      </div>

      <div className="space-y-2">
            <div className='flex justify-between '>
            <Label htmlFor="password">Password</Label>
            <span className=' underline text-gray-400 text-sm'>
            <Button variant="link" type='button' className='mr-100' onClick={()=>setTogglePassword(!togglePassword)}>See Password?</Button>
            </span>
            </div>
            <Input id="password" type={togglePassword?"text":"password"} 
            {...form.register("confirmPassword")}            
             />
      </div>
      
      <div>
      <Button type="submit" className="w-full" >
          Log In
      </Button>
      </div>

      </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-500">
            {/* //TODO:need to redirect to other page if not present */}
          Don't have an account? <Button className="text-blue-500 hover:underline" variant={"link"} onClick={()=>route.push("/customer/createCustomer")}>Create new account?</Button>
        </p>
      </CardFooter>
      </Card>
    </>
  )
}

// Create a new QueryClient instance
const queryClient = new QueryClient()

// Wrap the LoginForm with QueryClientProvider
export default function AlreadyAccountSignInWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <AlreadyAccountSignIn />
    </QueryClientProvider>
  )
}