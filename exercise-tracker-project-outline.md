# Exercise Tracker Project Outline
*Personal Fitness Tracker with 11ty + GitHub API Integration*

---

## 🎯 Project Vision

A flexible, sustainable workout tracking system that combines:
- **Static Exercise Library** (managed via markdown, built with 11ty)
- **Dynamic Workout Logging** (localStorage + GitHub API sync)
- **Personal Progress Tracking** (weight logs, workout completion)

Built for long-term daily use, not just a 6-month program.

---

## 🏗️ Architecture Overview

### Static Layer (11ty)
- Serves the application interface
- Builds exercise library from markdown files
- Generates filtered/organized views
- Deploys to GitHub Pages

### Dynamic Layer (Client-Side JS)
- Fetches workout logs from GitHub API
- Manages localStorage for instant updates
- Syncs data back to GitHub
- Handles offline functionality

### Data Storage
- **Exercise Library**: Markdown files in Git → 11ty builds → Static JSON
- **Workout Logs**: GitHub repo file → Fetched on load → Synced on save
- **Working Copy**: Browser localStorage (fast, always available)

---

## 📁 Proposed File Structure

```
exercise-tracker/
├── .eleventy.js                 # 11ty configuration
├── .gitignore                   
├── package.json                 
├── README.md                    
│
├── _data/
│   ├── exercises/               # Exercise library (markdown)
│   │   ├── kettlebell.md
│   │   ├── dumbbell.md
│   │   ├── bands.md
│   │   ├── bodyweight.md
│   │   └── cardio.md
│   │
│   └── logs/                    # Your personal workout data
│       └── workouts.json        # Synced via GitHub API
│
├── _includes/
│   ├── layouts/
│   │   └── base.njk             # Base template
│   ├── components/
│   │   ├── exercise-card.njk    # Exercise display component
│   │   ├── workout-logger.njk   # Workout tracking UI
│   │   └── progress-chart.njk   # Progress visualization
│   └── head.njk                 # Common head elements
│
├── src/
│   ├── css/
│   │   └── style.css            # Styling
│   └── js/
│       ├── workout-tracker.js   # Main app logic
│       ├── github-sync.js       # GitHub API integration
│       ├── storage.js           # localStorage management
│       └── exercise-library.js  # Exercise filtering/search
│
├── index.html                   # Main tracker interface
├── library.html                 # Browse all exercises
└── progress.html                # View progress/history
```

---

## ✨ Core Features

### MVP (Phase 1)
- [ ] Browse exercise library by equipment type
- [ ] View exercise details (instructions, variations)
- [ ] Log workout completion (which exercises done today)
- [ ] Track body weight over time
- [ ] Manual sync to GitHub (save button)
- [ ] View workout history
- [ ] Basic progress indicators

### Enhanced (Phase 2)
- [ ] Search/filter exercises (by muscle group, difficulty, equipment)
- [ ] Create custom workout routines from library
- [ ] Rotate exercises in routine (swap similar exercises)
- [ ] Rate/favorite exercises
- [ ] Add personal notes to exercises
- [ ] Auto-sync indicator ("Last synced: X minutes ago")
- [ ] Offline mode with sync queue

### Advanced (Phase 3)
- [ ] Progress tracking per exercise (weight/reps progression)
- [ ] Workout templates/programs
- [ ] Rest timer between sets
- [ ] Exercise history ("Last did this 3 days ago")
- [ ] Weekly/monthly summaries
- [ ] Export to CSV/PDF
- [ ] Progressive web app (PWA) - install on phone

---

## 🎨 User Interface Components

### 1. Main Dashboard
```
┌─────────────────────────────────────────┐
│  Exercise Tracker          [Sync Now]   │
│  Last synced: 5 min ago                 │
├─────────────────────────────────────────┤
│                                         │
│  Today's Progress                       │
│  ▓▓▓▓▓▓▓▓░░░░  70%                     │
│                                         │
│  Current Weight: 176 lbs [-2 from last]│
│  Target: 170 lbs (4 lbs to go!)        │
│                                         │
├─────────────────────────────────────────┤
│  Quick Actions                          │
│  [Log Workout] [Record Weight] [Library]│
└─────────────────────────────────────────┘
```

### 2. Exercise Library View
```
┌─────────────────────────────────────────┐
│  Exercise Library                       │
│  Search: [________]  Filter: [All ▼]   │
├─────────────────────────────────────────┤
│  Kettlebell (8 exercises)               │
│  ├─ Goblet Squat         ⭐️ Beginner   │
│  ├─ Kettlebell Swing     ⭐️⭐️ Inter.   │
│  └─ Turkish Get-Up       ⭐️⭐️⭐️ Adv.   │
│                                         │
│  Resistance Bands (12 exercises)        │
│  ├─ Pull-Aparts          ⭐️ Beginner   │
│  ├─ Face Pulls           ⭐️ Beginner   │
│  └─ ...                                 │
└─────────────────────────────────────────┘
```

