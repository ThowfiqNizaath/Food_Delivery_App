import React, { useEffect } from 'react'
import './verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { useSnackbar } from 'notistack'

const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')
    const navigate = useNavigate()
    const {enqueueSnackbar} = useSnackbar()

    const verifyPayment = async() => {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/order/verify`,{success, orderId});
        if(response.data.success){
            navigate('/myorders')
            enqueueSnackbar(response.data.message,{variant: "success"})
        }
        else{
            navigate("/")
            enqueueSnackbar(response.data.message, { variant: "error" });
        }
    }

    useEffect(() => {
        verifyPayment()
    },[])
    
  return (
    <div className="verify">
        <div className = "spinner"></div>
    </div>
  )
}

export default Verify