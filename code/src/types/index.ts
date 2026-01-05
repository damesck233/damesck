export interface BlogPost {
    cid: number;
    title: string;
    slug: string;
    created: number;
    modified: number;
    text: string;
    summary: string;
    date: string;
    readTime: string;
    categories: Array<{
        mid: number;
        name: string;
        slug: string;
    }>;
    tags: Array<{
        name: string;
        color?: string;
    }>;
}

export interface ApiError {
    code: number;
    message: string;
    details?: string;
}

export interface ApiDatasetItem {
    cid: number;
    title: string;
    slug: string;
    created: number;
    modified: number;
    type: string;
    digest: string;
    password: string;
    categories: Array<{
        mid: number;
        name: string;
        slug: string;
        type: string;
        description: string;
        count: number;
        order: number;
        parent: number;
        cid: number;
        directory: string[];
        permalink: string;
        url: string;
        feedUrl: string;
        feedRssUrl: string;
        feedAtomUrl: string;
    }>;
    category: string;
    directory: string[];
    date: {
        timeStamp: number;
        year: string;
        month: string;
        day: string;
    };
    year: string;
    month: string;
    day: string;
    hidden: boolean;
    pathinfo: string;
    permalink: string;
    url: string;
    isMarkdown: boolean;
    feedUrl: string;
    feedRssUrl: string;
    feedAtomUrl: string;
    titleShow: boolean;
    fields: {
        [key: string]: {
            name: string;
            type: string;
            value: string;
        };
    };
}

export interface ApiResponse {
    status: string;
    message: string;
    data: {
        page: number;
        pageSize: number;
        pages: number;
        count: number;
        dataSet: ApiDatasetItem[];
    };
}

export interface CountdownItem {
    title: string;
    Startdate: string;
    targetDate: string;
    totalDays: number;
    top: boolean;
}