### 3. Workout Logger
```
┌─────────────────────────────────────────┐
│  Log Today's Workout                    │
│  Monday, January 26, 2026               │
├─────────────────────────────────────────┤
│  Strength Day A                         │
│  [ ] Goblet Squats (3x10)              │
│  [✓] Dumbbell Press (3x10)             │
│  [ ] Band Rows (3x12)                  │
│  [ ] Plank (3x30s)                     │
│                                         │
│  Cardio                                 │
│  [ ] Assault Bike (15 min)             │
│                                         │
│  Notes: [___________________________]   │
│                                         │
│  [Save Workout]                         │
└─────────────────────────────────────────┘
```

---

## 📝 Exercise Library Schema

### Markdown Format
```markdown
# Exercise Name

**Equipment:** Kettlebell, Dumbbell, Band, Bodyweight, Cardio
**Primary Muscles:** Legs, Back, Chest, Shoulders, Arms, Core
**Secondary Muscles:** (optional)
**Difficulty:** Beginner, Intermediate, Advanced
**Type:** Strength, Cardio, Mobility, Flexibility

## Description
Brief description of the exercise and its benefits.

## Instructions
1. Starting position
2. Movement pattern
3. Key form cues
4. Breathing pattern

## Variations
- Easier version (regression)
- Harder version (progression)
- Alternative equipment

## Tips
- Common mistakes to avoid
- Form cues
- When to use this exercise

## Notes
(Personal notes section - editable in app)

---
tags: [kettlebell, legs, beginner, compound]
reps: 3x10
rest: 60s
```

### Parsed Data Structure
```javascript
{
  id: "goblet-squat",
  name: "Goblet Squat",
  equipment: ["kettlebell"],
  primaryMuscles: ["legs", "core"],
  secondaryMuscles: ["back"],
  difficulty: "beginner",
  type: "strength",
  description: "...",
  instructions: [...],
  variations: [...],
  tips: [...],
  tags: ["kettlebell", "legs", "beginner", "compound"],
  defaultSets: 3,
  defaultReps: 10,
  defaultRest: 60,
  personalNotes: "",  // User can add
  favorite: false,    // User can mark
  lastPerformed: null // Tracked automatically
}
```

---

## 💾 Workout Data Schema

### workouts.json Structure
```json
{
  "profile": {
    "startDate": "2026-01-26",
    "startWeight": 178,
    "targetWeight": 170,
    "targetDate": "2026-07-01"
  },
  "weightLogs": [
    {
      "date": "2026-01-26",
      "weight": 178,
      "notes": "Starting weight"
    }
  ],
  "workoutLogs": [
    {
      "date": "2026-01-26",
      "dayType": "Strength Day A",
      "exercises": [
        {
          "id": "goblet-squat",
          "sets": 3,
          "reps": 10,
          "weight": 20,
          "completed": true
        },
        {
          "id": "dumbbell-press",
          "sets": 3,
          "reps": 10,
          "weight": 20,
          "completed": true
        }
      ],
      "cardio": {
        "type": "Assault Bike",
        "duration": 15,
        "completed": true
      },
      "notes": "Felt strong today!",
      "completedAt": "2026-01-26T18:30:00Z"
    }
  ],
  "exerciseProgress": {
    "goblet-squat": {
      "lastPerformed": "2026-01-26",
      "personalRecord": {
        "weight": 25,
        "reps": 12,
        "date": "2026-01-20"
      },
      "notes": "Focus on depth",
      "favorite": true
    }
  },
  "routines": [
    {
      "id": "strength-a",
      "name": "Strength Day A",
      "exercises": ["goblet-squat", "dumbbell-press", "band-rows", "plank"],
      "cardio": "Assault Bike 15min"
    }
  ]
}
```

---

## 🔧 Implementation Roadmap

### Phase 1: Foundation (Week 1)
1. **Set up 11ty project**
   - Initialize with `npm init -y` and install 11ty
   - Configure `.eleventy.js`
   - Set up basic templating structure

2. **Create exercise library**
   - Write 10-15 exercises in markdown
   - Create parser to convert markdown → JSON
   - Build exercise display pages

3. **Basic UI**
   - Main dashboard layout
   - Exercise library browser
   - Simple, clean styling

4. **GitHub Pages deployment**
   - Configure for deployment
   - Test static site

