class ChatEngine{
    constructor(userName){
        this.userName = userName
        this.socket = io.connect('http://localhost:3000')
        
        if(this.userName){
            this.connectionHandler()
        }
    }

    connectionHandler(){
        this.chat = document.getElementById('chat')
        this.chatBox = document.querySelector('#chat_messages')
        this.users_online = document.querySelector('#users_online')
        this.online = document.querySelector('#online')

        this.socket.on('connection',function(socket){
            console.log('user connected')
        })

        this.socket.on('disconnect',function(){
            console.log('user disconnected')
        })

        // function to send message when user clicks send button
        this.sendMessage=()=>{
            this.socket.emit('message',{
                User:this.userName,
                Message : this.chat.value
            })
            this.chat.value=''
        }
        
        this.socket.on('send',(data)=>{
            if(data.Message!=''){
                this.chatBox.innerHTML+=`<div><li data-user="sender">${data.Message}</li></div>`
                this.chatBox.scrollTop=this.chatBox.scrollHeight
            }
            else{
                alert('Please Type Something..')
            }
        })

        this.socket.on('receive',(data)=>{
            this.chatBox.innerHTML+= `<div><li data-user="receiver">${data.User}: ${data.Message}</li></div>`
        })

        // ///////////////////////////

        //  events that occurs when  new userconnected
        this.socket.emit('new-user-connected',this.userName)

        this.socket.on('new-user-joined',(username)=>{
            this.userJoinLeft(username,"joined")
        })

        this.socket.on('user-disconnected',(username)=>{
            this.userJoinLeft(username,"left")
        })

        this.userJoinLeft=(name,status)=>{
            this.chatBox.innerHTML+=`<div><li data-user="new_member">${name} ${status} the chat.</li></div>`
        }

        //  event to display online users and count of users who are online
        this.socket.on('users-count',users=>{
            users_online.innerHTML=''
            let users_list = Object.values(users)
            for(let user of users_list){
                if(user != this.userName){
                   users_online.innerHTML += `<div>${user}  </div>`
                 }
            }
            let count = users_list.length;
            online.textContent = count-1
        }
        )
        
    }
}