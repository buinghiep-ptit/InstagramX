export type UserInfo = {
    id?: string;
    name?: string;
    username?: string;
    avatarUrl?: string;
    createdAt?: string;
}

export type Fleet = {
    id?: string;
    type?: string;
    imageUrl?: string;
    createdAt?: string;
}

export type ExtraStory = UserInfo &  {
    fleets?: {
        items?: Fleet[]
    }
}