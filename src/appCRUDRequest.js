const appCRUDRequest = async (url=null, 
    optionsObj =null, 
    errMessage=null) =>
{
    try{
        console.log(url)
        const response = await fetch(url, optionsObj)
        if(!response.ok) throw Error("Please Try again")
    }
    catch(error){
        errMessage = error.Message
    }
    finally{
        return errMessage
    }    
}

export default appCRUDRequest