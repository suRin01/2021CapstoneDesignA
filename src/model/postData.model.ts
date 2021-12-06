import { IsOptional, IsString } from "class-validator";

export class PostObject {
	@IsString()
	public readonly _id: string;
	public readonly content: string;
	public readonly createAt: Date;
	public readonly updatedAt: Date;
	public readonly User: User;
	public readonly Images: ImageObject[];
	public readonly Like: User[];
	public readonly Comment: number;
}

class User {
	public readonly _id: string;
	public readonly name?: string;
	public readonly Image?: ImageObject;
}

class ImageObject {
	@IsOptional()
	public readonly _id?: string;
	public readonly path: string;
}

/*
{
    id,
    content,
    createdAt,
    // 게시글을 작성한 유저
    User: {
      _id,
      name,
      // 게시글을 작성한 유저의 프로필 이미지
      Image: {
        path,
      },
    },
    // 게시글의 이미지
    Image: [
      {
        _id,
        path,
      },
      // ...
    ],
  },



*/
