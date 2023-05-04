
import CardElem from './CardElem'
import VariantListItem from './VariantListItem'
import CustomCheckBox from './CustomCheckBox'
import { useEffect, useState } from 'react'
import { UseStoreContext } from './StoreContext'

const ProductListItem = function({data,checkHandler, handleClick, removedMain}){

    const {toAdd, setToAdd} = UseStoreContext()
    const [isMainChecked, setIsMainChecked] = useState(false)
    const [checkClass, setCheckClass] = useState('tickMarkOne')
    const [element, setElement] = useState(data)
    const [isPresent, setIsPresent] = useState(false)
    const [customVarList, setCustomVarList] = useState([])    
    const {variants} = data;


    useEffect(() => {
        const res = toAdd.find((elem) => {
            return elem.id === element.id;
        })
        if(res){
            setIsPresent(true)
            setIsMainChecked(true)
            setCheckClass("tickMarkOne")
            if(customVarList.length === 0){
                setCustomVarList([...variants])
            }
        }else if(!res || removedMain){
            setIsPresent(false)
            setIsMainChecked(false)
            setCheckClass('')
            setCustomVarList([])
        }
    }, [toAdd.length])

    useEffect(() => {    
        element.variants = [...customVarList]
        if(customVarList.length !==0 && !isPresent){
            setToAdd(() => {
                const updated= [...toAdd, element]
                return updated
            })
        }else if(customVarList.length === 0 && isPresent){
            setToAdd(() => {
                const updated = toAdd.filter((elem) => elem.id !== element.id)
                return updated
            })
        }else if(isPresent && customVarList.length !==0){
            let index = toAdd.indexOf(element)
            toAdd.splice(index, 1, element);
        }
    }, [customVarList.length])

    const varClickHandler = (param) => {
        const result = customVarList.find((elem) => {
            return elem.id === param.id;
        })
        if(result){
            console.log(result)
            setCustomVarList(() => {
                const updated = customVarList.filter((elem) => elem.id !== param.id)
                return updated
            })
        }else{
            setCustomVarList(() => {
                const updated = [...customVarList, param];
                return updated
            })
        }
    }


   

    return(
        <section className=''>
            <CardElem onClick={handleClick}  className={`cursor-pointer py-[12.5px] flex gap-[15px] items-center`}>
                <CustomCheckBox checked={isMainChecked} handleCheck={checkHandler}  className={isMainChecked?checkClass:''}/>
                <img alt='' src={data.image.src} className='w-[36px] h-[36px] rounded-[4px]'/>
                <p className='text-[16px] leading-[24px] sfRegular'>{data.title}</p>
            </CardElem>
            <div>
                {   
                    variants?.map(elem => 
                        <VariantListItem key={elem.id} varClickHandler={() =>varClickHandler(elem)}  data={elem} customVarList={customVarList}/>
                    )
                }
            </div>

        </section>
    )
}

export default ProductListItem