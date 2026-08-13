import { useEffect, useState } from "react";
import Toast from "./Toast";
import { registerToast } from "../../utils/toast";

function ToastProvider(){

    const [show,setShow] = useState(false);

    const [message,setMessage] = useState("");

    useEffect(()=>{

        registerToast((text)=>{

            setMessage(text);

            setShow(true);

            setTimeout(()=>{

                setShow(false);

            },2200);

        });

    },[]);

    return(

        <Toast

            show={show}

            message={message}

        />

    );

}

export default ToastProvider;