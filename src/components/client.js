
export const dataFetch = async function(str='', page=1){
    try{
        let res = await fetch(`https://stageapibc.monkcommerce.app/admin/shop/product?search=${str}&page=${page}`)
        let result = await res.json()
        if(res.ok){
            return result
        }
    }
    catch(err){
        console.error(err)
    }
}
