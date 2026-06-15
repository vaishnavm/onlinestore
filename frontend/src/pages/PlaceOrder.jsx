import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { data } from "react-router-dom";
import { toast } from "react-toastify";
import axios from 'axios'

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const initPay=(order)=>{
    const options={
      key : import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name : 'Order Payment',
      description: '',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response)=>{
        console.log(response)
        try {
          const {data}=await axios.post(backendUrl+'/api/order/verifyRazorpay',{...response, orderId: order.receipt},{headers: {token}})
          if(data.success){
            navigate('/orders')
            setCartItems({})
          }
          
        } catch (error) {
          console.log(error)
          toast.error(error)
        }
      }
    }
    // Add a check for when the user closes the payment modal
    options.modal = {
      ondismiss: async () => {
        try {
          await axios.post(backendUrl + '/api/order/verifyRazorpay', { razorpay_order_id: order.id, orderId: order.receipt }, { headers: { token } });
        } catch (error) {
          console.log(error);
        }
        toast.error("Payment cancelled. Order not placed.");
      }
    }
    const rzp=window.Razorpay(options)
    rzp.open()
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      let orderItems = [];

      for (const items in cartItems) {
        // items like shirt ,tshirt , jeans

        for (const item in cartItems[items]) {
          // item like sizes ('s','m','l')

          if (cartItems[items][item] > 0) {
            // checking qty of each sizes

            const itemInfo = structuredClone(
              products.find((product) => product._id === items),
            );

            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      // console.log(orderItems)

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      // console.log("Backend URL:", backendUrl);
      // console.log("Payment Method:", method);
      // console.log("Order Data:", orderData);
      // console.log("Auth Token:", token ? "Present" : "Missing");

      switch (method) {
        //API calls for COD

        case "cod":
          const response= await axios.post(backendUrl+'/api/order/place',orderData,{headers:{token}})
          if(response.data.success){
            setCartItems({})
            navigate('/orders')
          }else{
            toast.error(response.data.message)
          }
          break;

        case "stripe":
          // console.log("Stripe method selected");
          const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { token } });
          // console.log("Stripe Response Data:", responseStripe.data);
          
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            console.log("Redirecting to Stripe checkout:", session_url);
            window.location.replace(session_url);
          } else {
            console.error("Stripe order failed:", responseStripe.data.message);
            toast.error(responseStripe.data.message);
          }
          break;
        case "razorpay":
          const responseRazorpay= await axios.post(backendUrl+'/api/order/razorpay',orderData,{headers:{token}})
          if(responseRazorpay.data.success){
            console.log(responseRazorpay.data.order)
            initPay(responseRazorpay.data.order)
          }
          
          break;

        default:
          console.log("default");
          break;
      }
    } catch (error) {
      console.error("Full Error Object:", error);
      console.error("Error Status:", error.response?.status);
      console.error("Error Data:", error.response?.data);
      console.error("Error Message:", error.message);
      
      if (error.code === 'ECONNABORTED') {
        toast.error("Request timeout - Server not responding");
      } else if (error.response?.status === 404) {
        toast.error("API endpoint not found - Check backend routes");
      } else if (error.response?.status === 500) {
        toast.error("Server error: " + (error.response?.data?.message || "Internal Server Error"));
      } else if (!error.response) {
        toast.error("Network error - Cannot connect to backend. Check backend URL: " + backendUrl);
      } else {
        toast.error(error.response?.data?.message || error.message);
      }
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* Left side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First name"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last name"
          />
        </div>

        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email address"
        />
        <input
          required
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Street"
        />

        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
          />
          <input
            required
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="State"
          />
        </div>

        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="number"
            placeholder="Zipcode"
          />
          <input
            required
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="number"
          placeholder="Phone"
        />
      </div>

      {/* Right side */}

      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />

          {/* {Payemnt method delection} */}

          <div className="flex flex-col gap-3 lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer "
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${method === "stripe" ? "bg-green-400" : ""}`}
              ></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
            </div>

            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${method === "razorpay" ? "bg-green-400" : ""}`}
              ></p>
              <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
            </div>

            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer "
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${method === "cod" ? "bg-green-400" : ""}`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>

          <div className="w-full text-end mt-6">
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
