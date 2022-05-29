import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    // 다른컴포넌트에서 boards 를 수정 못하게 하기위해서 private 를 사용한다.
    private boards: Board[] = [];

    getAllBoards(): Board[] {
        return this.boards;
    }

    // uuid 는 인터페이스에 id 는 유니크키이기 때문에 임시로 유니크값을 만들어서 넣어준다.
    createBoard(createBoardDto: CreateBoardDto) {
        const { title, description } = createBoardDto;
        const board: Board = {
            id: uuid(),
            title,
            description,
            status: BoardStatus.PUBLIC
        }

        this.boards.push(board);
        return board;
    }

    getBoardById(id: string): Board {
        const found = this.boards.find((board) => board.id === id);

        if (!found) {
            throw new NotFoundException(`Cant find Board with id ${id}`);
        }

        return found;
    }

    deleteBoard(id: string): void {
        // 존재안할때 예외처리는 getBoardById에서 하고있기 때문에 여기선 할 필요 없다.
        const found = this.getBoardById(id);

        this.boards = this.boards.filter((board) => board.id !== found.id);
    }

    updateBoardStatus(id: string, status: BoardStatus): Board {
        const board = this.getBoardById(id);
        board.status = status;
        return board;
    }
}
