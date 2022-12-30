import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const About = () => {
    const { user } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const imagehoskey = "f8abb6d450f3ebe88a068da1d4b26fa7";
    const navigate = useNavigate()



    const { data: info = [], refetch, isLoading } = useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/about/${user?.email}`);
            const data = await res.json();
            //console.log(data)
            return data;
        }
    })

    const handleEditInfo = data => {
        console.log(data)

        fetch("http://localhost:5000/about", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
            })
    }

    console.log(user)

    return (
        <div className='min-h-screen'>
            {/* The button to open modal */}
            <div className='lg:mx-80 mt-10 border p-3 rounded-xl'>
                <div className='flex justify-between '>
                    <h1 className='text-xl'>My Profile</h1> <label htmlFor="my-modal-3" className="btn btn-sm">Edit</label>
                </div>
                <div className="divider"></div>
                <div className='grid grid-cols-8'>
                    <div className='col-span-3 avatar'>
                        <div className="w-64 rounded-full">
                            <img src={user?.photoURL} alt="" />
                        </div>
                    </div>
                    <div className="divider divider-horizontal"></div>
                    <div className='col-span-4'>
                        <h1 className='text-xl'>Name:</h1>
                        <h1 className='text-xl'>Email: {user?.email}</h1>
                        <h1 className='text-xl'>University:</h1>
                        <h1 className='text-xl'>Address:</h1>

                    </div>
                </div>
            </div>




            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h2 className='text-4xl text-center'>Edit You information</h2>
                    <div className="divider divider-primary"></div>
                    <div >
                        <form onSubmit={handleSubmit(handleEditInfo)}>
                            <div className="form-control w-full ">
                                <label className="label"> <span className="label-text">Your Name</span></label>
                                <input type="text" {...register("name", {
                                    required: "Name is Required"
                                })} className="input input-bordered w-full " />
                            </div>
                            <div className="form-control w-full ">
                                <label className="label"> <span className="label-text">Your Email</span></label>
                                <input type="email" {...register("email", {
                                    required: true
                                })} className="input input-bordered w-full " defaultValue={user?.email} readOnly />
                            </div>
                            <div className="form-control w-full ">
                                <label className="label"> <span className="label-text">University</span></label>
                                <input type="text" {...register("university", {
                                    required: true
                                })} className="input input-bordered w-full " />
                            </div>
                            <div className="form-control w-full ">
                                <label className="label"> <span className="label-text">Address</span></label>
                                <input type="text" {...register("Adress", {
                                    required: true
                                })} className="input input-bordered w-full " />
                            </div>
                            {/* <div className="form-control w-full col-span-2">
                                <label className="label"> <span className="label-text">Photo</span></label>
                                <input type="file" {...register("image", {
                                    required: "photo is Required"
                                })} className="input w-full " required />
                            </div> */}
                            <input className='btn btn-accent mt-4 w-full' value="Submit" type="submit" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;