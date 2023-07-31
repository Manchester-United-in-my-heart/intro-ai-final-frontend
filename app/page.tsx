"use client"
import Image from 'next/image'
import {useState} from "react";
import {useForm} from "react-hook-form";
import IndexUI from "@/app/UI";
import {IndexUIProps} from "@/app/UI";
export default function Home() {
  const {register, handleSubmit, watch, formState: {errors}} = useForm()
  const [ numberOfItem, setNumberOfItem] = useState(undefined)
  const [ itemDetail, setItemDetail] = useState([])
  const [ capacity, setCapacity] = useState(undefined)
  const [ isChosen, setIsChosen] = useState<boolean[]>([])
  const onFirstSubmit = (data: any) => {
    setNumberOfItem(data.numberOfItem)
    setCapacity(data.capacity)
  }
  const onSecondSubmit = (data: any) => {
    console.log(itemDetail)
  }
  return (
      <>
        <IndexUI numberOfItem={numberOfItem} itemDetail={itemDetail} capacity={capacity} setNumberOfItem={setNumberOfItem} setItemDetail={setItemDetail} setCapacity={setCapacity} register={register} handleSubmit={handleSubmit} watch={watch} errors={errors} onFirstSubmit={onFirstSubmit} onSecondSubmit={onSecondSubmit} isChosen={isChosen}/>
      </>
  )
}
