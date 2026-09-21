const fs = require('fs');
const path = require('path');

const NUM_APPS = 120;
const CATEGORIES = ['Utility', 'Finance', 'Health', 'Development', 'Productivity', 'Design'];
const ADJECTIVES = ['Quick', 'Smart', 'Pro', 'Easy', 'Advanced', 'Simple', 'Instant', 'Ultra', 'Mega', 'Super'];
const NOUNS = ['Calculator', 'Converter', 'Generator', 'Analyzer', 'Tracker', 'Format', 'Compressor', 'Viewer', 'Editor', 'Validator'];

function generateSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const apps = [];

for (let i = 0; i < NUM_APPS; i++) {
  const adj = getRandomItem(ADJECTIVES);
  const noun = getRandomItem(NOUNS);
  const category = getRandomItem(CATEGORIES);
  
  // Ensure some uniqueness
  const appName = `${adj} ${category} ${noun} ${Math.floor(Math.random() * 1000)}`;
  const slug = generateSlug(appName);
  
  apps.push({
    id: `app-${i + 1}`,
    title: appName,
    slug: slug,
    category: category,
    description: `A powerful and easy-to-use ${category.toLowerCase()} ${noun.toLowerCase()} designed to save you time and effort. Perfect for professionals and casual users alike.`,
    metaTitle: `${appName} - Free Online Tool`,
    metaDescription: `Use our free online ${appName.toLowerCase()} tool. Fast, secure, and requires no installation.`,
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString()
  });
}

const outputPath = path.join(__dirname, '..', 'data', 'apps.json');
fs.writeFileSync(outputPath, JSON.stringify(apps, null, 2));

console.log(`Successfully generated ${NUM_APPS} apps to ${outputPath}`);
