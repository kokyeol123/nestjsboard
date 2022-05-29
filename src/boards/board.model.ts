export interface Board {
    id: string;
    title: string;
    description: string;
    status: BoardStatus;
}

// 퍼블릭 프라이빗 두개만 가능하도록 한다.
export enum BoardStatus {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE'
}