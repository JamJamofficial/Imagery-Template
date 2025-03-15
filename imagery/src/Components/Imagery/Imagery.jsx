import React from "react";
import './Imagery.css';
import Default_Img from "../Assets/Default Img.jpeg";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

const Imagery = ({ image }) => {

        const[image_url,setImage_url] = useState("/");
        let inputRef = useRef(null);
        const [loading,setLoading] = useState(false);

        const generateImage = async () => {
            if(inputRef.current.value==="") {
                return 0;
            }
            setLoading(true);
            const response = await fetch(`https://api.openai.com/v1/images/generations`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:
                    "Bearer YOUR_API_KEY",// Replace YOUR_API_KEY with your actual API key
                    "User-Agent":"Chrome", 
                    body:JSON.stringify({
                        prompt: inputRef.current.value,
                        n: 1,
                        size: "512x512",
                    }),
                }
            });
            let data = await response.json();
            let data_array = data.data;
            setImage_url(data_array[0].url);
            setLoading(false);
        }

    return (
        <div className='imagery'>
            <div className="header">
                 Imagery <span>Image generation</span>
                 <div className="Image-Generating">
                    <div className="Image">
                        <img src={image_url==="/"?Default_Img:image_url} alt="Generated Image"/>
                        <div className="loading">
                            <div className={loading?"LoadingBar-full":"LoadingBar"}></div>
                            <div className={loading ? "LoadingText":"display-none"}>Loading...</div>
                        </div>
                    </div>
                 </div>
            </div>
            <div className="Generate-box">
                <input type="text" ref={inputRef} className="prompt-input" placeholder="Describe your image..." />
                <div className="generate-button" onClick={()=>{generateImage()}}> Generate </div>
            </div>
        </div>
    );
}

export default Imagery;
