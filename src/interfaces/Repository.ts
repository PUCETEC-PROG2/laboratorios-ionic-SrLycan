export interface Repository {
    id: number
    name: string;
    description: string;
    language: string;
    owner: {
        login: string;
        avatar_url: string;
    }
}
