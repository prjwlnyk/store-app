


export const dataFetch = async function(str='', page=1){

    try{
        let res = await fetch(`https://stageapibc.monkcommerce.app/admin/shop/product?search=${str}&page=${page}`)
        let result = await res.json()
        
        if(res.ok){
            const filtered  = result.filter((elem) => elem.variants.length !== 0)

            if(filtered.length === result.length){
                return filtered
            }
        }
    }
    catch(err){
        console.error(err)
    }
}
