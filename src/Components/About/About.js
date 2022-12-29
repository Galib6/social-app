import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const About = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const imagehoskey = "f8abb6d450f3ebe88a068da1d4b26fa7";
    const navigate = useNavigate()

    const handleEditInfo = data => {
        console.log(data)
        const image = data.image[0];
        const formData = new FormData()
        formData.append("image", image)
        const url = `https://api.imgbb.com/1/upload?key=${imagehoskey}`
        fetch(url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imgdata => {
                if (imgdata.success) {
                    // //console.log(imgdata.data.url)
                    // const productData = {
                    //     categoryId: data.categoryId,
                    //     name: data.name,
                    //     Location: data.Location,
                    //     resalePrice: data.resalePrice,
                    //     originalPrice: data.originalPrice,
                    //     postTime: Date().slice(0, 15),
                    //     img: imgdata.data.url,
                    //     email: data.email,
                    //     bookingType: "Book Now",
                    //     advertise: false

                    // }
                    // //console.log(productData.postTime)
                    // fetch("https://sell-point-server.vercel.app/addproduct", {
                    //     method: "POST",
                    //     headers: {
                    //         "content-type": "application/json",
                    //     },
                    //     body: JSON.stringify(productData)
                    // })
                    //     .then(res => res.json())
                    //     .then(res => {
                    //         //console.log(res)
                    //         navigate("/dashboard/myproducts")
                    //         reset()
                    //     })
                }
            })
    }
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
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHQv_th9wq3ivQ1CVk7UZRxhbPq64oQrg5Q&usqp=CAU" />
                        </div>
                    </div>
                    <div className="divider divider-horizontal"></div>
                    <div className='col-span-4'>
                        <h1 className='text-xl'>Name:</h1>
                        <h1 className='text-xl'>Email:</h1>
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
                                })} className="input input-bordered w-full " />
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