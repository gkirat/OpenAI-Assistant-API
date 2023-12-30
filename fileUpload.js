import {OpenAI} from "openai";
// import { fetch } from "node-fetch";
import fs from "fs";
import { sleep } from "openai/core";

const openai = new OpenAI({
    apiKey:"Enter your own API key "
});

// try{
//     const contactList =  await openai.files.create({ file: fs.createReadStream("./data/contacts.csv"), purpose: 'assistants' });
//     // const toDoList =  await openai.files.create({ file: fs.createReadStream("/data/todoitems.csv"), purpose: 'assistants' });
//     const accounts =  await openai.files.create({ file: fs.createReadStream("./data/accounts.csv"), purpose: 'assistants' });
//     const leads =  await openai.files.create({ file: fs.createReadStream("./data/leads.csv"), purpose: 'assistants' });
//     const opportunities =  await openai.files.create({ file: fs.createReadStream("./data/opportunities.csv"), purpose: 'assistants' });
//     console.log("This is the contact list"+ contactList.id)
//     console.log("This is the accounts list"+ accounts.id)
//     console.log("This is the leads list"+ leads.id)
//     console.log("This is the opportunities list"+ opportunities.id)
// }catch(error){
//     console.log(error)
// }
const contactList =  "file-aejokXzGCwnHlgZOKoeK0MbT";
const accounts = "file-YXKgY3zi7joTE8vpSr0rdswR";
const leads = "file-ZFRpIkLFtJUS6WgWYpWwu2xq";
const opportunities = "file-A3U9kQEFsRAJVAfstKg4QoPf";

// const assistant = await openai.beta.assistants.create({
//     name: "Contact query chatbot",
//     // instructions: "You are a chatbot who provides the information about what users asks from the 4 files that I have provided you and if user asks about someone's contact information and there are two or more same first names that exist in the contacts file kindly ask the user about which contact details the user wants from the similar names",
//     instructions:"As a chatbot, I extract information from the files you've provided. When a user inquires about someone's information, I search through all the file data without exception.Once I have found the information I will again search the file to see If there are multiple individuals with the same first name in the file, if there are then I will prompt the user to specify which contact details they are interested in, but only if there are multiple individuals sharing the same first name.",
//     tools: [{ type: "code_interpreter" }],
//     model:"gpt-3.5-turbo-1106",
//     file_ids:[contactList,accounts,leads,opportunities]
// });
// console.log(assistant.id);

const assistant = "asst_b2GkOvc9eSHuYdBL1dJRpZ5C";

const addToThread = async (client,threadId,userQuestion) =>{
    const message = await client.beta.threads.messages.create(
        threadId,
        {
          role: "user",
          content: userQuestion
        }
      );
      return message;
}


const askInfo = async (client,assistant,threadId,message) => {
    if(threadId==="undefined" || threadId === null){
        console.log("This is if block being runned");
        const thread =  await client.beta.threads.create(); 
        console.log("this the thread id" + thread.id)
        addToThread(client,thread.id,message)
        const run = await client.beta.threads.runs.create(
            thread.id,
            { 
              assistant_id: assistant,
              instructions: "Please address the user as Gurkirat. The user has a premium account."
            }
          );
        let status = ""
        while(status !=="completed"){
            const retreiveStatus = await client.beta.threads.runs.retrieve(
                thread.id,
                run.id
              );
            
              console.log(retreiveStatus.status)
              status=retreiveStatus.status
              const messages = retreiveStatus.status=="completed" ? await client.beta.threads.messages.list(thread.id):"Status- In Progress";
              if(retreiveStatus.status === "completed"){
                  messages.data.map((val)=>{
                    return (
                        console.log((val.role).toUpperCase() + ":",val.content[0].text.value )
                        // console.log((val.role).toUpperCase() + ":",val.content)
                        
                    )
                  })
              }
              await sleep(3000)
        }

        
    }
    else{
        console.log("this is else block being runned")
        addToThread(client,threadId,message)
        const run = await client.beta.threads.runs.create(
            threadId,
            { 
              assistant_id: assistant,
              instructions: "Please address the user as Gurkirat. The user has a premium account."
            }
          );
        let status = ""
        while(status !=="completed"){
            const retreiveStatus = await client.beta.threads.runs.retrieve(
                threadId,
                run.id
              );
              console.log(retreiveStatus.status)
              const messages = retreiveStatus.status=="completed" ? await client.beta.threads.messages.list(threadId):"Status- In Progress";
              if(retreiveStatus.status === "completed"){
                  messages.data.map((val)=>{
                    return (
                        console.log((val.role).toUpperCase() + ":",val.content[0].text.value )
                        // console.log((val.role).toUpperCase() + ":",val.content)
                        
                    )
                  })
              }

              status=retreiveStatus.status
              await sleep(3000)
        }
    }
}

askInfo(openai,assistant,"thread_6f6Pso7qnRq9hpUnYAVacoaI","Could you please summarise the account of Bartlett, Pace and Thomas?")

// const threadId = "thread_jbolbJoO1QfT2VUqMpJlMpt2"
// const assistant = "asst_BppMqlkDAwvzzNBUW2QGiW77";