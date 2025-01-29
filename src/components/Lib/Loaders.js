import apiRequest from "./apiRequest"
import { defer } from "react-router-dom";

export const SinglePageLoader = async ({ request, params }) => {
    const res = await apiRequest("/posts/" + params.id);
    return res.data;
}

// Update the request URL in ListPageLoader to include /getall
export const ListPageLoader = async ({ request, params }) => {
    const query = request.url.split("?")[1];
    console.log("query is",query);

    // Ensure you're hitting the /getall route
    const postPromise = await apiRequest(`/posts/getall?${query}`);
    
    return defer({
        postResponse: postPromise,
    });
}


export const ProfilePageLoader = async ({}) => {
    const postPromise = await apiRequest("/users/profilePosts");
    const chatPromise = await apiRequest("/chats");
    return defer({
        postResponse: postPromise,
        chatResponse: chatPromise,
    });
}
