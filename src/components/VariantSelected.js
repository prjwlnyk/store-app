import { useEffect, useMemo, useRef, useState } from 'react'
import closeVector from '../assets/images/closeVector.png'
import dragBtn from '../assets/images/dragBtn.png'

const VariantSelected = function({idx, variant, removeFunction, variantList, addDiscount, discountVal, selectVal}) {
    const [varDiscount, setVarDiscount] = useState(null)
    const [selectValue, setSelectValue] = useState(null)
    const inputRef = useRef()

    useEffect(() => {
        setVarDiscount(discountVal)
    }, [discountVal])

    useEffect(() => {
        setSelectValue(selectVal)
    }, [selectVal])

    const discountHandler = (e) => {
        setVarDiscount(() => {
            const updated = e.target.value;
            return updated
        })
    }

    const selectHandler = (e) => {
        setSelectValue(() => {
            const updated = e.target.value;
            return updated
        })
    }

    const discountType = useMemo(() => {
        return selectValue
    }, [selectValue])

    const discountValue = useMemo(() => {
        return varDiscount
    }, [varDiscount])

    return(
    <section className='flex items-center '>
        <img src={dragBtn} alt="" className='w-[7px] h-[14px]'/>

        {/* Select Button */}
        <div className={`ml-[10px] ${!addDiscount? 'w-[400px]' : 'w-[184px]'} rounded-[30px] border-[1px] border-solid border-[#000000] border-opacity-[0.07]  bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.1)] px-[10px] py-[4px] flex justify-between items-center`}>
            <p className='text-[14px] leading-[21px] sfRegular text-[#000000] text-opacity-80 max-w-[180px] overflow-x-auto'>{variant.title}</p>
        </div>
        {/* End of Select Button */}
        

        {/* discount Inputs */}
        {
            addDiscount &&
            <div className='ml-[12px] flex gap-[3px]'>
                <input type='text' ref={inputRef} value={discountValue} onChange={(e) => discountHandler(e)} className='w-[69px] h-[31px] rounded-[30px] text-[14px] leading-[20px] sfRegular border-[1px] border-solid border-[#000000] border-opacity-10 shadow-[0px_2px_4px_rgba(0,0,0,0.1)] focus:outline-none pl-[14px]'/>
                <div className='text-[14px] leading-[20px] rounded-[30px] sfRegular flex items-center  px-[8px] py-[5px] w-[95px] h-[31px] shadow-md border-[1px] border-solid border-[#000000] border-opacity-10'>
                    <select value={discountType} onChange={(e) => selectHandler(e)} className='w-full h-full focus:outline-none cursor-pointer'>
                        <option>% Off</option>
                        <option>flat off</option>
                    </select>
                </div>
            </div>
        }
        {/* End of Discount Inputs */}

        {   
            variantList.length >=2 &&
            <button onClick={()=> removeFunction(variant)} className='ml-[10px]'>
                <img src={closeVector} alt='' className='w-[12px] h-[12px]'/>
            </button>
        }


    </section>
    )
}

export default VariantSelected