### Phase 2: Workout Logging (Week 2)
1. **localStorage implementation**
   - Save/load workout logs
   - Save/load weight logs
   - Data structure implementation

2. **Workout logger UI**
   - Log today's workout
   - Mark exercises complete
   - Add notes

3. **Progress display**
   - Show weight trend
   - Show workout history
   - Basic charts/graphs

### Phase 3: GitHub Sync (Week 3)
1. **GitHub API integration**
   - Set up personal access token
   - Implement fetch from GitHub
   - Implement push to GitHub

2. **Sync logic**
   - Manual sync button
   - Conflict resolution (last-write-wins to start)
   - Sync status indicator

3. **Testing**
   - Test across devices
   - Test offline → online sync
   - Error handling

### Phase 4: Enhancement (Week 4+)
1. **Search & filter**
   - Exercise search
   - Filter by equipment/muscle/difficulty
   - Tag system

2. **Routine builder**
   - Create custom routines
   - Swap exercises
   - Save routines

3. **Progressive features**
   - Track exercise PRs
   - Suggest next workout
   - Rest timers
   - Auto-sync

---

## 🔐 GitHub API Setup

### 1. Create Personal Access Token
1. GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens
2. Create new token with:
   - Repository access: Only select `exercise-tracker` repo
   - Permissions: Contents (read & write)
   - Expiration: 1 year (or custom)
