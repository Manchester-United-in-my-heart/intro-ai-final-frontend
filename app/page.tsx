"use client"
import {useState} from "react";
import {useForm} from "react-hook-form";
import IndexUI from "@/app/UI";
import {IndexUIProps} from "@/app/UI";

export default function Home() {
	const {register, handleSubmit, watch, formState: {errors}} = useForm()
	const [numberOfItem, setNumberOfItem] = useState(undefined)
	const [itemDetail, setItemDetail] = useState([])
	const [capacity, setCapacity] = useState(undefined)
	const [isChosenByCuckoo, setIsChosenByCuckoo] = useState<boolean[]>([])
	const [bestValueByCuckoo, setBestValueByCuckoo] = useState<number | undefined>(undefined)
	const [bestWeightByCuckoo, setBestWeightByCuckoo] = useState<number | undefined>(undefined)
	const [timeByCuckoo, setTimeByCuckoo] = useState<number | undefined>(undefined)
	const [isChosenByReal, setIsChosenByReal] = useState<boolean[]>([])
	const [bestValueByReal, setBestValueByReal] = useState<number | undefined>(undefined)
	const [bestWeightByReal, setBestWeightByReal] = useState<number | undefined>(undefined)
	const [timeByReal, setTimeByReal] = useState<number | undefined>(undefined)

	const onFirstSubmit = (data: any) => {
		setNumberOfItem(data.numberOfItem)
		setCapacity(data.capacity)
	}
	const onSecondSubmit = async (data: any) => {
		const val: number[] = []
		const weight: number[] = []
		if (numberOfItem) {
			for (let i = 0; i < numberOfItem; i++) {
				val.push(itemDetail[i].value)
				weight.push(itemDetail[i].weight)
			}
		}
		const res = await fetch('http://localhost:8000/api', {
			method: 'POST',
			body: JSON.stringify({
				val: val,
				weight: weight,
				capacity: capacity,
				N: data.nest,
				pa: data.pa,
				maxiter: data.iter
			}),
			headers: {
				'Content-Type': 'application/json'
			},
			mode: 'cors'
		})
		const result = await res.json()
		setIsChosenByCuckoo(result.cuckoo_sol)
		setBestValueByCuckoo(result.cuckoo_val)
		setBestWeightByCuckoo(result.cuckoo_weight)
		setTimeByCuckoo(result.cuckoo_time)

		setIsChosenByReal(result.real_sol)
		setBestValueByReal(result.real_val)
		setBestWeightByReal(result.real_weight)
		setTimeByReal(result.real_time)
	}
	return (
		<>
			<IndexUI numberOfItem={numberOfItem} itemDetail={itemDetail} capacity={capacity} setNumberOfItem={setNumberOfItem}
							 setItemDetail={setItemDetail} setCapacity={setCapacity} register={register} handleSubmit={handleSubmit}
							 watch={watch} errors={errors} onFirstSubmit={onFirstSubmit} onSecondSubmit={onSecondSubmit}
							 isChosenByCuckoo={isChosenByCuckoo} bestValueByCuckoo={bestValueByCuckoo} bestWeightByCuckoo={bestWeightByCuckoo}
								isChosenByReal={isChosenByReal} bestValueByReal={bestValueByReal} bestWeightByReal={bestWeightByReal}
							 timeByCuckoo={timeByCuckoo} timeByReal={timeByReal}
			/>
		</>
	)
}
