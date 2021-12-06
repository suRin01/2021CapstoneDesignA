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

	public static readonly createOautOne:string = "INSERT INTO `LostArkStat`.`Users` (`name`, `id`, `email`, `is_oauth_register`) VALUES (?, ?, ? ,?)";
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
		"DELETE FROM `Capstone2021`.`posts` WHERE (`_id` = ?);";
	public static readonly findPosts = "select A.*, B.profile_image, B.username, B.Is_deleted from Capstone2021.posts as A left join Capstone2021.users as B using(user_id) where A._id >= ? limit ?;";
}

export class commentQueryString {
	public static readonly findAll =
		"SELECT * FROM `Capstone2021`.`comments` WHERE `post_id`=?;"; // 한 개의 포스터에 모든 댓글
	// public static readonly findOne =
	// 	"SELECT * FROM `Capstone2021`.`comments ` WHERE `_id`=?;";
	public static readonly updateOne =
		"UPDATE `Capstone2021`.`comments` SET `user_id` = ?, `post_id` = ?, comment_id = ?, `comment_text` = ? WHERE (`_id` = ?);";
	public static readonly createOne =
		"INSERT INTO `Capstone2021`.`comments` (`user_id`, `post_id`,`comment_id` , `comment_text`) VALUES (?, ?, ?, ?);";
	public static readonly deleteOne =
		"DELETE FROM `Capstone2021`.`comments` WHERE (`_id` = ?);";
}
