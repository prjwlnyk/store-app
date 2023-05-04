

const CardElem = function({ onClick, children, className='', ...props}){

    return(
        <div onClick={onClick} {...props} className="border-b-[1px] border-black border-solid border-opacity-10 px-[28px] block w-full">
            <div className={`${className}`}>
                {children}
            </div>
        </div>
    )
}

export default CardElem