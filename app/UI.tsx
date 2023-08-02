import {useState} from "react";

export type IndexUIProps = {
	bestValueByCuckoo: number | undefined,
	bestWeightByCuckoo: number | undefined,
	capacity: number | undefined,
	errors?: any,
	handleSubmit: any,
	isChosenByCuckoo: boolean[],
	itemDetail: any,
	numberOfItem: number | undefined,
	onFirstSubmit: any,
	onSecondSubmit: any,
	register: any,
	setCapacity: any,
	setItemDetail: any,
	setNumberOfItem: any,
	watch: any,
	isChosenByReal: boolean[],
	bestValueByReal: number | undefined,
	bestWeightByReal: number | undefined,
	timeByCuckoo: number | undefined,
	timeByReal: number | undefined
}
export type ItemProps = {
	value: number,
	weight: number
}
export default function IndexUI(props: IndexUIProps) {
	const {
		numberOfItem,
		itemDetail,
		capacity,
		setNumberOfItem,
		setItemDetail,
		setCapacity,
		register,
		handleSubmit,
		watch,
		errors,
		onFirstSubmit,
		onSecondSubmit,
		isChosenByCuckoo,
		bestWeightByCuckoo,
		bestValueByCuckoo,
		bestWeightByReal,
		bestValueByReal,
		isChosenByReal,
		timeByReal,
		timeByCuckoo
	} = {...props}
	return (
		<>
			<div className={'w-full flex justify-center text-2xl mb-4'}> Cuckoo Search for knapsack problem </div>
			<form className={'flex flex-col items-center'}>
				<div className="flex gap-4">
					<label htmlFor="numberOfItem" className={'w-40'}> Số món đồ </label>
					<input className={'border-2 w-20'} type="number" id="numberOfItem"
								 name="numberOfItem" {...register("numberOfItem", {
						required: true,
						min: 1,
						max: 100,
						setValueAs: (v: string) => parseInt(v)
					})}/>
					{errors.numberOfItem && <span className="text-red-500">This field is required</span>}
				</div>
				<div className="flex gap-4">
					<label htmlFor="capacity" className={'w-40'}> Khối lượng tối đa </label>
					<input className={'border-2 w-20'} type="number" id="capacity" name="capacity" {...register("capacity", {
						required: true,
						min: 1,
						max: 10000,
						setValueAs: (v: string) => parseInt(v)
					})} />
					{errors.capacity && <span className="text-red-500">This field is required</span>}
				</div>
			</form>
			<div className="w-full flex gap-4 justify-center">
				<button className={'p-2 rounded-xl border-2 hover:bg-green-500 transition-all duration-300'} type='submit' onClick={handleSubmit(onFirstSubmit)}>
					OK
				</button>
			</div>
			{numberOfItem && capacity &&
        <div className={'w-full flex flex-col items-center'}>
          <form>
						{Array.from(Array(numberOfItem).keys()).map((item, index) => {
							const [itemDetails2, setItemDetails2] = useState({value: 0, weight: 0})
							itemDetail[index] = itemDetails2
							return (
								<div className={`flex justify-around gap-4`} key={index}>
									<div className="flex gap-4 my-2">
										<label>Item {index + 1}</label>
									</div>
									<div className="flex gap-4 my-2">
										<label htmlFor={`Value${index}`}>Trị giá:</label>
										<input className={'border-2 w-20'} type="number" id={`Value${index}`} name={`Value${index}`}
													 onChange={event => {
														 setItemDetails2({value: parseInt(event.target.value), weight: itemDetails2.weight})
													 }}/>
										<label htmlFor={`Weight${index}`}>Khối lượng:</label>
										<input className={'border-2 w-20'} type="number" id={`Weight${index}`} name={`Weight${index}`}
													 onChange={event => {
														 setItemDetails2({value: itemDetails2.value, weight: parseInt(event.target.value)})
													 }}/>
									</div>
								</div>
							)
						})}
            <div className={'flex justify-around gap-4'}>
              <label htmlFor={`capacity`}>Số lượng tổ cuckoo:</label>
              <input defaultValue={50} className={'border-2 w-20'} type="number" id={`nest`}
                     name={`nest`} {...register('nest', {required: true, setValueAs: (v: string) => parseInt(v)})}/>
            </div>
            <div className={'flex justify-around gap-4'}>
              <label htmlFor={'pa'}>Xác suất bị bỏ rơi </label>
              <input className={'border-2 w-20'} type="number" defaultValue={0.25} {...register('pa', {
								required: true,
								setValueAs: (v: string) => parseFloat(v)
							})}/>
            </div>
            <div className={'flex justify-around gap-4'}>
              <label htmlFor={'iter'}>Số vòng lặp</label>
              <input className={'border-2 w-20'} type="number" defaultValue={100} {...register('iter', {
								required: true,
								setValueAs: (v: string) => parseInt(v)
							})}/>
            </div>
          </form>
          <div className="flex gap-4">
            <button className={'p-2 rounded-xl border-2 hover:bg-green-500 transition-all duration-300'} type='submit' onClick={handleSubmit(onSecondSubmit)}>
              OK
            </button>
          </div>
        </div>
			}
			{bestValueByCuckoo && bestWeightByCuckoo &&
        <div className={'flex flex-col items-center'}>
          <div className={'flex gap-4'}>
						{/*Cuckoo*/}
            <div className={'p-4 border-2 border-black'}>
              <div>
                Cuckoo
              </div>
              <div>
                <label>Best Value: {bestValueByCuckoo}</label>
              </div>
              <div>
                <label>Best Weight: {bestWeightByCuckoo}</label>
              </div>
              <div>
                <label>Time: {timeByCuckoo}</label>
              </div>
            </div>

						{/*Real*/}
            <div className={'p-4 border-2 border-black'}>
              <div>
                Real
              </div>
              <div>
                <label>Best Value: {bestValueByReal}</label>
              </div>
              <div>
                <label>Best Weight: {bestWeightByReal}</label>
              </div>
              <div>
                <label>Time: {timeByReal}</label>
              </div>
            </div>
          </div>
					<div className={'flex flex-col gap-4 my-4'}>
						{Array.from(Array(numberOfItem).keys()).map((item, index) => {
							return (
								<div className={`flex gap-4`} key={index}>
									<div className={`${isChosenByCuckoo[index] ? 'bg-green-600' : 'bg-red-600'}`}>
										Cuckoo
									</div>
									<div className="flex gap-4 my-2">
										<label>Item {index + 1}</label>
									</div>
									<div className={`${isChosenByReal[index] ? 'bg-green-600' : 'bg-red-600'}`}>
										Real
									</div>
								</div>
						)})}
					</div>
        </div>
			}
		</>
	)
}