import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const AddApost = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { user } = useContext(AuthContext)
    const imagehoskey = "f8abb6d450f3ebe88a068da1d4b26fa7";
    const navigate = useNavigate()

    const handleeditPost = data => {
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
                    // console.log(imgdata.data.url)
                    const post = {
                        name: user?.displayName,
                        text: data.post,
                        profileImg: user.photoURL,
                        imgLink: imgdata.data.url
                    }
                    console.log(post)
                    fetch("http://localhost:5000/addapost", {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                        },
                        body: JSON.stringify(post)
                    })
                        .then(res => res.json())
                        .then(res => {
                            console.log(res)
                            // navigate("/dashboard/myproducts")
                            reset()
                        })
                }
            })
    }

    return (
        <div className='max-w-[600px] mx-auto flex flex-col' >
            <h1 className='text-xl my-3'>What's on your mind, Post it!! </h1>
            <label htmlFor="addAPost" type="text" placeholder="Type here" className="input input-bordered rounded-full input-primary rounded-p w-full " />
            <div className="divider"></div>
            <div>
                <input className='btn btn-sm w-full' type="submit" />
            </div>
            {/* The button to open modal */}
            {/* <label htmlFor="addAPost" className="btn">open modal</label> */}

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="addAPost" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="addAPost" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h2 className='text-4xl text-center'>Add a post to your friends</h2>
                    <div className="divider divider-primary"></div>
                    <div >
                        <form onSubmit={handleSubmit(handleeditPost)}>
                            <div className="form-control w-full ">
                                <label className="label"> <span className="label-text">Your Post</span></label>
                                <input type="text" {...register("post", {
                                    required: "Name is Required"
                                })} className="input input-bordered w-full " />
                            </div>
                            <div className="form-control w-full col-span-2">
                                <label className="label"> <span className="label-text">Photo</span></label>
                                <input type="file" {...register("image", {
                                    required: "photo is Required"
                                })} className="input w-full " />
                            </div>
                            <input className='btn btn-accent mt-4 w-full' value="Submit" type="submit" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddApost;