
export const sampleChats = [
    {
        avatar:["https://avatar.iran.liara.run/public"],
        name:"Chirag Patil",
        _id:"1",
        groupChat:false,
        members:["1","2"],
    },
    {
        avatar:["https://avatar.iran.liara.run/public/girl"],
        name:"Harsh Patil",
        _id:"2",
        groupChat:false,
        members:["3","4"]
    },{
        avatar:["https://avatar.iran.liara.run/public/37"],
        name:"Nikhil Patil",
        _id:"3",
        groupChat:false,
        members:["3","5"]
    },
    {
        avatar:["https://avatar.iran.liara.run/public"],
        name:"Yash Patil",
        _id:"4",
        groupChat:false,
        members:["3","4"]
    },
];


export const sampleUsers = [
    {
        avatar:"https://avatar.iran.liara.run/public",
        name:"Chirag Patil",
        _id:"1",
    },
    {
        avatar:"https://avatar.iran.liara.run/public/girl",
        name:"Harsh Patil",
        _id:"2",
    },
    {
        avatar:"https://avatar.iran.liara.run/public/girl",
        name:"Nikhil Patil",
        _id:"3"
    },
    {
        avatar:"https://avatar.iran.liara.run/public",
        name:"Yash Patil",
        _id:"4",
    }
];


export const sampleNotifications = [
    {
        sender:{
            avatar:"https://avatar.iran.liara.run/public",
            name:"Chirag Patil",
        },
        _id:1
    },
    {
        sender:{
            avatar:"https://avatar.iran.liara.run/public/girl",
            name:"Harsh Patil",
        },
        _id:2
    }
]

// ye wo format hai jo koi send karega 
export const sampleMessage = [
    {
        attachments:[],
        content:"hii bhai mai harsh , aaj cricket khele?",
        _id:"qwertyuiop",
        sender:{
            _id:"user._id",
            name:"Harsh Patil"
        },
        chat:"chatId",
        createdAt:"2024-05-07T00:00:00.000Z",
    },
    {
        attachments:[
            {
                public_id:"abcde2",
                url:"https://i.natgeofe.com/n/c9107b46-78b1-4394-988d-53927646c72b/1095_3x2.jpg",
            },
        ],
        _id:"qwertyuiodsfsdfdsp", 
        sender:{
            _id:"qwertyuiopasdfghjkl",
            name:"Chirag Patil 2"
        },
        chat:"chatId",
        createdAt:"2024-05-07T00:00:00.000Z",
    }
]


export const dashboardData = {
    users:[
        {
            avatar:"https://avatar.iran.liara.run/public",
            name:"Chirag Patil",
            _id:"1",
            username:"chir.aag",
            friends: 20,
            groups:5,
        },
        {
            avatar:"https://avatar.iran.liara.run/public/girl",
            name:"Harsh Patil",
            _id:"2",
            username:"h@rsh06",
            friends:12,
            groups:8
        },
        {
            avatar:"https://avatar.iran.liara.run/public/girl",
            name:"Nikhil Patil",
            _id:"3",
            username:"Nik19",
            friends:27,
            groups:6
        },
        {
            avatar:"https://avatar.iran.liara.run/public",
            name:"Yash Patil",
            _id:"4",
            username:"GoluYash",
            friends:7,
            groups:2
        }    
    ],

    chats:[
        {
            name: "Trip to varanasi",
            avatar: ["https://avatar.iran.liara.run/public"],
            _id: "1",
            groupChat: false,
            members: [
                {
                    _id:"1",
                    avatar:"https://avatar.iran.liara.run/public"
                },
                {
                    _id:"2",
                    avatar:"https://avatar.iran.liara.run/public/girl"
                }
            ],
            totalMembers: 2,
            totalMessages: 20,
            creator:{
                name: "Chirag Patil",
                avatar: "https://avatar.iran.liara.run/public",
            }
        },
        {
            name:"Cricket Buddys",
            avatar:["https://avatar.iran.liara.run/public/girl"],
            _id: "2",
            groupChat: false,
            members: [
                {
                    _id:"3",
                    avatar:"https://avatar.iran.liara.run/public/girl",
                },
                {
                    _id:"2",
                    avatar:"https://avatar.iran.liara.run/public/girl"
                }
                
            ],
            totalMembers: 2,
            totalMessages: 26,
            creator:{
                name:"Harsh Patil",
                avatar:"https://avatar.iran.liara.run/public/girl",
            }
        },
        {
            name:"Backchod ka group",
            avatar:["https://avatar.iran.liara.run/public/girl"],
            _id:"3",
            groupChat: false,
            members: [
                {
                    _id:"3",
                    avatar:"https://avatar.iran.liara.run/public/girl",
                },
                {
                    _id:"4",
                    avatar:"https://avatar.iran.liara.run/public",
                }
            ],
            totalMembers: 2,
            totalMessages: 11,
            creator:{
                name:"Nikhil Patil",
                avatar:"https://avatar.iran.liara.run/public/girl",
            }
        },
        {
            name:"All developers",
            avatar:["https://avatar.iran.liara.run/public"],
            _id:"4",
            groupChat: false,
            members: [
                {
                    _id:"3",
                    avatar:"https://avatar.iran.liara.run/public/girl",
                },
                {
                    _id:"4",
                    avatar:"https://avatar.iran.liara.run/public",
                }
            ],
            totalMembers: 2,
            totalMessages: 37,
            creator:{
                name:"Yash Patil",
                avatar:"https://avatar.iran.liara.run/public",
            }
        }
    ],

    messages:[
        {
            attachments:[],
            content:"Hii bhai kya haal chal 👋",
            _id:"fbsfggfisugfgsfg",
            sender:{
                avatar:"https://avatar.iran.liara.run/public",
                name:"Chirag Patil"
            },
            chat:"ChatId",
            groupChat:false,
            createdAt:"2024-05-13T00:00:00.000Z"
        },
        {
            attachments:[
                {
                    public_id:"asdsad 2",
                    url:"https://upload.wikimedia.org/wikipedia/commons/a/ac/NewTux.png"
                }
            ],
            content:"Ipl dekh rha hu bhai ❤️",
            _id:"fbsfggfisugfgsfgas",
            sender:{
                avatar:"https://avatar.iran.liara.run/public",
                name:"Nikhil Patil"
            },
            chat:"ChatId",
            groupChat:false,
            createdAt:'2024-05-13T00:00:00.000Z'
        }
    ]
}