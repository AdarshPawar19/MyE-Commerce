"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CustomerInputForm, customerInputJsonValidation } from '@/validations/customerInputValidations'
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { QueryClient, QueryClientProvider, useMutation } from '@tanstack/react-query'
import { createCustomerData } from '@/app/api/http/api'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import  {  AxiosError } from 'axios'
import { useRouter } from 'next/navigation'

function CustomerFormPage() {

  const [togglePassword,setTogglePassword]=useState<boolean>(false);
  const [toggleConfirmPassword,setToggleConfirmPassword]=useState<boolean>(false);
  const route=useRouter()
    const form=useForm<CustomerInputForm>({
        defaultValues:{
            firstName:"",
            lastName:"",
            email:"",
            confirmPassword:"",
            password:""
        },
        resolver: zodResolver(customerInputJsonValidation)
    })

    const {toast}=useToast();

    const {mutate ,isPending }= useMutation({
      mutationKey:["customer","create"],
      mutationFn:(data:CustomerInputForm)=>createCustomerData(data),
      onSuccess:()=>{
        toast({
          description:"Account created successfully"
        })
        form.reset()  
        route.push("/ifAccountSignInUI")
      },
      onError:(err)=>{
        if(err instanceof AxiosError){
          toast({
            title: "Error",
            description:err.status===401 ? "Customer already exists , please try to login in.": err.status===500 ?"Failed to create user.":err.status===400 ?"Unable to get data at the moment":"",
            variant: "destructive",
          })
        }
      }
   })

    const submitCustomerData=(value:CustomerInputForm)=>{
        mutate(value)
    }
  return (
    <>

      <Card className="mx-auto w-[350px]">
      <CardHeader>
        <CardTitle>Create an account for Mystore</CardTitle>
        <CardDescription>Enter your information to sign up.</CardDescription>
      </CardHeader>
      <CardContent>
      <form className="space-y-4" onSubmit={form.handleSubmit(submitCustomerData)}>

      <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" {...form.register("firstName")} />
            {form.formState.errors.firstName && <p className="text-sm text-red-500">{form.formState.errors.firstName.message}</p>}
      </div>

      <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" {...form.register("lastName")}/>
            {form.formState.errors.lastName && <p className="text-sm text-red-500">{form.formState.errors.lastName.message}</p>}
      </div>

      <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...form.register("email")} />
            {form.formState.errors.email && <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>}
      </div>

      <div className="space-y-2">
            <div className='flex justify-between '>
            <Label htmlFor="password">Password</Label>
            <span className=' underline text-gray-400 text-sm'>
            <Button variant="link" type='button' className='mr-100' onClick={()=>setTogglePassword(!togglePassword)}>See Password?</Button>
            </span>
            </div>
            <Input id="password" type={togglePassword?"text":"password"}
             {...form.register("password")}
             />
            {form.formState.errors.password && <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>}
      </div>
      <div className="space-y-2">
      <div >
            <span className='flex justify-between'>
            <Label htmlFor="password">Confirm Password</Label>
            
            <Button variant="link" type='button' className='mr-100' onClick={()=>setToggleConfirmPassword(!toggleConfirmPassword)}>See Password?</Button>
            </span>
            <Input id="confirmPassword" type={toggleConfirmPassword?"text":"password"}
             {...form.register("confirmPassword")}
             />
            {form.formState.errors.confirmPassword && <p className="text-sm text-red-500">{form.formState.errors.confirmPassword.message}</p>}
        </div>
      </div>
      <div>
      <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Creating Account..." : "Create Account"}
      </Button>
      </div>

      </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-500">
            {/* //TODO:need to redirect to other page if not present */}
          Already have an account? <Button className="text-blue-500 hover:underline" variant={"link"} onClick={()=>route.push("/customer/ifAccountSignInUI")}>Log In</Button>
        </p>
        
      </CardFooter>
      </Card>

    </>
  )
}


// Create a new QueryClient instance
const queryClient = new QueryClient()

// Wrap the LoginForm with QueryClientProvider
export default function LoginFormWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <CustomerFormPage />
    </QueryClientProvider>
  )
}
