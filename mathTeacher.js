import {OpenAI} from "openai";

const openai = new OpenAI({
    apiKey:"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",
})

const assistant = await openai.beta.assistants.create({
    name: "Math Tutor",
    instructions: "You are a personal math tutor. Write and run code to answer math questions.",
    tools: [{ type: "code_interpreter" },{
        type: "function",
        function: {
          name: "getCountryInformation",
          parameters: {
            type: "object",
            properties: {
              country: {
                type: "string",
                description: "Country name, e.g. Sweden",
              },
            },
            required: ["country"],
          },
          description: "Determine information about a country",
        },
      },],
    model:"gpt-3.5-turbo-1106",

//   });
  // const thread = await openai.beta.threads.retrieve("thread_wrqhbJxNGpeuN23ikYSXagap");
  const thread = await openai.beta.threads.create();
  const assistant = "asst_PPg1w0SGMVjjxm23VSLY9lcm"
  // const thread = "thread_wrqhbJxNGpeuN23ikYSXagap"
  // console.log( "this is the thread id for testing assistant api " + thread.id)

  // const message = await openai.beta.threads.messages.create(
  //   thread,
  //   {
 
  //     role: "user",
  //     content: "What is the definte integration of Sin(x)/x with from 0 to 3.14/2"
  //   },
  // );

  // const message = await openai.beta.threads.messages.create(
  //   thread,
  //   {
  //     role: "user",
  //     content: "I need to solve the equation `3x + 11 = 14`. Can you help me?"
  //   }
  // );

  const message = await openai.beta.threads.messages.create(
    thread.id,
    {
      role: "user",
      content: "I need to solve the equation `3x + 11 = 14`. Can you help me?"
    }
  );

  const run = await openai.beta.threads.runs.create(
    thread.id,
    { 
      assistant_id: assistant,
      instructions: "Please address the user as Gurkirat. The user has a premium account."
    }
  );

    console.log("thread id is " + thread.id)
    console.log("run id is " + run.id)
    console.log("assistant id is " + assistant.id)
    
  setTimeout(async()=>{
    const retreiveStatus = await openai.beta.threads.runs.retrieve(
        thread.id,
        run.id
      );
      const messages = retreiveStatus.status=="completed" ? await openai.beta.threads.messages.list(thread.id):"Status- In Progress"
      // console.log("this is the run id " + run.id)
    //   console.log(messages.data)
      messages.data.map((val)=>{
        return (
            console.log((val.role).toUpperCase() + ":",val.content[0].text.value )
            // console.log((val.role).toUpperCase() + ":",val.content)
            
        )
      })
},20000)

// setTimeout(async()=>{
//     const message = await openai.beta.threads.messages.create(
//         thread,
//         {
//           role: "user",
//         //   content: "I need to solve the equation `3x + 11 = 14`. Can you help me?"
//         //   content: "What is the definte integration of Sin(x)/x with from 0 to 3.14/2"
//         content:"What is the Current temperature of India"
//         },
//       );
    
    
//       const run = await openai.beta.threads.runs.create(
//         thread,
//         { 
//           assistant_id: assistant.id,
//           instructions: "Please address the user as Gurkirat. The user has a premium account."
//         }
//       );
    
    
    
//       setTimeout(async()=>{
//         const retreiveStatus = await openai.beta.threads.runs.retrieve(
//             thread,
//             run.id
//           );
//           const messages = retreiveStatus.status=="completed" ? await openai.beta.threads.messages.list(thread):"Status- In Progress"
//             console.log(messages)
//         //   console.log(messages.data)
//         console.log(retreiveStatus.status)
//           messages.data.map((val)=>{
//             return (
//                 console.log((val.role).toUpperCase() + ":",val.content[0].text.value )
//                 // console.log((val.role).toUpperCase() + ":",val.content)
                
//             )
//           })
//     },50000)
    
//   },21000)

