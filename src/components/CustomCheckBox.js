

const CustomCheckBox = function({checked, handleCheck, className}){


    return(
        <label className="checkContainer pr-[12px]">
            <input type="checkbox" checked={checked} onChange={handleCheck} />
            <span className={`geekmark ${className}`}></span>
        </label>
    )
}

export default CustomCheckBox