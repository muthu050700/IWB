const localURL = "http://localhost:3001/data"
const netlifyURL = "https://vite-project-bo93.onrender.com/data"
//GET Api
 export const fetchData = async () => {
    const res = await fetch(netlifyURL);
    return  await res.json();
    
  };

//Delete Api

export const deleteData = async (id)=>{
    const res = await fetch(`${netlifyURL}/${id}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json;charset=utf-8"
        }
    })
    return await res.json()
}

//update the data 

export const updateData = async(id,updatedData)=>{

    const res = await fetch(`${netlifyURL}/${id}`,{
        method:"PUT",
        headers:{
             "Content-Type":"application/json;charset=utf-8",        
        },
        body: JSON.stringify(updatedData)
    })
    const data =  await res.json();

}


// Create a new data

export const createNewData = async (newData) => {

    try {
      const response = await fetch(netlifyURL, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(newData), 
      });
  
      if (response.ok) {
        const result = await response.json(); 
       
      } else {
        console.error('Failed to create data:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error creating data:', error);
    }
  };
  