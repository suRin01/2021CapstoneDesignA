export class userQueryString {
	public static readonly findAll = "SELECT * FROM `Capstone2021`.`Users`;";
	public static readonly findOne =
		"SELECT * FROM `Capstone2021`.`Users` WHERE `user_id`=?;";
	public static readonly updateOne =
		"UPDATE `Capstone2021`.`Users` SET `profileImage` = ?, `username` = ?, `password` = ?, `email` = ?, `phoneNumber` = ?, `birthDate` = ?, `gender` = ? WHERE (`user_id` = ?);";
	public static readonly createOne =
		"INSERT INTO `Capstone2021`.`Users` (`user_id`, `profileImage`, `username`, `password`, `email`, `phoneNumber`, `birthDate`, `gender`) VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
	public static readonly deleteOne =
		"DELETE FROM `Capstone2021`.`Users` WHERE (`user_id` = ?);";

	public static readonly login =
		"SELECT * FROM `Capstone2021`.`Users` WHERE `user_id`;";
}

export class postQueryString {
	public static readonly findAll = "SELECT * FROM `Capstone2021`.`Posts`;";
	public static readonly findOne =
		"SELECT * FROM `Capstone2021`.`Posts` WHERE `_id`=?;";
	public static readonly updateOne =
		"UPDATE `Capstone2021`.`Posts` SET `user_id` = ? `postContent` = ? WHERE (`_id` = ?);";
	public static readonly createOne =
		"INSERT INTO `Capstone2021`.`Posts` (`user_id`, `postContent`) VALUES (?, ?);";
	public static readonly deleteOne =
		"DELETE FROM `Capstone2021`.`Posts` WHERE (`_id` = ?);";
}

export class commentQueryString {
	public static readonly findAll =
		"SELECT * FROM `Capstone2021`.`Comments` WHERE `post_id`=?;"; // 한 개의 포스터에 모든 댓글
	// public static readonly findOne =
	// 	"SELECT * FROM `Capstone2021`.`Comments ` WHERE `_id`=?;";
	public static readonly updateOne =
		"UPDATE `Capstone2021`.`Comments` SET `user_id` = ?, `post_id` = ?, comment_id = ?, `commentText` = ? WHERE (`_id` = ?);";
	public static readonly createOne =
		"INSERT INTO `Capstone2021`.`Comments` (`user_id`, `post_id`,`comment_id` , `commentText`) VALUES (?, ?,?, ?);";
	public static readonly deleteOne =
		"DELETE FROM `Capstone2021`.`Comments` WHERE (`_id` = ?);";
}
