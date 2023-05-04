import { useState } from 'react'
import editBtn from '../assets/images/editBtn.png'
import closeVector from '../assets/images/closeVector.png'
import showVariant from '../assets/images/showVariant.png'
import dragBtn from '../assets/images/dragBtn.png'
import VariantSelected from './VariantSelected'
import { UseStoreContext } from './StoreContext'
import { DragDropContext, Draggable, Droppable} from '@hello-pangea/dnd'


const MainSelected = function({index, product, setSelectedIndex, dragStartHandler}){

    const [discountVal, setDiscountVal] = useState('0')
    const [selectVal, setSelectVal] = useState(null)
    const [addDiscount, setAddDiscount] = useState(false)
    const [showVariants, setShowVariants] = useState(true)
    const {variants} = product;
    const [variantList, setVariantList] = useState(variants)

    const storeDetails = UseStoreContext()
    const {selectedProducts, setSelectedProducts, setShowPopUp} = storeDetails;

    
    const discountHandler = (e) => {
        setDiscountVal(() => {
            const updated = e.target.value;
            return updated
        })
    }

    const selectHandler = (e) => {
        setSelectVal(() => {
            const updated = e.target.value;
            return updated
        })
    }

    const removeProductFunction = () => {
        setSelectedProducts(() => {
            const updated = selectedProducts.filter((elem) => elem.id !== product.id);
            return updated;
        })
    }

    const showVariantHandler = () => {
        setShowVariants(!showVariants)
    }

    const discountBtnFunc = () => {
        setAddDiscount(true)
    }

    const addProductFunction = () => {
        setSelectedIndex(index)
        setShowPopUp(true)
    }

    const removeVariantFunction = (param) => {
        setVariantList(() => {
            const updated = variantList.filter((elem) => elem.id !== param.id)
            return updated;
        })
    }

    const dragEndHandler = (result)  => {
        if (!result.destination) {
          return;
        }
        
        const items = [...variantList];
        
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setVariantList(items)
      }


    return(
        <section className='max-w-[465px] relative z-[45] bg-white'>
            <div className='pt-[16px] lg:pb-[30px] '>

                {/* Main details */}
                <div className='flex items-center '>
                    <img src={dragBtn} alt="" className='w-[7px] h-[14px]  mr-[13px]'/>
                    <p className='sfRegular text-[14px] leading-[16px] text-[#000000] text-opacity-80'>{index + 1}.</p>

                    {/* Select Button */}
                    <div className='ml-[8px] w-[250px] border-[1px] border-solid border-[#000000] border-opacity-[0.07]  bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.1)] px-[10px] py-[4px] flex justify-between items-center'>
                        <p className='text-[14px] leading-[21px] sfRegular text-[#000000] text-opacity-80 max-w-[180px] overflow-x-auto'>{product.title}</p>
                        <button onClick={addProductFunction}>
                            <img src={editBtn}  alt='' className='w-[16px] h-[16px] cursor-pointer'/>
                        </button>

                    </div>
                    {/* End of Select Button */}

                    {/* Discount Button */}
                    {
                        !addDiscount && 
                        <button onClick={discountBtnFunc} className='ml-[13px] w-[141px] h-[32px] bg-[#008060] rounded-[4px] text-white text-[14px] leading-[16px] sfSemiBold'>
                            Add Discount
                        </button>
                    }
                    {/* End of Discount Button */}
                    

                    {/* discount Inputs */}
                    {
                        addDiscount &&
                        <form className='ml-[12px] flex gap-[3px]'>
                            <input type='text' value={discountVal} onChange={(e) => discountHandler(e)} className='w-[69px] h-[31px] text-[14px] leading-[20px] sfRegular border-[1px] border-solid border-[#000000] border-opacity-10 shadow-[0px_2px_4px_rgba(0,0,0,0.1)] focus:outline-[#008060] pl-[14px]'/>
                            <div className='text-[14px] leading-[20px] sfRegular flex items-center w-[95px] h-[31px] shadow-md border-[1px] border-solid border-[#000000] border-opacity-10'>
                                <select value={selectVal} onChange={(e) => selectHandler(e)} className='w-full  px-[8px] h-full focus:outline-[#008060] cursor-pointer'>
                                    <option>% Off</option>
                                    <option>flat off</option>
                                </select>
                            </div>
                        </form>
                    }
                    {/* End of Discount Inputs */}

                    {/* Remove Product Button */}
                    {
                    selectedProducts?.length >=2 &&
                    <button onClick={removeProductFunction} className='ml-[13px]'>
                        <img src={closeVector} alt='' className='w-[12px] h-[12px]'/>
                    </button>
                    }
                    {/* End of Remove Product Button */}

                </div>
                {/* End of Main details */}   

                {/* show/Hide Variants */}
                {
                variantList.length!==1 &&
                <div className='w-full flex justify-end mt-[6px]'>
                    <button onClick={showVariantHandler} className='flex gap-[4px] items-center'>
                        <p className='text-[12px] leading-[20px] sfRegular text-[#006eff] underline'>{showVariants? 'Hide variants': 'Show Variants'}</p>
                        <img src={showVariant} alt='' className={`w-[12px] h-[9px] ${showVariants?'':'rotate-180' }`}/>
                    </button>
                </div>
                }
                {/* End of Show/Hide Variants */}

                {/* Variant List*/}
                {
                    showVariants &&
                    <DragDropContext onDragStart={dragStartHandler} onDragEnd={dragEndHandler}>
                        <Droppable droppableId={'variantList'}>
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef} className='pl-[60px] pt-[18px] flex flex-col gap-[20px]'>
                                    {
                                        variantList.map((elem, index) => 
                                            <Draggable key={`${elem.id}`} draggableId={`${elem.id}`} index={index}>
                                                {(provided) => (
                                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                        <VariantSelected  idx={index} variant={elem} removeFunction={removeVariantFunction} variantList={variantList} addDiscount={addDiscount} discountVal={discountVal} selectVal={selectVal}/>
                                                    </div>
                                                )}
                                            </Draggable>
                                        )
                                    }
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                }
                {/* End of Variant List */}

            </div>
            <hr  className='w-[431px] h-[1.5px] bg-[#000000] bg-opacity-10 absolute bottom-0 right-0'/>
        </section>
    )
}

export default MainSelected