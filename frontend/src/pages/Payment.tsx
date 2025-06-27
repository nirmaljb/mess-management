import { Button } from '@/components/ui/button'
import React, { useEffect } from 'react'

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function Payment() {
    const options = {
        "key": import.meta.env.RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
        "amount": "8850", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Mess Master", //your business name
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
        "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
            "name": "Nirmal Jyoti Biswas", //your customer's name
            "email": "nirmaljyotib@example.com",
            "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        }
    }
        useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            const button = document.getElementById('rzp-button1');
            if (button) {
                button.onclick = function (e) {
                    e.preventDefault();
                    if (window.Razorpay) {
                        const rzp1 = new window.Razorpay(options);
                        rzp1.open();
                    } else {
                        alert('Razorpay SDK failed to load.');
                    }
                }
            }
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <>
            <Button id="rzp-button1">Pay</Button>
        </>
    )
}
