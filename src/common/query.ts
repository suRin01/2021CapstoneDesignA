export class userQueryString {
	public static readonly findAll = "SELECT * FROM `Capstone2021`.`users`;";
	public static readonly findOne =
		"SELECT * FROM `Capstone2021`.`users` WHERE `user_id`=?;";
	public static readonly updateOne =
		"UPDATE `Capstone2021`.`users` SET `profile_image` = ?, `username` = ?, `password` = ?, `email` = ?, `phone_number` = ?, `birth_date` = ?, `gender` = ? WHERE (`user_id` = ?);";
	public static readonly createOne =
		"INSERT INTO `Capstone2021`.`users` (`user_id`, `profile_image`, `username`, `password`, `email`, `phone_number`, `birth_date`, `gender`) VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
	public static readonly deleteOne =
		"DELETE FROM `Capstone2021`.`users` WHERE (`user_id` = ?);";

	public static readonly login =
		"SELECT * FROM `Capstone2021`.`users` WHERE `user_id`;";

	public static readonly createOautOne: string =
		"INSERT INTO `LostArkStat`.`Users` (`name`, `id`, `email`, `is_oauth_register`) VALUES (?, ?, ? ,?)";
}

export class postQueryString {
	public static readonly findAll = "SELECT * FROM `Capstone2021`.`posts`;";
	public static readonly findOne =
		"SELECT * FROM `Capstone2021`.`posts` WHERE `_id`=?;";
	public static readonly updateOne =
		"UPDATE `Capstone2021`.`posts` SET `user_id` = ? `content` = ? WHERE (`_id` = ?);";
	public static readonly updateHeartCount =
		"UPDATE `Capstone2021`.`posts` SET `heart_count` = ? WHERE (`_id` = ?);";
	public static readonly createOne =
		"INSERT INTO `Capstone2021`.`posts` (`user_id`, `content`) VALUES (?, ?);";
	public static readonly deleteOne =
		"UPDATE `Capstone2021`.`posts` SET `is_deleted` = 1 WHERE (_id = ? && user_id = ? );";
	// "DELETE FROM `Capstone2021`.`posts` WHERE (`_id` = ?);";
	public static readonly findPosts =
		"select A.*, B.profile_image, B.username, B.Is_deleted from Capstone2021.posts as A left join Capstone2021.users as B ON B._id = A.user_id where A.is_deleted = 0 order by A._id DESC limit 10 offset ?;";
}

export class commentQueryString {
	public static readonly findAll =
		"select A.*, B.username, B.profile_image from Capstone2021.comments as A left join Capstone2021.users as B using(user_id) where A.post_id = ? && A.is_deleted = 0 order by A.created_at;"; // 한 개의 포스터에 모든 댓글
	// public static readonly findOne =
	// 	"SELECT * FROM `Capstone2021`.`comments ` WHERE `_id`=?;";
	public static readonly updateOne =
		"UPDATE `Capstone2021`.`comments` SET `user_id` = ?, `post_id` = ?, comment_id = ?, `comment_text` = ? WHERE (`_id` = ?);";
	public static readonly createOne =
		"INSERT INTO `Capstone2021`.`comments` (`user_id`, `post_id`,`parent_id`, `content`) VALUES (?, ?, ?, ?);";
	public static readonly deleteOne =
		"UPDATE `Capstone2021`.`comments` SET `is_deleted` = 1 WHERE ( _id = ? and user_id = ? );";
	// "DELETE FROM `Capstone2021`.`comments` WHERE (`_id` = ?);";
}

export class imageQueryString {
	public static readonly findAll =
		"select * from `Capstone2021`.`images` where post_id = ?;";
	public static readonly createOne =
		"insert into `Capstone2021`.`images` (`post_id`, `path`) values (?, ?);";
}

export class likeQueryString {
	public static readonly createOne =
		"insert into `Capstone2021`.`likes` (`post_id`, `user_id`) values( ?, ?)";
	public static readonly deleteOne =
		"delete from `Capstone2021`.`likes` where (`post_id` = ? and `user_id` = ?);";
	public static readonly findAll =
		"select `Capstone2021`.`likes`.`user_id` from `Capstone2021`.`likes` where (`post_id` = ?);";
}
