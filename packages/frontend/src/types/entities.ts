export interface ArticleItem {
    id: string,
    position: number;
    title: string
    necessary: string,
    possible: string,
    must_not: string,
    important: string,
    text: string,
}

export interface ArticleItemShort {
    id: string,
    position: number;
    title: string;
}