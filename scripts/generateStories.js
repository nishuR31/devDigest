const fs = require('fs');
const path = require('path');

const NUM_STORIES = 20;

const storyPrompts = [
  "The Night the Production Database Dropped",
  "Confessions of a 10x Engineer",
  "The Startup that Scaled Too Fast",
  "Debugging the Un-Debuggable",
  "How One Typo Cost Us Millions",
  "The Phantom Memory Leak",
  "My First Day at a Tech Giant",
  "When the Cloud Went Dark",
  "The Rogue Microservice",
  "Rebuilding from Scratch: A CTO's Journey",
  "The Day We Deleted the Backups",
  "Surviving the Legacy Codebase",
  "The 72-Hour Hackathon that Changed Everything",
  "When Agile Goes Wrong",
  "The Silent Deployment Disaster",
  "Hunting the Intermittent Bug",
  "Why I Left Silicon Valley",
  "The Hardware Failure That Almost Ruined Us",
  "Navigating the Great Refactor",
  "The Accidental DDoS Attack"
];

const generateStoryContent = (title) => {
  return `
    <p class="drop-cap">It all started on a quiet Tuesday evening. The office was mostly empty, the hum of the servers providing a steady, comforting white noise. We had just pushed what we thought was a routine update to the billing service. Nothing major—or so we believed.</p>

    <p>By 8 PM, my phone started buzzing. Then the PagerDuty alerts began screaming. What unfolded over the next 48 hours was a masterclass in why you never, ever bypass the staging environment.</p>

    <blockquote class="pull-quote">"In distributed systems, the bug isn't in the code you just wrote. It's in the space between the code you wrote and the code someone else wrote five years ago."</blockquote>

    <h3>The Descent into Chaos</h3>
    <p>As we dug into the logs, the reality of the situation began to set in. The CPU utilization across our primary clusters was spiking to 100%. Requests were timing out. Our core API was returning 502 Bad Gateway errors to thousands of users per second.</p>
    
    <p>It turned out that a recursive function call, combined with an un-indexed database query, was creating a massive feedback loop. It was the perfect storm. We were experiencing a complete system meltdown.</p>

    <div class="my-8 p-6 bg-surface-soft border-l-4 border-amber rounded-r-xl">
      <p class="text-ink font-bold mb-2">The Golden Rule</p>
      <p class="text-ink-muted text-sm">Always implement circuit breakers when dealing with external services or complex recursive operations. Fail fast, fail safely.</p>
    </div>

    <h3>The Resolution</h3>
    <p>We spent the entire night rolling back deployments, manually clearing cached queues, and writing emergency patches. It took three pots of coffee and the combined effort of the entire engineering team to finally stabilize the system just as the sun was coming up.</p>

    <p>We learned a lot that night. We changed our deployment pipeline, instituted mandatory code reviews for even the smallest hotfixes, and most importantly, we learned the value of a blameless post-mortem.</p>
  `;
};

const stories = [];

for (let i = 0; i < NUM_STORIES; i++) {
  const title = storyPrompts[i];
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
  stories.push({
    id: `story-${i + 1}`,
    slug: slug,
    title: title,
    description: `A gripping narrative about the trials, tribulations, and unexpected disasters of modern software engineering. Read the full story of "${title}".`,
    content: generateStoryContent(title),
    author: "Anonymous Dev",
    date: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0],
    readTime: Math.floor(Math.random() * 10) + 3,
  });
}

fs.writeFileSync(
  path.join(__dirname, '../data/stories.json'),
  JSON.stringify(stories, null, 2)
);

console.log('Successfully generated 20 tech stories.');
