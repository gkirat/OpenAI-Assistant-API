import {OpenAI} from "openai";

const openai = new OpenAI({
    apiKey:"Enter your own API key",
})

// const thread = "thread_V0oJwsTX8v4diP4p0BUvriDz"
// const run = "run_bZUN9pfTdUSuBObnuUAwfgGN"
const assistant = "asst_rLpwSJRYps4X3oerRH9Kjq6k"

// const retreiveStatus = await openai.beta.threads.runs.retrieve(
//     thread,
//     run
//   );
 let thread = await openai.beta.threads.create();
 thread = thread.id
    const message = await openai.beta.threads.messages.create(
        thread,
        {
          role: "user",
        //   content: "I need to solve the equation `3x + 11 = 14`. Can you help me?"
          content: "What is the definte integration of Sin(x)/x with from 0 to 3.14/2"
        // content:"What is the Current temperature of India"
        },
      );

      const run = await openai.beta.threads.runs.create(
        thread,
        { 
          assistant_id: assistant,
          instructions: "Please address the user as Gurkirat. The user has a premium account."
        }
      );
    
    
    //   const run = await openai.beta.threads.runs.create(
    //     thread,
    //     { 
    //       assistant_id: assistant.id,
    //       instructions: "Please address the user as Gurkirat. The user has a premium account."
    //     }
    //   );
    
    
    let status = ""
    //   setTimeout(async()=>{
while(status !== "completed"){

    const retreiveStatus = await openai.beta.threads.runs.retrieve(
        thread,
        run.id
      );

        const messages = retreiveStatus.status=="completed" ? await openai.beta.threads.messages.list(thread):"Status- In Progress"
        // console.log(messages)
        console.log("this is the status" + retreiveStatus.status)

        if(retreiveStatus.status === "completed"){
            messages.data.map((val)=>{
              return (
                  console.log((val.role).toUpperCase() + ":",val.content[0].text.value )
                  // console.log((val.role).toUpperCase() + ":",val.content)
                  
              )
            })
        }
        status=retreiveStatus.status
}

const message1 = await openai.beta.threads.messages.create(
    thread,
    {
      role: "user",
      content: "I need to solve the equation `3x + 11 = 14`. Can you help me?"
    //   content: "What is the definte integration of Sin(x)/x with from 0 to 3.14/2"
    // content:"What is the Current temperature of India"
    },
  );

  const run1 = await openai.beta.threads.runs.create(
    thread,
    { 
      assistant_id: assistant,
      instructions: "Please address the user as Gurkirat. The user has a premium account."
    }
  );


  let status1 = ""
    //   setTimeout(async()=>{
while(status1 !== "completed"){
    try{

        const retreiveStatus = await openai.beta.threads.runs.retrieve(
            thread,
            run1.id
          );
    
            const messages = retreiveStatus.status=="completed" ? await openai.beta.threads.messages.list(thread):"Status- In Progress"
            // console.log(messages)
            console.log("this is the status1" + retreiveStatus.status)
    
            if(retreiveStatus.status === "completed"){
                messages.data.map((val)=>{
                  return (
                      console.log((val.role).toUpperCase() + ":",val.content[0].text.value )
                      // console.log((val.role).toUpperCase() + ":",val.content)
                      
                  )
                })
            }
            if(retreiveStatus.status === "failed"){
                console.log(retreiveStatus)
            }
            status1=retreiveStatus.status
    }catch(error){
        console.log(error)
    }
}










        //   }
        //   console.log(messages.data)

    // },20000)
    

//   console.log(retreiveStatus.status)