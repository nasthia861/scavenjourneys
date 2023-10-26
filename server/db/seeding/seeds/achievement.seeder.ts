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
        { name: 'Amateur Journey Maker', conditionText: 'Create 5 Journeys', icon_url: 'https://cdn.peterbarnum.com/img/thumbnails/400x400_indibanana-jones-boulder.webp' },
        // 2
        { name: 'Expert Journey Maker', conditionText: 'Create 20 Journeys', icon_url: 'https://cdn.peterbarnum.com/img/thumbnails/400x400_bonana.webp' },
        // 3
        { name: 'Master Journey Maker', conditionText: 'Create 50 Journeys', icon_url: 'https://cdn.peterbarnum.com/img/bananas/mushroom-strut-banana.gif' },
        // 4
        { name: 'Amateur Step Maker', conditionText: 'Create 15 Steps', icon_url: 'https://cdn.peterbarnum.com/img/thumbnails/400x400_mad_banana.webp' },
        // 5
        { name: 'Expert Step Maker', conditionText: 'Create 50 Steps', icon_url: 'https://cdn.peterbarnum.com/img/thumbnails/400x400_disconana.webp' },
        // 6
        { name: 'Master Step Maker', conditionText: 'Create 100 Steps', icon_url: 'https://cdn.peterbarnum.com/img/thumbnails/400x400_cookie-monster-banana2.webp' },
        // 7
        { name: 'Amateur Journeys Taken', conditionText: 'Take 2 Journeys', icon_url: 'https://cdn.peterbarnum.com/img/bananas/sonic-banana.gif' },
        // 8
        { name: 'Expert Journeys Taken', conditionText: 'Take 10 Journeys', icon_url: 'https://cdn.peterbarnum.com/img/thumbnails/400x400_content_banana-angel.webp' },
        // 9
        { name: 'Master Journeys Taken', conditionText: 'Take 20 Journeys', icon_url: 'https://cdn.peterbarnum.com/img/thumbnails/400x400_contently-fuzzy_strawberry-banana.webp' },
        // 10
        { name: 'Amateur Steps Taken', conditionText: 'Take 5 Steps', icon_url: 'https://cdn.peterbarnum.com/img/thumbnails/400x400_hairnana-guitar.webp' },
        // 11
        { name: 'Expert Steps Taken', conditionText: 'Take 25 Steps', icon_url: 'https://cdn.peterbarnum.com/img/thumbnails/400x400_groovnana.webp' },
        // 12
        { name: 'Master Steps Taken', conditionText: 'Take 50 Steps', icon_url: 'https://cdn.peterbarnum.com/img/thumbnails/400x400_gold_banana.webp' },
      ])
      .execute();
  } catch (error) {
    console.error('Error inserting data into Achievement table:', error);
  }
}

export default AchievementSeeder;
