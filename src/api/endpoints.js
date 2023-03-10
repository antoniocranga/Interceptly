export default class Endpoints {
    static baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    static dashboard = "/dashboard";
    static auth = "/auth";
    static login = Endpoints.auth + "/login";
    static register = Endpoints.auth + "/register";
    static users = Endpoints.dashboard + "/users";
    static projects = Endpoints.dashboard + "/projects";
    static comments = Endpoints.dashboard + "/comments";
    static notifications = Endpoints.dashboard + "/notifications";
    static export = Endpoints.dashboard + "/export";
    static stats = Endpoints.dashboard + "/stats";

    static webSocketsUrl = Endpoints.baseUrl + Endpoints.dashboard + "/ws";
}