3. Copy token (you'll only see it once!)

### 2. Store Token Securely
```javascript
// For personal project, embed in code (you control the repo)
const GITHUB_CONFIG = {
  owner: 'your-username',
  repo: 'exercise-tracker',
  token: 'github_pat_YOUR_TOKEN_HERE',  // Fine-grained token
  branch: 'main',
  dataPath: '_data/logs/workouts.json'
};
```

⚠️ **Security Note**: Token is visible in client code. Fine for personal projects where:
- You control the repo
- It's your own data
- Token has limited scope (only this repo)
- You're the only user

### 3. API Functions

#### Fetch Workout Data
```javascript
async function fetchWorkoutData() {
  const url = `https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${GITHUB_CONFIG.dataPath}`;
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${GITHUB_CONFIG.token}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  });
  
  if (!response.ok) {
    if (response.status === 404) {
      // File doesn't exist yet - return empty data
      return { profile: {}, weightLogs: [], workoutLogs: [] };
    }
    throw new Error(`GitHub API error: ${response.status}`);
  }
  
  const data = await response.json();
  const content = atob(data.content); // Decode base64
  return JSON.parse(content);
}
```

#### Save Workout Data
```javascript
async function saveWorkoutData(workoutData) {
  const url = `https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${GITHUB_CONFIG.dataPath}`;
  
  // First, get the current file SHA (required for updates)
  const currentFile = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${GITHUB_CONFIG.token}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  });
  
  let sha;
  if (currentFile.ok) {
    const currentData = await currentFile.json();
    sha = currentData.sha;
  }
  
  // Now update the file
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${GITHUB_CONFIG.token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: `Update workout logs - ${new Date().toISOString()}`,
      content: btoa(JSON.stringify(workoutData, null, 2)), // Base64 encode
      sha: sha, // Include if file exists
      branch: GITHUB_CONFIG.branch
    })
  });
  
  if (!response.ok) {
    throw new Error(`Failed to save: ${response.status}`);
  }
  
  return await response.json();
}
```

---

## 🎯 Development Workflow

### Daily Development
```bash
# Start 11ty dev server
npx @11ty/eleventy --serve

# Open browser to http://localhost:8080

# Edit exercises in _data/exercises/*.md
# Edit UI/JS in src/
# Save → Auto-reload in browser
```

### Adding New Exercise
1. Create `_data/exercises/new-exercise.md`
2. Fill in template
3. 11ty rebuilds automatically
4. Exercise appears in library

### Testing Sync
1. Make changes in browser (log workout)
2. Click "Sync to GitHub"
3. Check `_data/logs/workouts.json` in repo
4. Open on different device/browser
5. Data loads from GitHub

### Deploying Updates
```bash
git add .
git commit -m "Add new exercises and improve UI"
git push origin main

# GitHub Pages rebuilds automatically
# Visit your-username.github.io/exercise-tracker
```

---

## 💡 Technical Tips

### 11ty Configuration
```javascript
// .eleventy.js
module.exports = function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  
  // Parse exercise markdown
  eleventyConfig.addCollection("exercises", function(collectionApi) {
    return collectionApi.getFilteredByGlob("_data/exercises/*.md");
  });
  
  // Filter by equipment
  eleventyConfig.addFilter("byEquipment", function(exercises, equipment) {
    return exercises.filter(ex => ex.data.equipment.includes(equipment));
  });
  
  return {
    dir: {
      input: ".",
      output: "_site"
    }
  };
};
```

### localStorage Wrapper
```javascript
// src/js/storage.js
const StorageManager = {
  KEYS: {
    WORKOUTS: 'workout-data',
    LAST_SYNC: 'last-sync-time',
    FAVORITES: 'favorite-exercises'
  },
  
  get(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  },
  
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  
  clear() {
    Object.values(this.KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  },
  
  export() {
    const data = {};
    Object.values(this.KEYS).forEach(key => {
      data[key] = this.get(key);
    });
    return data;
  }
};
```

### Sync Manager
```javascript
// src/js/github-sync.js
class SyncManager {
  constructor(config) {
    this.config = config;
    this.syncing = false;
    this.lastSyncTime = StorageManager.get('last-sync-time');
  }
  
  async sync() {
    if (this.syncing) return;
    
    this.syncing = true;
    this.updateStatus('Syncing...');
    
    try {
      // 1. Fetch latest from GitHub
      const remoteData = await fetchWorkoutData();
      
      // 2. Get local data
      const localData = StorageManager.get(StorageManager.KEYS.WORKOUTS);
      
      // 3. Merge (simple last-write-wins for now)
      const mergedData = this.merge(localData, remoteData);
      
      // 4. Save merged to GitHub
      await saveWorkoutData(mergedData);
      
      // 5. Update localStorage
      StorageManager.set(StorageManager.KEYS.WORKOUTS, mergedData);
      StorageManager.set('last-sync-time', Date.now());
      
      this.lastSyncTime = Date.now();
      this.updateStatus('Synced!');
      
    } catch (error) {
      console.error('Sync failed:', error);
      this.updateStatus('Sync failed');
    } finally {
      this.syncing = false;
    }
  }
  
  merge(local, remote) {
    // Simple strategy: trust newest timestamp
    // You can make this smarter later
    if (!local) return remote;
    if (!remote) return local;
    
    // Compare last modified times and pick newer
    // Or implement proper conflict resolution
    return local; // Placeholder
  }
  
  updateStatus(message) {
    const statusEl = document.getElementById('sync-status');
    if (statusEl) {
      statusEl.textContent = message;
    }
  }
  
  getTimeSinceLastSync() {
    if (!this.lastSyncTime) return 'Never';
    
    const minutes = Math.floor((Date.now() - this.lastSyncTime) / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} min ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
}
```

---

## 📊 Nice-to-Have Features

### Analytics & Insights
- Total workouts completed
- Workout streak counter
- Most-performed exercises
- Weight loss rate calculation
- Estimated date to reach goal
- Workout consistency heatmap

### Social/Sharing
- Export workout summary to share
- Generate shareable progress image
- Print workout log

### Advanced Filtering
- "Show me leg exercises I haven't done in 2 weeks"
- "Find bodyweight exercises for when I travel"
- "Similar exercises to this one"

### Smart Suggestions
- "It's been 3 days since leg day"
- "You usually work out Mondays - log today?"
- "Try this variation to keep progressing"

### Gamification
- Achievement badges
- Workout milestones
- Personal records celebration

---

## 🚀 Getting Started Checklist

- [ ] Clone/create new repo for project
- [ ] Install 11ty: `npm install @11ty/eleventy`
- [ ] Set up basic file structure
- [ ] Create first 5 exercises in markdown
- [ ] Build simple index page with 11ty
- [ ] Test local development: `npx eleventy --serve`
- [ ] Deploy to GitHub Pages
- [ ] Add localStorage for basic logging
- [ ] Implement GitHub API sync
- [ ] Test on multiple devices
- [ ] Iterate and improve!

---

## 📚 Resources

### 11ty
- [11ty Docs](https://www.11ty.dev/docs/)
- [11ty Starter Projects](https://www.11ty.dev/docs/starter/)

### GitHub API
- [Contents API Docs](https://docs.github.com/en/rest/repos/contents)
- [Authentication](https://docs.github.com/en/rest/overview/authenticating-to-the-rest-api)

### Inspiration
- [Simple workout tracking patterns](https://www.reddit.com/r/Fitness/wiki/index)
- [Progressive overload principles](https://www.strongerbyscience.com/)

---

## 🎉 Final Thoughts

This project combines your interests in:
- **Fitness** - tracking real progress toward a goal
- **Web Development** - learning 11ty, APIs, data management
- **Personal Tools** - building something you'll actually use daily

Start simple (MVP), then add features as you need them. The beauty of this approach is it grows with you!

**Most Important**: Build something that makes you *want* to log your workouts. If it's a pain to use, you won't use it. Keep it simple and satisfying.

Good luck! 💪
