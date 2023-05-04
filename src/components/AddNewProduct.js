
import dragBtn from '../assets/images/dragBtn.png'
import editBtn from '../assets/images/editBtn.png'
import { UseStoreContext } from './StoreContext'

const AddNewProduct = function(){

    const storeDetails = UseStoreContext();
    const {setShowPopUp, setToAdd, selectedProducts} = storeDetails;

    const addNewProduct = () => {
        setToAdd([]);
        setShowPopUp(true)
    }

    return(
        <section className='flex items-center gap-[12px] pr-[30px] '>
            <img src={dragBtn} alt='' className='w-[7px] h-[14px] '/>
            <div className='flex items-center'>
                <p className='sfRegular text-[14px] leading-[16px] text-[#000000] text-opacity-80'>{selectedProducts.length + 1}.</p>

                <div className='ml-[8px] w-[250px] h-[32px] justify-between bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.1)] px-[10px] flex items-center'>
                    <p className='text-[14px] leading-[21px] sfRegular text-[#000000] text-opacity-50 overflow-x-auto'>Select Product</p>
                    <img src={editBtn} alt='' onClick={addNewProduct} className='w-[16px] h-[16px] cursor-pointer'/>
                </div>

                <button className='ml-[13px] w-[141px] h-[32px] bg-[#008060] rounded-[4px] text-white text-[14px] leading-[16px] sfSemiBold'>
                Add Discount
                </button>
            </div>
        </section>
    )
}

export default AddNewProduct