CREATE TABLE `user_goals` (
	`id` varchar(36) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`daily_goal_ml` int NOT NULL,
	`created_at` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`updated_at` timestamp(3) NOT NULL,
	CONSTRAINT `user_goals_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_goals_user_id_unique` UNIQUE(`user_id`)
);
--> statement-breakpoint
CREATE TABLE `water_intakes` (
	`id` varchar(36) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`amount_ml` int NOT NULL,
	`goal_at_time_ml` int NOT NULL,
	`recorded_at` timestamp(3) NOT NULL,
	`created_at` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`updated_at` timestamp(3) NOT NULL,
	CONSTRAINT `water_intakes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `user_goals` ADD CONSTRAINT `user_goals_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `water_intakes` ADD CONSTRAINT `water_intakes_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;