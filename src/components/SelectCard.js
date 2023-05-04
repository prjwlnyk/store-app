import '../App.css'
import xVector from '../assets/images/xVector.png'
import CardElem from './CardElem'
import searchVector from '../assets/images/searchVector.png'
import ProductListItem from './ProductListItem'
import { dataFetch } from './client'
import { useEffect, useRef, useState } from 'react'
import { UseStoreContext } from './StoreContext'


const SelectCard = function({selectedIndex, setSelectedIndex}){

    const [productList, setProductList] = useState([])
    const [removedMain, setRemovedMain] = useState(false)
    const [searchInput, setSearchInput] = useState('')
    const [page, setPage] = useState(1)
    const storeDetails = UseStoreContext()
    const { toAdd, setToAdd, selectedProducts, setSelectedProducts, setShowPopUp} = storeDetails;
    const selectRef = useRef(null)


    // Fetching List
    const productFetch= async function(){
        const list = await dataFetch(searchInput, page);
        if(list){
            setProductList(list)
            selectRef.current.scrollTop = 0;
        }
    }

    const scrollHandler = () => {
        if(selectRef.scrollTop == 0){
            setPage((prev) => prev -1)
        } else
       if( selectRef.current.scrollHeight - selectRef.current.scrollTop === (selectRef.current.clientHeight)){
            setPage((prev) => prev + 1)
       }
    }


    useEffect(() => {
        productFetch()
    }, [searchInput, page])
    // End of Fetching List

    const searchFunction = (e) => {
        setSearchInput(() => {
            const newSearch = e.target.value;
            return newSearch
        })
        setPage(1)
    }

    const addHandler = () => {
        if(selectedIndex !== null){
            setSelectedProducts(() => {
                const newArr = [...selectedProducts]
                newArr.splice(selectedIndex, 1, ...toAdd)
                console.log(newArr)
                return newArr
            })
        }else{
            setSelectedProducts(() => {
                const updated = [...selectedProducts, ...toAdd]
                console.log(updated)
                return updated
            })
        }
        setShowPopUp(false)
        setToAdd([])
        setPage(0)
    }

    const cancelHandler=() => {
        setToAdd([]);
        setShowPopUp(false)
        // setPage(1)
    }


    const handleClick = (param) => {
        setRemovedMain(false)
        const result = toAdd.find((elem) => {
            return elem.id === param.id;
        })
        if(result){
            setToAdd(() => {
                const updated = toAdd.filter((elem) => elem.id !== param.id)
                return updated
            })
            console.log(toAdd)
            setRemovedMain(true)
        } else{
            setToAdd(() => {
                let updated = [...toAdd, param]
                console.log(updated)
                return updated
            })
        }
    }
    

    return(
        <section className="selectCard">
            <div className='w-full h-full relative flex justify-center items-center'>
                <div className=' z-[70] w-[663px] rounded-[4px] bg-white sfRegular'>

                    {/* Heading*/}
                    <CardElem className='flex justify-between  pt-[14px] pb-[6.5px] '>
                        <p className='sfMedium text-[18px] leading-[27px] text-black opacity-90'>Select Products</p>
                        <img onClick={cancelHandler} alt="" src={xVector} className='cursor-pointer w-[17px] h-[17px] object-cover my-auto'/>
                    </CardElem>
                    {/* End of Heading */}

                    {/* Search Box */}
                    <CardElem className='py-[8.5px] pr-[7px]'>
                        <div className='flex items-center px-[18px] gap-[6px] w-full h-[32px] border-[1px] border-black border-opacity-[0.07] border-solid'>
                            <img src={searchVector} alt='' className='w-[17px] h-[17px]'/> 
                            <input type='text' placeholder='Search Product' value={searchInput} onChange={(e) => searchFunction(e)} className='w-full h-full focus:outline-none sfRegular px-[7px]'/>
                        </div>
                    </CardElem>
                    {/* End of Search Box */}

                    {/* Product List */}
                    <div onScroll={scrollHandler} ref={selectRef} className='min-h-[96px] max-h-[400px] overflow-y-auto'>
                        {   
                            productList.length > 0 ?

                            productList?.map(elem => 
                                <ProductListItem key={elem.id} data={elem} checkHandler={() =>handleClick(elem)} handleClick={() =>handleClick(elem)} removedMain={removedMain}/>
                            )

                            : 
                            
                            <p className='text-[24px] leading-[32px] sfRegular text-[#008060] text-center p-[24px]'>Loading...</p>
                       
                        }
                    </div>
                    {/* End of Product List */}

                    {/* Product selected and Buttons */}
                    <div className='px-[24px] h-[48px] flex justify-between items-center border-t-[1px] border-solid border-[#000000] border-opacity-10'>
                        <p className='text-[16px] leading-[24px]'>{toAdd.length} product selected</p>
                        <div className='text-[14px] leading-[20px] sfSemiBold flex gap-[10px]'>
                            <button onClick={cancelHandler} className='text-[#000000] text-opacity-[0.6] py-[6px] px-[28px] border-[1px] rounded-[4px] border-[#000000] border-opacity-[0.4] border-solid'>
                                Cancel
                            </button>
                            <button onClick={addHandler} className='text-white px-[22px] py-[6px] rounded-[4px] bg-[#008060]'>
                                Add
                            </button>
                        </div>
                    </div>
                    {/* End of Product selected and Buttons  */}
                </div>
            </div>
        </section>
    )
}

export default SelectCard