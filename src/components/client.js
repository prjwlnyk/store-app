


export const dataFetch = async function(str='', page=1){

    try{
        let res = await fetch(`https://stageapibc.monkcommerce.app/admin/shop/product?search=${str}&page=${page}`)
        let result = await res.json()
        
        if(res.ok){
            console.log(result)
            console.log(result[0].variants.length)
            const filtered  = result.filter((elem) => elem.variants.length !== 0)
            if(filtered.length === result.length){
                return filtered
            }
            else {
                console.log("INCOMPLETE")
            }
        }
    }
    catch(err){
        console.error(err)
    }
}
