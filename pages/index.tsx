import Image from "next/image";
import { Inter } from "next/font/google";
import character from "../public/character.png";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import * as z from "zod";

const inter = Inter({ subsets: ["latin"] });

const phoneRegexByCountry: { [key: string]: RegExp } = {
  "+886": /^[0][9]\d{8}$/,
  "+853": /^[6]\d{7}$/, // 对应葡萄牙澳门的手机号码正则表达式
  "+852": /^([5|6|9]\d{7}$)/, // 对应香港的手机号码正则表达式
  "+82": /^10\d{4}\d{4}$/, // 对应韩国的手机号码正则表达式
};

const formSchema = z
  .object({
    phoneNum: z
      .string({
        required_error: "請輸入手機號碼",
      })
      .trim(),
    device: z.enum(["iOS", "Android"], {
      required_error: "請選擇裝置",
    }),
    country: z.string(),
    policy: z.boolean({
      required_error: "為必填項目",
    }),
  })
  .refine(
    (data) => {
      const { phoneNum, country } = data;
      const regex = phoneRegexByCountry[country];
      return regex ? regex.test(phoneNum) : true;
    },
    { message: "請輸入正確手機格式", path: ["phoneNum"] }
  ); // Specify the path to add the error to

export default function Home() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "+886",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <>
      <div className='scheduleBg w-full max-w-[960px] m-auto my-[200px] p-[12px] border-[1px] border-[#ABB4E1]'>
        <div className=' w-full border-[3px] border-[#4E5681] flex min-h-[400px]'>
          <div className='mask relative -mt-[100px] min-h-[500px] overflow-hidden'>
            <div className='h-[100px] w-[556px]'></div>
            {/* <Image src={character} alt='' className='h-[100px] w-[556px] object-cover object-left-top' /> */}
            <div className=' absolute top-0'>
              <Image src={character} alt='' className='h-[572px] w-[556px] object-cover object-left-top' />
            </div>
          </div>
          <div className='min-w-[320px]'>
            <div className='text-white'>
              <div className='text-[28px]'>SSR 洛綰嫣，預約就帶走</div>
              <hr className='bg-white' />
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className=''>
                  <FormField
                    control={form.control}
                    name='device'
                    render={({ field }) => (
                      <FormItem className=''>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className='mb-[16px] gap-0'
                          >
                            <div className='flex space-x-[24px] justify-center items-center'>
                              <FormItem className='flex items-center space-x-3 space-y-0'>
                                <FormControl>
                                  <RadioGroupItem value='iOS' />
                                </FormControl>
                                <FormLabel className='font-normal text-[24px] text-white'>iOS</FormLabel>
                              </FormItem>
                              <FormItem className='flex items-center space-x-3 space-y-0'>
                                <FormControl>
                                  <RadioGroupItem value='Android' />
                                </FormControl>
                                <FormLabel className='font-normal text-[24px] text-white'>Andriod</FormLabel>
                              </FormItem>
                            </div>
                            <FormMessage className='text-center' />
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className='flex space-x-[8px] mb-[16px] justify-center'>
                    <FormField
                      control={form.control}
                      name='country'
                      render={({ field }) => (
                        <FormItem>
                          <Select onValueChange={field.onChange} defaultValue={"+886"}>
                            <FormControl>
                              <SelectTrigger className='bg-[#19313C] border border-[#4F6975] w-[88px]'>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className='bg-[#19313C] border border-[#4F6975]'>
                              <SelectItem value='+886' className=' border-b-[1px] border-[#4F6975] text-white'>
                                +886
                              </SelectItem>
                              <SelectItem value='+853' className=' border-b-[1px] border-[#4F6975] text-white'>
                                +853
                              </SelectItem>
                              <SelectItem value='+852' className=' border-b-[1px] border-[#4F6975] text-white'>
                                +852
                              </SelectItem>
                              <SelectItem value='+82' className=' text-white'>
                                +82
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='phoneNum'
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder='請輸入手機號碼'
                              {...field}
                              className='bg-[#19313C] border border-[#4F6975]'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name='policy'
                    render={({ field }) => (
                      <FormItem>
                        <div className='flex justify-center items-center space-x-[8px]'>
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} className='border-white' />
                          </FormControl>
                          <div className='space-y-1 leading-none'>
                            <FormDescription className='text-white'>
                              我已同意
                              <span
                                className='text-[#9FB4FF] cursor-pointer'
                                onClick={() => {
                                  alert("隱私權政策");
                                }}
                              >
                                隱私權政策
                              </span>
                              與
                              <span
                                className='text-[#9FB4FF] cursor-pointer'
                                onClick={() => {
                                  alert("使用條款");
                                }}
                              >
                                使用條款
                              </span>
                            </FormDescription>
                          </div>
                        </div>
                        <FormMessage className='text-center'/>
                      </FormItem>
                    )}
                  />
                  <Button type='submit'>Submit</Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
