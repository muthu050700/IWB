 //GET Api
 export const fetchData = async () => {
    const res = await fetch("http://localhost:3001/data");
     return await res.json();
  };

//Delete Api

export const deleteData = async (id)=>{
    const res = await fetch(`http://localhost:3001/data/${id}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json;charset=utf-8"
        }
    })
    return await res.json()
}

//update the data 

export const updateData = async(id,updatedData)=>{

    const res = await fetch(`http://localhost:3001/data/${id}`,{
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
      const response = await fetch('http://localhost:3001/data', {
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
  