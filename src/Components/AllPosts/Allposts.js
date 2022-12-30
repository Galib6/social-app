import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { GrLike } from "react-icons/gr";

const Allposts = () => {

    const { data: posts = [], refetch, isLoading } = useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/posts", {
                // headers: {
                //     authorization: `Bearer ${localStorage.getItem('s-token')}`
                // }
            });
            const data = await res.json();
            //console.log(data)
            return data;
        }
    })

    return (
        <div className=' max-w-[600px] mx-auto '>
            {
                posts.map(post =>
                    <div className='mt-5 p-3 border border-inherit rounded-md'>
                        <div className='flex justify-start items-center mb-2'>
                            <div className="avatar">
                                <div className="w-10 rounded-full">
                                    <img src={post.profileImg} alt='' />
                                </div>
                            </div>
                            <h1 className='text-xl ml-3'>
                                {post.name}
                            </h1>
                        </div>
                        <h2>
                            {post.text}
                        </h2>

                        <img className='object-cover lg:h-64 lg:w-[600px] rounded-lg' src={post.imgLink} alt="" />
                        <h3 className='mt-2'> <button className='btn btn-sm border-none bg-transparent hover:bg-blue-300'><GrLike /></button> 4 People Reacted on this</h3>
                        <div className='relative'>
                            <input type="text" className='w-full border border-inherit rounded-xl' placeholder='Add a Comment' />
                            <div class="absolute top-0 right-0">
                                <button class="h-6 w-36 text-white rounded-lg bg-blue-300 hover:bg-red-600">Add Comment</button>
                            </div>
                        </div>

                    </div>
                )
            }
        </div>
    );
};

export default Allposts;