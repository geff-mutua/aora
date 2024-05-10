import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';

export const config = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.melditech.aora",
    projectId: "663b29ea000092dd9a0e",
    databaseId: "663b33f8003c8343a442",
    userCollectionId: "663bc0cb0033076973d2",
    videoCollectionId: "663bc0ec0033e24fd3a5",
    storageId: "663bc4e8001de5af5873"
}

const client = new Client();

client.setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform)

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser =async(email,password,username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if(!newAccount) throw Error;

        const avatarUrl=avatars.getInitials(username);

        await signIn(email,password);

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId:newAccount.$id,
                email,
                username,
                avatar:avatarUrl
            }
        )

        return newUser;
        
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }

    
}
export const signIn= async (email,password)=>{
    try {
        const session=await account.createEmailPasswordSession(email,password)
        return session;
    } catch (error) {
        console.log(error);
        throw new Error(error)
    }
}

export const getCurrentUser= async()=>{
    try {
        const currentAccount=await account.get();

        if(!currentAccount) throw Error;
        
        const currentUser=databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId',currentAccount.$id)]
        )

    return currentAccount;
        // console.log(currentUser)

        // if(!currentUser) throw Error;

        // return currentUser;
    } catch (error) {
        console.log("This is the error => " + error)
    }

}

export const getAllPosts = async() =>{
    try {
        const posts= await databases.listDocuments(config.databaseId,config.videoCollectionId);
        return posts.documents;
    } catch (error) {
        console.log(error)
        return [];
    }
}

export const getLatestPosts = async() =>{
    try {
        const posts= await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.orderDesc('$createdAt',Query.limit(7))]
        );
        return posts.documents;
    } catch (error) {
        console.log(error)
        return [];
    }
}







