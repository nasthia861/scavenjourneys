import { DataSource } from 'typeorm';
import { Achievement } from '../../entities/Achievement';
import { UserAchievement } from '../..//entities/UserAchievement';

const AchievementSeeder = async (dataSource: DataSource): Promise<void> => {
// Insert data into the table
  try {
    await dataSource
      .createQueryBuilder()
      .insert()
      .into(Achievement)
      .values([
        // 1
        { name: 'Amateur Journey Maker', conditionText: 'Create 5 Journeys', icon_url: 'https://cdn-icons-png.flaticon.com/512/2471/2471722.png' },
        // 2
        { name: 'Expert Journey Maker', conditionText: 'Create 20 Journeys', icon_url: 'https://cdn-icons-png.flaticon.com/512/2471/2471722.png' },
        // 3
        { name: 'Master Journey Maker', conditionText: 'Create 50 Journeys', icon_url: 'https://cdn-icons-png.flaticon.com/512/2471/2471722.png' },
        // 4
        { name: 'Amateur Step Maker', conditionText: 'Create 15 Steps', icon_url: 'https://cdn-icons-png.flaticon.com/512/1378/1378582.png' },
        // 5
        { name: 'Expert Step Maker', conditionText: 'Create 50 Steps', icon_url: 'https://cdn-icons-png.flaticon.com/512/1378/1378582.png' },
        // 6
        { name: 'Master Step Maker', conditionText: 'Create 100 Steps', icon_url: 'https://cdn-icons-png.flaticon.com/512/1378/1378582.png' },
        
      ])
      .execute();
  } catch (error) {
    console.error('Error inserting data into Achievement table:', error);
  }
}

export default AchievementSeeder;
