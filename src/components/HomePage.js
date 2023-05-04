
import AddNewProduct from "./AddNewProduct"
import SelectCard from "./SelectCard"
import MainSelected from './MainSelected'
import { UseStoreContext } from "./StoreContext"
import { useEffect, useState } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"

const HomePage = function(){

    const storeDetails = UseStoreContext()
    const {showPopUp, selectedProducts, setSelectedProducts} = storeDetails;
    const [showPreAddSection, setShowPreAddSection] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(null)
    const [showAddBtn, setShowAddBtn] = useState(true)


    const preAddHandler = () => {
        setShowPreAddSection(true)
    }

    useEffect(() => {
        setShowPreAddSection(false)
    }, [selectedProducts.length])

    const dragStartHandler = () => {
        setShowAddBtn(false)
    }

    const dragEndHandler = (result) => {
        if(!result.destination){
            return
        }

        const items = [...selectedProducts];
        // taking it from source
        const [reorderedItem] = items.splice(result.source.index, 1); 
        // adding it in destination
        items.splice(result.destination.index, 0, reorderedItem);

        setSelectedProducts(items)
        setShowAddBtn(true)
    }

    return(<>
            { showPopUp &&  <SelectCard selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}/>}

            <section className="max-w-[465px] mx-auto">
                <div className="pt-[60px] relative z-[50] bg-white">

                    <h1 className="sfSemiBold text-[16px] leading-[24px] text-[#202223]">Add Products </h1>
                    <div className="mt-[33px]">

                        {/* Headings */}
                            {
                                selectedProducts.length >=1 || showPreAddSection &&
                                <div className="text-[14px] leading-[16px] sfMedium text-[#000000] text-opacity-90 flex gap-[170px] pl-[50px] mb-[16px]">
                                    <p>Product</p>
                                    <p>Discount</p>
                                </div>
                            }
                        {/* End of Headings */}

                        {/* Selected Product List */}
                        <DragDropContext onDragEnd={dragEndHandler} onDragStart={dragStartHandler}>
                            <Droppable droppableId={'productList'}>
                                {(provided) => (
                                    <div ref={provided.innerRef} {...provided.droppableProps}>
                                        {
                                            selectedProducts.map((elem, index) =>
                                                <Draggable key={`${elem.id}`} draggableId={`${elem.id}`} index={index}>
                                                   {(provided) => (
                                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                        <MainSelected key={elem.id} index={index} product={elem} setSelectedIndex={setSelectedIndex} dragStartHandler={dragStartHandler} />
                                                    </div>
                                                    )}
                                                </Draggable>
                                            )}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                        {/* End of Selected Product List */}
                        
                        {/* Add New Product */}
                        {
                            showPreAddSection &&
                            <div className="pt-[16px] flex justify-end">
                                <AddNewProduct />
                            </div>
                        }
                        {/*End of  Add New Product */}
                    </div>

                    {/* Add Product Button */}
                    {
                        showAddBtn &&
                        <div className="w-full flex justify-end  mt-[43px] relative z-[0]"> 
                            <button onClick={preAddHandler} className="w-[193px] h-[48px] border-[2px] border-[#008060] rounded-[4px] bg-white text-[14px] leading-[16px] sfSemiBold text-[#008060]">
                                Add Product
                            </button>
                        </div>
                    }

                    {/* End of Add Product Button */}

                </div>
            </section>
        </>
    )
}

export default HomePage