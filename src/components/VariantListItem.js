import { useEffect, useState } from "react"
import CardElem from "./CardElem"
import CustomCheckBox from "./CustomCheckBox"


const VariantListItem = function({ varClickHandler, data, customVarList}){

    // const [Var, setVar] = useState(data)
    const [isVarPresent, setIsVarPresent] = useState(false)

    useEffect(() => {
        const result = customVarList.find((elem) => {
            return elem.id === data.id;
        })
        if(result){
            setIsVarPresent(true)
        }else if(!result){
            setIsVarPresent(false)
        }
    }, [customVarList.length])


    
    return(
        <CardElem onClick={varClickHandler}>
            <div className="cursor-pointer py-[16px] pl-[42px] text-[16px] leading-[24px] sfRegular flex justify-between">
                <div className="flex gap-[23px]">
                    <CustomCheckBox checked={isVarPresent} handleCheck={varClickHandler} className={isVarPresent?'tickMarkOne':''}/>
                    <p>{data.title}</p>
                </div>
                <div className="flex justify-between w-[170px]">
                    {
                        data.inventory_quantity?
                        <p>{data.inventory_quantity} available</p> :
                        <p></p>
                    }
                    <p>${data.price}</p>
                </div>
            </div>
        </CardElem>
    )
}

export default VariantListItem