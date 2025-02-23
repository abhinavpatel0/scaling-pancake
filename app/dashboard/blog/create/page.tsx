"use client";
import React from 'react';
import BlogForm from '../../components/BlogForm';
import { BlogFormSchemaType } from '../../schema';
import { toast } from '@/components/ui/use-toast';
import { createBlog } from '@/lib/action/blog';

export default function page(){
  const handleCreate = async (data:BlogFormSchemaType) => {
    const result = await createBlog(data);
    const { error } = JSON.parse(result);
    
    if(error?.message){
      toast({
        title: "Fail to create blog",
        description: (
          <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
            <code className="text-white">{error.message}</code>
          </pre>
        ),
      })
    }else{
      toast({
        title: "Successfully created" + data.title,
       
      });
    }
   
    
  }

  return <BlogForm onHandleSubmit={handleCreate}/>
  
}