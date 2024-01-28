import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Context
import { useModal } from '../context/modalContext';

// Form validation schema
const schema = yup.object({
    email: yup.string().email("請輸入正確電子信箱").required("信箱為必填"),
    password: yup.string()
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "請輸入英文＋數字８位數")
        .required("密碼為必填"),
}).required();


interface IFormInput {
    email: string;
    password: string;
}

export default function UserRegister() {

    const [passwordShown, setPasswordShown] = useState(false);
    const eye = <FontAwesomeIcon icon={faEye} />;

    // useForm hook with validation resolver
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
        resolver: yupResolver(schema)
    });

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setPasswordShown(passwordShown => !passwordShown);
    };

    // Handle form submission
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        // Simulating API call
        console.log('Form Data Submitted:', data);
        try {
            // Replace this with your actual API call logic
            const response = await fakeApiCall(data);
            console.log(response);
            
            // Handle your API response here
            // if the API returns a success code, proceed
            if(response.code === 1) {
                // Change view or notify user of success
                console.log("Registration successful!");
                localStorage.setItem("step","emailValidation")
                changeStep("emailValidation")
            } else {
                // Notify user of failure or specific error
                console.log(response.msg);
            }
        } catch(error) {
            console.error("API call failed:", error);
        }
    };

    // Fake API call function
    const fakeApiCall = (formData: IFormInput): Promise<{code: number; msg: string}> => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({code: 1, msg: ""}); // Simulate API response
            }, 1000); // Simulate network delay
        });
    }

    // Modal context
    const { showModal,changeStep } = useModal();
  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
        <p className='mb-2'>
            <input {...register("email")} type="text" placeholder='email'/>
            <div>{errors.email?.message}</div>
        </p>
        <p>
            <input {...register("password")} type={passwordShown ? "text" : "password"} placeholder='password'/>
            <i onClick={togglePasswordVisibility}>{eye}</i>
            <div>{errors.password?.message}</div>
        </p>
        <div onClick={togglePasswordVisibility}>
            {passwordShown ? "隱藏密碼" : "顯示密碼"}
        </div>
        <div>
            <button type='submit'>下一步</button>
        </div>
    </form>
    <div className='bg-yellow-400 w-[60px]'>
        <button onClick={() => showModal('com3')}>
            隱私權
        </button>
    </div>
</>
  )
}
