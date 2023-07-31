import {useState} from "react";

export type IndexUIProps = {
    numberOfItem: number | undefined,
    itemDetail: any,
    capacity: number | undefined,
    setNumberOfItem: any,
    setItemDetail: any,
    setCapacity: any,
    register: any,
    handleSubmit: any,
    watch: any,
    errors?: any,
    onFirstSubmit: any,
    onSecondSubmit: any,
    isChosen : boolean[],
}
export type ItemProps={
    value: number,
    weight: number
}
export default function IndexUI(props: IndexUIProps)
{
    const {numberOfItem, itemDetail, capacity, setNumberOfItem, setItemDetail, setCapacity, register, handleSubmit, watch, errors, onFirstSubmit, onSecondSubmit, isChosen} = {...props}
    return(
        <>
            <form >
                <div className="flex gap-4">
                    <label htmlFor="numberOfItem">Number of item</label>
                    <input className={'border-2 w-1/2'} type="number" id="numberOfItem" name="numberOfItem" {...register("numberOfItem", {required: true, min: 1, max: 100, setValueAs: (v:string) => parseInt(v) })}/>
                    {errors.numberOfItem && <span className="text-red-500">This field is required</span>}
                </div>
                <div className="flex gap-4">
                    <label htmlFor="capacity">Capacity</label>
                    <input className={'border-2 w-1/2'} type="number" id="capacity" name="capacity" {...register("capacity", {required: true, min: 1, max: 100, setValueAs: (v:string) => parseInt(v)})} />
                    {errors.capacity && <span className="text-red-500">This field is required</span>}
                </div>
            </form>
            <div className="flex gap-4">
                <button className={'p-1 border-4'} type='submit' onClick={handleSubmit(onFirstSubmit)}>
                    OK
                </button>
            </div>
            {numberOfItem && capacity &&
              <div>
                <form>
                    {Array.from(Array(numberOfItem).keys()).map((item, index) => {
                        const [itemDetails2, setItemDetails2] = useState({value: 0, weight: 0})
                        itemDetail[index] = itemDetails2
                        return (
                            <div className={`flex gap-4 ${isChosen.length === numberOfItem && !isChosen[index] && 'bg-red-500'}`} key={index}>
                                <div className="flex gap-4 my-2" >
                                    <label>Item {index+1}</label>
                                </div>
                                <div className="flex gap-4 my-2" >
                                    <label htmlFor={`Value${index}`}>Value:</label>
                                    <input className={'border-2 w-20'} type="number" id={`Value${index}`} name={`Value${index}`}
                                           onChange={ event => {setItemDetails2({value: parseInt(event.target.value), weight: itemDetails2.weight})}} />
                                    <label htmlFor={`Weight${index}`}>Weight:</label>
                                    <input className={'border-2 w-20'} type="number" id={`Weight${index}`} name={`Weight${index}`}
                                           onChange={ event => {setItemDetails2({value: itemDetails2.value, weight: parseInt(event.target.value)})}} />
                                </div>
                            </div>
                        )
                    })}
                </form>
                <div className="flex gap-4">
                    <button className={'p-1 border-4'} type='submit' onClick={handleSubmit(onSecondSubmit)}>
                        OK
                    </button>
                </div>
              </div>
            }
        </>
    )
}