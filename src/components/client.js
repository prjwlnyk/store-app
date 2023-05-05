


export const dataFetch = async function(str='', page=1){

    try{
        let res = await fetch(`https://stageapibc.monkcommerce.app/admin/shop/product?search=${str}&page=${page}`)
        let result = await res.json()
        if(res.ok){
            const filtered  = result.filter((elem) => elem.variants.length >= 1)
            if(filtered.length >=1){
                console.log(filtered)
                return filtered
            }else{
                console.log('empty')
            }
        }
    }
    catch(err){
        console.error(err)
    }
}


