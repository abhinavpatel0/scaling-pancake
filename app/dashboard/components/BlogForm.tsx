"use client"
import React, { useState } from 'react';
import { EyeOpenIcon, StarIcon, RocketIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {BsSave} from 'react-icons/bs';
import cn from 'classnames';
import Image from 'next/image';
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea";
import  MarkdownPreview  from "@/components/ui/markdown/MarkdownPreview";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Switch } from '@/components/ui/switch';
import { BlogFormSchema, BlogFormSchemaType } from '../schema';



export default function BlogForm({
    onHandleSubmit
}:{onHandleSubmit:(data: BlogFormSchemaType) => void;}) {

  const [isPreview, setPreview] = useState(false);


  const form = useForm<z.infer<typeof BlogFormSchema>>({
    mode: "all",
    resolver: zodResolver(BlogFormSchema),
    defaultValues: {
      title: "",
      content:"",
      image_url:"",
      is_premium:false,
      is_published:true,
    },
  })

  function onSubmit(data: z.infer<typeof BlogFormSchema>) {
    onHandleSubmit(data);
    
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full border rounded-md space-y-6 pb-10">

        <div className="p-5 flex gap-5 items-center flex-wrap justify-between border-b ">
          <div className="flex gap-5 items-center flex-wrap">
          <span role="button" tabIndex={0} className="flex items-center gap-1 border bg-zinc-700 p-2 rounded-md hover:ring-2 hover:ring-zinc-400 " onClick={()=>setPreview(!isPreview && !form.getFieldState("image_url").invalid)}>

          {isPreview ? ( 
            <>
            <Pencil1Icon/>
            Edit
            </>):(
              <>
              <EyeOpenIcon/>
              Preview
              </>)}
            </span>
          
        <FormField
          control={form.control}
          name="is_premium"
          render={({ field }) => (
            <FormItem>
              
              <FormControl>
               <div className="flex items-center gap-1 border bg-zinc-700 p-2 rounded-md"><StarIcon/><span>Premium</span><Switch checked={field.value} onCheckedChange={field.onChange}/></div>
              </FormControl>
             
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="is_published"
          render={({ field }) => (
            <FormItem>
              
              <FormControl>
               <div className="flex items-center gap-1 border bg-zinc-700 p-2 rounded-md"><RocketIcon/><span>Publish</span><Switch checked={field.value} onCheckedChange={field.onChange}/></div>
              </FormControl>
             
            </FormItem>
          )}
        />
        </div>

        <Button className="flex items-center gap-1" disabled={!form.formState.isValid}><BsSave/>Save</Button>

        </div>


        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              
              <FormControl>
                <div className={cn("p-2 w-full flex break-words gap-2", isPreview?"divide-x-0":"divide-x")}>
                <Input placeholder="title" {...field} className={cn("border-none text-lg font-medium leading-relaxed", isPreview?"w-0 p-0": "w-full lg:w-1/2")} /><div className={cn("lg:px-10", isPreview?"mx-auto w-full lg:w-4/5": "w-1/2 lg:block hidden")}><h1 className="text-3xl font-medium">
                  {form.getValues().title}</h1></div></div>
              </FormControl>
              {form.getFieldState("title").invalid && form.getValues().title &&  <FormMessage />}
             
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="image_url"
          render={({ field }) => (
            <FormItem>
              
              <FormControl>
                <div className={cn("p-2 w-full flex break-words gap-2", isPreview?"divide-x-0":"divide-x")}>
                <Input placeholder="image url" {...field} className={cn("border-none text-lg font-medium leading-relaxed", isPreview?"w-0 p-0": "w-full lg:w-1/2")} /><div className={cn("lg:px-10", isPreview?"mx-auto w-full lg:w-4/5": "w-1/2 lg:block hidden")}>{!isPreview?
                (<>
                <p>
                  Click on Preview to see image
                </p>
                </>): (
                  <div className="relative h-80 mt-10 border rounded-md">
                    <Image src={form.getValues().image_url}

                     alt="preview"
                     
                     fill className="object-cover object-center rounded-md" /></div>)}
                </div>
                </div>
              </FormControl>
              {form.getFieldState("image_url").invalid && form.getValues().image_url &&
                <div className="p-2">
                  <FormMessage />
                </div>}
             
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              
              <FormControl>
                <div className={cn("p-2 w-full flex break-words gap-2", isPreview?"divide-x-0":"divide-x h-70vh")}>
                <Textarea placeholder="content" {...field} className={cn("border-none text-lg font-medium leading-relaxed resize-none h-full", isPreview?"w-0 p-0": "w-full lg:w-1/2")} /><div className={cn("overflow-y-auto", isPreview?"mx-auto w-full lg:w-4/5": "w-1/2 lg:block hidden")}>

                  <MarkdownPreview content={form.getValues().content} />
                  </div>
                  </div>
              </FormControl>
              {form.getFieldState("content").invalid && form.getValues().content &&  <FormMessage />}
             
            </FormItem>
          )}
        />
        {/* <Button type="submit">Submit</Button> */}
      </form>
    </Form>
  )
}
