import { beginRequest, endRequest } from "./notifications.js";

function host(endpoint) {
    const appId = "D4197671-F8EB-2581-FF17-3244736FD100"
    const restApiKey = "981D4390-9981-4062-BA1B-D147383261C9"
    return `https://api.backendless.com/${appId}/${restApiKey}/${endpoint}`;
}

const endpoints = {
    REGISTER: "users/register",
    LOGIN: "users/login",
    LOGOUT: "users/logout",
    EVENTS: "data/events"
};

// ------------------------- REGISTER -------------------------
export async function register(username, password) {
    beginRequest();

    const result = (await fetch(host(endpoints.REGISTER), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password
        })
    })).json();

    endRequest();

    return result;
}

// ------------------------- LOGIN -------------------------
export async function login(username, password) {
    beginRequest();

    const result = await (await fetch(host(endpoints.LOGIN), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            login: username,
            password
        })
    })).json();

    localStorage.setItem("userToken", result["user-token"]);
    localStorage.setItem("username", result.username);
    localStorage.setItem("userId", result.objectId);

    endRequest();

    return result;
}

// ------------------------- LOGOUT -------------------------
export async function logout() {
    beginRequest();

    const token = localStorage.getItem("userToken");

    localStorage.removeItem("userToken");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");

    const result = fetch(host(endpoints.LOGOUT), {
        headers: {
            "user-token": token
        }
    });

    endRequest();

    return result;
}

// ------------------------- GET ALL -------------------------
export async function getAll() {
    beginRequest();

    const token = localStorage.getItem("userToken");

    const result = (await fetch(host(endpoints.EVENTS), {
        method: "GET",
        headers: {
            "user-token": token
        }
    })).json();

    endRequest();

    return result;
}

// ------------------------- CREATE NEW -------------------------
export async function createNew(event) {
    beginRequest();

    const token = localStorage.getItem("userToken");

    const result = (await fetch(host(endpoints.EVENTS), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "user-token": token
        },
        body: JSON.stringify(event)
    })).json();

    endRequest();

    return result;
}

// ------------------------- GET BY ID -------------------------
export async function getById(id) {
    beginRequest();

    const token = localStorage.getItem("userToken");

    const result = (await fetch(host(endpoints.EVENTS + "/" + id), {
        method: "GET",
        headers: {
            "user-token": token
        }
    })).json();

    endRequest();

    return result;
}

// ------------------------- UPDATE -------------------------
export async function updateById(id, updatedProps) {
    beginRequest();

    const token = localStorage.getItem("userToken");

    const result = (await fetch(host(endpoints.EVENTS + "/" + id), {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "user-token": token
        },
        body: JSON.stringify(updatedProps)
    })).json();

    endRequest();

    return result;
}

// ------------------------- DELETE -------------------------
export async function deleteIt(id) {
    beginRequest();

    const token = localStorage.getItem("userToken");

    const result = (await fetch(host(endpoints.EVENTS + "/" + id), {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "user-token": token
        }
    })).json();

    endRequest();

    return result;
}

// ------------------------- GET ALL BY USER ID -------------------------
export async function getEventsByCreator() {
    beginRequest();

    const token = localStorage.getItem("userToken");
    const ownerId = localStorage.getItem("userId");

    const result = (await fetch(host(endpoints.EVENTS + `?where=ownerId%3D%27${ownerId}%27`), {
        headers: {
            "Content-Type": "application/json",
            "user-token": token
        }
    })).json();

    endRequest();

    return result;
}

// ------------------------- INCREASE SOMETHING IN OBJECT -------------------------
export async function joinIt(event) {
    const eventId = event.objectId;
    event.interestedIn++;

    const result = await updateById(eventId, { interestedIn: event.interestedIn })
    return result;
}